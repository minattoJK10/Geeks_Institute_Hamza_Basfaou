# blueprints/dashboard.py
from flask import render_template, Blueprint

from models import Event, Organizer, Ticket
from database.index import db
from sqlalchemy import func
from datetime import datetime

dashboard_bp = Blueprint("dashboard", __name__, url_prefix="/dashboard")

@dashboard_bp.route("/")
def stats():
    # Nombre d'événements par organizer (list of (name, count))
    events_per_org = (
        db.session.query(Organizer.name, func.count(Event.id))
        .join(Event, Event.organizer_id == Organizer.id)
        .group_by(Organizer.name)
        .order_by(func.count(Event.id).desc())
        .all()
    )

    # Événements les plus populaires (name, registrations)
    popular_events = (
        db.session.query(Event.name, func.count(Ticket.id))
        .outerjoin(Ticket, Ticket.event_id == Event.id)
        .group_by(Event.id, Event.name)
        .order_by(func.count(Ticket.id).desc())
        .limit(10)
        .all()
    )

    # Attendees over time (month truncated, count)
    attendees_over_time = (
        db.session.query(
            func.date_trunc("month", Ticket.registration_date).label("month"),
            func.count(Ticket.id)
        )
        .group_by("month")
        .order_by("month")
        .all()
    )

    # --- Convertir en listes JSON-compatibles ---
    org_labels = [r[0] for r in events_per_org]
    org_counts = [int(r[1]) for r in events_per_org]

    popular_labels = [r[0] for r in popular_events]
    popular_counts = [int(r[1]) for r in popular_events]

    # month est un datetime -> convertir en string 'YYYY-MM' ou 'YYYY-MM-DD'
    time_labels = [
        (r[0].strftime("%Y-%m") if isinstance(r[0], datetime) else str(r[0]))
        for r in attendees_over_time
    ]
    time_counts = [int(r[1]) for r in attendees_over_time]

    return render_template(
        "stats.html",
        org_labels=org_labels,
        org_counts=org_counts,
        popular_labels=popular_labels,
        popular_counts=popular_counts,
        time_labels=time_labels,
        time_counts=time_counts,
    )
