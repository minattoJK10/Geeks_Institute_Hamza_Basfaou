# hr_agent.py
import os, re, json, textwrap, requests
from datetime import datetime, timedelta, timezone
from collections import Counter
from pymongo import MongoClient
from dotenv import load_dotenv


load_dotenv()

BASE_URL = os.getenv("BASE_URL")
API_KEY = os.getenv("API_KEY")
MODEL = os.getenv("MODEL")
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/")

if not (BASE_URL and API_KEY and MODEL):
    print("ERROR: Set BASE_URL, API_KEY and MODEL in .env")
    raise SystemExit(1)

HEADERS = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
client = MongoClient(MONGO_URL)
db = client.hr_agent

# ---------- Model call helpers ----------
def call_model(messages, timeout=30):
    """
    messages: list of dicts like [{"role": "user", "content": "..."}]
    Returns a text response (string) from GitHub Models.
    """
    # Join all message contents into a single prompt string
    prompt_text = "\n".join([m["content"] for m in messages])

    payload = {
        "model": MODEL,
        "input": prompt_text,
        "temperature": 0.2
    }

    try:
        resp = requests.post(BASE_URL, headers=HEADERS, json=payload, timeout=timeout)
        resp.raise_for_status()
        data = resp.json()

        # GitHub models usually return {"completion": "...text..."}
        if "completion" in data:
            return data["completion"]

        # fallback: return first choice text if exists
        if "choices" in data and len(data["choices"]) > 0:
            ch = data["choices"][0]
            if "text" in ch:
                return ch["text"]
            if "message" in ch and "content" in ch["message"]:
                return ch["message"]["content"]

        # last resort
        return json.dumps(data)

    except Exception as e:
        return f"ERROR: {e}"

def extract_json_from_text(text):
    """Try to find a JSON object in text and parse it. Returns dict or None."""
    # look for first { ... } block
    m = re.search(r"\{.*\}", text, re.DOTALL)
    if m:
        s = m.group(0)
        try:
            return json.loads(s)
        except:
            # try replacing single quotes with double quotes
            try:
                s2 = s.replace("'", '"')
                return json.loads(s2)
            except:
                return None
    # try to parse the whole text
    try:
        return json.loads(text)
    except:
        return None

# ---------- Local fallback parser (heuristic) ----------
def local_parse_query(text):
    q = text.lower()
    role = "intern" if "intern" in q else ("junior" if "junior" in q else None)
    # extract num
    num = None
    m = re.search(r"(?:find|top)\s+(?:top\s+)?(\d+)", q)
    if m:
        num = int(m.group(1))
    # skills heuristic
    known = {"react","js","javascript","typescript","git","node","html","css","graphql","sql","python","django","angular","vue"}
    tokens = re.findall(r"[A-Za-z#+\-]{2,}", text)
    skills = []
    for tok in tokens:
        if tok.lower() in known:
            v = "JS" if tok.lower()=="javascript" else tok.capitalize()
            skills.append(v)
    skills = list(dict.fromkeys(skills))
    # location
    location = None
    m = re.search(r"in\s+([A-Za-z\- ]+?)(?:,| with| available|$)", text, re.IGNORECASE)
    if m:
        location = m.group(1).strip().title()
    # experience
    minExp = None; maxExp = None
    m = re.search(r"(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(\d+(?:\.\d+)?)\s*(?:years|yrs|y)?", text)
    if m:
        minExp = float(m.group(1)); maxExp = float(m.group(2))
    else:
        m2 = re.search(r"(\d+(?:\.\d+)?)\s*(?:years|yrs|y)", text)
        if m2:
            minExp = 0.0; maxExp = float(m2.group(1))
    availabilityWindowDays = None
    if "available this month" in q: availabilityWindowDays = 30
    if "available this week" in q: availabilityWindowDays = 7
    if "available next month" in q: availabilityWindowDays = 45
    if ("available" in q) and ("month" in q) and not availabilityWindowDays:
        availabilityWindowDays = 30
    return {"role": role, "skills": skills, "location": location,
            "minExp": minExp, "maxExp": maxExp, "availabilityWindowDays": availabilityWindowDays,
            "num": num}

# ---------- parse_query: use model then fallback ----------
def parse_query(user_text):
    prompt = f"""
You are a JSON extractor for recruiter queries. Extract and return JSON with keys:
role, skills (array of strings), location, minExp (number), maxExp (number), availabilityWindowDays (number), num (integer for top-N).
If a value is not provided, return null.

Example input: "Find top 5 React interns in Casablanca, 0-2 years, available this month"
Example output:
{{
  "role": "intern",
  "skills": ["React"],
  "location": "Casablanca",
  "minExp": 0,
  "maxExp": 2,
  "availabilityWindowDays": 30,
  "num": 5
}}

Now parse: \"{user_text}\"
"""
    ans = call_model([{"role":"user","content":prompt}])
    parsed = extract_json_from_text(ans)
    if parsed:
        # normalize keys and nulls
        parsed = {k: (None if parsed[k] is None else parsed[k]) for k in parsed}
        return parsed
    # fallback to local heuristics
    return local_parse_query(user_text)

# ---------- Scoring (exact rules requested) ----------
def score_candidate(candidate, filters):
    """
    score rules:
      +2 per required skill match
      +1 if location exact match
      +1 if experience within user range (±1 year ok)
      +1 if availabilityDate within next availabilityWindowDays
    Returns (score:int, reason:str)
    """
    skills_req = filters.get("skills") or []
    skill_points = 0
    matched_skills = []
    for sk in skills_req:
        for csk in candidate.get("skills", []):
            if sk.lower() == csk.lower() or sk.lower() in csk.lower() or csk.lower() in sk.lower():
                skill_points += 2
                matched_skills.append(csk)
                break
    parts = []
    if matched_skills:
        parts.append(f"{'+'.join(matched_skills)} match (+{skill_points})")
    total = skill_points
    # location
    if filters.get("location") and candidate.get("location","").lower() == filters["location"].lower():
        total += 1
        parts.append(f"{candidate.get('location')} (+1)")
    # experience
    minE = filters.get("minExp"); maxE = filters.get("maxExp")
    exp = float(candidate.get("experienceYears", 0))
    if (minE is not None) and (maxE is not None):
        if (exp >= (minE - 1)) and (exp <= (maxE + 1)):
            total += 1
            parts.append(f"{exp}y fits (±1) (+1)")
    # availability
    days = filters.get("availabilityWindowDays")
    if days:
        try:
            av = datetime.fromisoformat(candidate.get("availabilityDate"))
            now = datetime.now()
            d = (av - now).days
            if 0 <= d <= int(days):
                total += 1
                parts.append(f"available in {d}d (+1)")
        except Exception:
            pass
    reason = ", ".join(parts) + f" -> score {total}"
    return total, reason

def search_candidates(filters, top_n=5):
    # ensure default top_n
    top_n = top_n or 5
    all_c = list(db.candidates.find())
    results = []
    for i, c in enumerate(all_c, start=1):
        sc, reason = score_candidate(c, filters)
        if sc > 0:
            results.append({"index": i, "candidate": c, "score": sc, "reason": reason})
    results.sort(key=lambda r: (-r["score"], r["index"]))
    return results[:top_n]


# ---------- Shortlist functions ----------
SHORTLIST_FILE = "./Data/shortlists.json"

from datetime import timezone

def save_shortlist(name, indices, last_results):
    """Save selected candidates to JSON file."""
    if not last_results:
        return False, "No last search results to pick from."

    selected = []
    for idx in indices:
        if 1 <= idx <= len(last_results):
            selected.append(last_results[idx-1]["candidate"])

    if not selected:
        return False, "No valid indices provided."

    record = {
        "name": name,
        "createdAt": datetime.now(timezone.utc).isoformat(),  # timezone-aware
        "candidates": [
            {"email": c["email"], "firstName": c["firstName"], "lastName": c["lastName"]}
            for c in selected
        ]
    }

    # Créer le fichier s'il n'existe pas
    if os.path.exists(SHORTLIST_FILE):
        with open(SHORTLIST_FILE, "r", encoding="utf-8") as f:
            all_shortlists = json.load(f)
    else:
        all_shortlists = []

    # Ajouter et sauvegarder
    all_shortlists.append(record)
    with open(SHORTLIST_FILE, "w", encoding="utf-8") as f:
        json.dump(all_shortlists, f, indent=2, ensure_ascii=False)

    return True, f"Saved shortlist '{name}' with {len(selected)} candidates."


def list_shortlists():
    """List all shortlists (without candidates)."""
    if not os.path.exists(SHORTLIST_FILE):
        return []
    with open(SHORTLIST_FILE, "r", encoding="utf-8") as f:
        all_shortlists = json.load(f)
    return [{"name": s["name"], "createdAt": s["createdAt"]} for s in all_shortlists]

def get_shortlist(name):
    """Retrieve a shortlist by name (full details including candidates)."""
    if not os.path.exists(SHORTLIST_FILE):
        return None
    with open(SHORTLIST_FILE, "r", encoding="utf-8") as f:
        all_shortlists = json.load(f)
    for s in all_shortlists:
        if s["name"].lower() == name.lower():
            return s
    return None

# ---------- Email drafting (via model) ----------
def draft_email(recipients, job_title, tone="friendly"):
    # recipients: list of candidate dicts
    names = ", ".join([r.get("firstName") for r in recipients]) if isinstance(recipients, list) else str(recipients)
    job = db.jobs.find_one({"title": job_title}) or {}
    jd = job.get("jdSnippet", "")
    prompt = f"""
You are a helpful recruiter assistant. Draft a short outreach email targeted to {names} about the role '{job_title}'.
Include subject and body. Return JSON only:
{{
  "subject": "string",
  "text": "plain-text body"
}}
Be concise (2-6 short paragraphs). Tone: {tone}.
Job description: {jd}
"""
    ans = call_model([{"role":"user","content":prompt}])
    parsed = extract_json_from_text(ans)
    if parsed and "subject" in parsed and "text" in parsed:
        subject = parsed["subject"]
        text = parsed["text"]
    else:
        # fallback simple email
        subject = f"Opportunity: {job_title}"
        first = recipients[0].get("firstName") if recipients else "there"
        text = f"Hi {first},\n\nI came across your profile and thought you might be a fit for {job_title}. Are you available for a 15-minute chat?\n\nBest,\nRecruiter"
    html = html_template({"subject": subject, "text": text})
    return {"subject": subject, "text": text, "html": html, "recipients": [r.get("email") for r in recipients]}

def html_template(email):
    subject = email.get("subject","")
    text = email.get("text","").replace("\n","<br>")
    return f"""<html><head><meta charset="utf-8"><title>{subject}</title></head>
<body style="font-family:Arial,Helvetica,sans-serif;line-height:1.5;padding:20px;">
  <div style="max-width:640px;margin:auto;border:1px solid #eee;padding:16px;border-radius:8px;">
    <h2 style="margin-top:0;">{subject}</h2>
    <div style="white-space:pre-wrap;">{text}</div>
    <p style="color:#666;font-size:0.9em;">Sent with HR Agent</p>
  </div>
</body></html>"""

# ---------- Analytics ----------
def analytics_summary():
    all_c = list(db.candidates.find())
    countByStage = Counter([c.get("stage","UNKNOWN") for c in all_c])
    skills = Counter()
    for c in all_c:
        for s in c.get("skills", []):
            skills[s] += 1
    topSkills = skills.most_common(3)
    return {"countByStage": dict(countByStage), "topSkills": topSkills}

# ---------- CLI / REPL ----------
def parse_save_command(text):
    m = re.search(r'save\s+([\d\s,#]+)\s+as\s+"?([^"]+)"?', text, re.IGNORECASE)
    if not m:
        return None
    indices = [int(x) for x in re.findall(r"\d+", m.group(1))]
    name = m.group(2).strip()
    return indices, name

def parse_draft_command(text):
    m = re.search(r'draft .* for\s+"?([^"]+)"?\s+using job\s+"?([^"]+)"?(?:\s+in\s+(\w+)\s+tone)?', text, re.IGNORECASE)
    if not m:
        m = re.search(r'draft .* for\s+"?([^"]+)"?\s+using job\s+(.+)', text, re.IGNORECASE)
    if not m:
        return None, None, "friendly"
    sname = m.group(1).strip()
    job = m.group(2).strip().strip('"')
    tone = (m.group(3) or "friendly").strip().lower()
    return sname, job, tone

def repl():
    print("HR Agent CLI — type 'help' for examples. 'exit' to quit.")
    last_search = []
    last_email = None
    while True:
        try:
            cmd = input("\n> ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\nExiting.")
            break
        if not cmd: continue
        low = cmd.lower()
        if low in ("exit","quit"): break
        if low in ("help","h","?"):
            print(textwrap.dedent("""
                Examples:
                - Find top 5 React interns in Casablanca, 0-2 years, available this month
                - Save #1 #3 as "FE-Intern-A"
                - Draft an outreach email for "FE-Intern-A" using job "Frontend Intern" in friendly tone
                - Change the subject to "Quick chat about a Frontend Intern role?" and re-preview
                - Edit closing to "Cheers,\\nHamza" and re-preview
                - Show analytics
                - List shortlists
                - Show shortlist "FE-Intern-A"
                - Exit
            """))
            continue

        # FIND
        if low.startswith("find") or "find top" in low:
            filters = parse_query(cmd)
            top_n = filters.get("num") or 5
            last_search = search_candidates(filters, top_n=top_n)
            if not last_search:
                print("No matches found.")
            else:
                for i, r in enumerate(last_search, start=1):
                    c = r["candidate"]
                    print(f"#{i} {c['firstName']} {c['lastName']} | {c['location']} | exp:{c['experienceYears']}y | skills:{','.join(c['skills'])} => {r['reason']}")
            continue

        # SAVE
        if low.startswith("save"):
            parsed = parse_save_command(cmd)
            if not parsed:
                print("Couldn't parse save command. Example: Save #1 #3 as \"FE-Intern-A\"")
                continue
            indices, name = parsed
            ok, msg = save_shortlist(name, indices, last_search)
            print(msg)
            if ok:
              print("\nCurrent shortlists:")
              for s in list_shortlists():
                print(f"- {s['name']} (createdAt: {s['createdAt']})")
            continue

        # DRAFT
        if low.startswith("draft"):
            sname, job, tone = parse_draft_command(cmd)
            if not sname or not job:
                print("Couldn't parse draft command. Example: Draft ... for \"FE-Intern-A\" using job \"Frontend Intern\"")
                continue
            short = get_shortlist(sname)
            if not short:
                print(f"Shortlist '{sname}' not found.")
                continue
            # load full candidate docs by email
            emails = [m["email"] for m in short.get("candidates",[])]
            recipients = list(db.candidates.find({"email": {"$in": emails}}))
            email = draft_email(recipients, job, tone=tone)
            last_email = email.copy()
            print("\nSubject:", email["subject"])
            print("\nPlain text:\n")
            print(email["text"])
            print("\nHTML preview (printed):\n")
            print(email["html"])
            continue

        # Change subject
        if low.startswith("change the subject to") or low.startswith("change subject to") or low.startswith("edit subject to"):
            m = re.search(r'to\s+"?([^"]+)"?', cmd, re.IGNORECASE)
            if not m:
                print("Could not parse new subject.")
                continue
            if not last_email:
                print("No email to edit. Draft one first.")
                continue
            new_sub = m.group(1).strip()
            last_email["subject"] = new_sub
            last_email["html"] = html_template(last_email)
            print("Subject changed. Re-preview:\n")
            print("Subject:", last_email["subject"])
            print("\nHTML preview:\n")
            print(last_email["html"])
            continue

        # Edit closing
        if low.startswith("edit closing to") or low.startswith("change closing to"):
            m = re.search(r'to\s+"?([^"]+)"?', cmd, re.IGNORECASE)
            if not m:
                print("Could not parse closing.")
                continue
            if not last_email:
                print("No email to edit. Draft one first.")
                continue
            new_closing = m.group(1).replace("\\n","\n")
            # naive replace of last paragraph (works for simple templates)
            body = last_email["text"]
            parts = body.rsplit("\n\n", 1)
            base = parts[0] if parts else body
            last_email["text"] = base + "\n\n" + new_closing
            last_email["html"] = html_template(last_email)
            print("Closing changed. Re-preview:\n")
            print(last_email["text"])
            print("\nHTML preview:\n")
            print(last_email["html"])
            continue

        # Analytics
        if low.startswith("show analytics") or low.startswith("analytics") or low.startswith("show pipeline"):
            an = analytics_summary()
            print("Pipeline by stage: " + ", ".join([f"{k}={v}" for k,v in an["countByStage"].items()]))
            print("Top skills: " + ", ".join([f"{s}({c})" for s,c in an["topSkills"]]))
            continue

        # List shortlists
        if low.startswith("list shortlists") or low.startswith("show shortlists"):
            sl = list_shortlists()
            if not sl:
                print("No shortlists saved.")
            else:
                for s in sl:
                    print(f"- {s.get('name')} (createdAt: {s.get('createdAt')})")
            continue

        # Show shortlist details
        m = re.search(r'show shortlist\s+"?([^"]+)"?', cmd, re.IGNORECASE)
        if m:
            name = m.group(1).strip()
            s = get_shortlist(name)
            if not s:
                print(f"Shortlist '{name}' not found.")
            else:
                for item in s.get("candidates", []):
                    print(f"{item.get('firstName')} {item.get('lastName')} <{item.get('email')}>")
            continue

        print("Command not recognized. Type 'help' for examples.")

if __name__ == "__main__":
    repl()
