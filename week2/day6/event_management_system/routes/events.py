# blueprints/events.py
from flask import render_template, request, redirect, url_for, flash, Blueprint

from database.index import db
from models import Event, Organizer

ITEMS_PER_PAGE = 6
# ✅ Define the blueprint here
events_bp = Blueprint("events", __name__, url_prefix="/events")

@events_bp.route("/")
def list_events():
    page = request.args.get("page", 1, type=int)
    q = request.args.get("q", "", type=str)
    qry = Event.query.order_by(Event.date.asc(), Event.time.asc())
    if q:
        qry = qry.filter(Event.name.ilike(f"%{q}%"))
    pagination = qry.paginate(page=page, per_page=ITEMS_PER_PAGE, error_out=False)
    
    # Pass the actual events list instead of pagination object
    events = pagination.items

    return render_template("events/list.html", events=events, pagination=pagination, q=q)

@events_bp.route("/create", methods=["GET", "POST"])
def create_event():
    if request.method == "POST":
        data = request.form
        event = Event(
            name=data["name"],
            date=data["date"],
            time=data.get("time") or None,
            location=data["location"],
            description=data.get("description"),
            max_attendees=int(data.get("max_attendees") or 100),
            organizer_id=int(data.get("organizer_id")) if data.get("organizer_id") else None
        )
        db.session.add(event)
        db.session.commit()
        flash("Event created successfully!", "success")
        return redirect(url_for("events.list_events"))
    organizers = Organizer.query.order_by(Organizer.name).all()
    return render_template("events/create.html", organizers=organizers)

@events_bp.route("/<int:event_id>")
def details(event_id):
    event = Event.query.get_or_404(event_id)
    return render_template("events/details.html", event=event)

@events_bp.route("/<int:event_id>/edit", methods=["GET", "POST"])
def edit(event_id):
    event = Event.query.get_or_404(event_id)
    if request.method == "POST":
        data = request.form
        event.name = data["name"]
        event.date = data["date"]
        event.time = data.get("time") or None
        event.location = data["location"]
        event.description = data.get("description")
        event.max_attendees = int(data.get("max_attendees") or 100)
        event.organizer_id = int(data.get("organizer_id")) if data.get("organizer_id") else None
        db.session.commit()
        flash("Event updated!", "success")
        return redirect(url_for("events.details", event_id=event.id))
    organizers = Organizer.query.order_by(Organizer.name).all()
    return render_template("events/edit.html", event=event, organizers=organizers)

@events_bp.route("/<int:event_id>/delete", methods=["POST"])
def delete(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    flash("Event deleted.", "info")
    return redirect(url_for("events.list_events"))
