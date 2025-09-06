# blueprints/tickets.py
from flask import render_template, request, redirect, url_for, flash, Blueprint

from database.index import db
from models import Ticket, Event, Attendee

tickets_bp = Blueprint("tickets", __name__, url_prefix="/tickets")

@tickets_bp.route("/register", methods=["GET", "POST"])
def register():
    events = Event.query.order_by(Event.date.asc()).all()
    attendees = Attendee.query.order_by(Attendee.name.asc()).all()

    if request.method == "POST":
        event_id = int(request.form["event_id"])
        attendee_id = int(request.form["attendee_id"])

        # Prevent duplicate registration (unique constraint also enforced in DB)
        exists = Ticket.query.filter_by(event_id=event_id, attendee_id=attendee_id).first()
        if exists:
            flash("This attendee is already registered for the event.", "warning")
            return redirect(url_for("tickets.register"))

        # Capacity check
        ev = Event.query.get_or_404(event_id)
        if ev.registrations_count() >= (ev.max_attendees or 1000000):
            flash("This event is full.", "danger")
            return redirect(url_for("tickets.register"))

        t = Ticket(event_id=event_id, attendee_id=attendee_id, ticket_status="confirmed")
        db.session.add(t)
        db.session.commit()
        flash("Registration successful!", "success")
        return redirect(url_for("events.details", event_id=event_id))

    return render_template("tickets/register.html", events=events, attendees=attendees)
