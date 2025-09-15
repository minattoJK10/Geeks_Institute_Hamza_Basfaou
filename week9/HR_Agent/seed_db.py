# seed_db.py
import os, json
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URL)
db = client.hr_agent

def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def seed():
    db.candidates.delete_many({})
    db.jobs.delete_many({})
    db.shortlists.delete_many({})
    candidates = load_json("data/candidates.json")
    jobs = load_json("data/jobs.json")
    db.candidates.insert_many(candidates)
    db.jobs.insert_many(jobs)
    print("Database seeded: candidates and jobs inserted.")

if __name__ == "__main__":
    seed()
