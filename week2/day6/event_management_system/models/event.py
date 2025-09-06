# models/event.py
from database.index import db
from datetime import datetime, time

class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False, index=True)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.Time)
    location = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    max_attendees = db.Column(db.Integer, default=100)
    organizer_id = db.Column(
        db.Integer,
        db.ForeignKey("organizers.id", ondelete="CASCADE"),
        nullable=True,
        index=True
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    organizer = db.relationship("Organizer", back_populates="events")

    tickets = db.relationship(
        "Ticket",
        back_populates="event",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    attendees = db.relationship(
        "Attendee",
        secondary="tickets",
        back_populates="events",
        viewonly=True
    )

    def registrations_count(self):
        return len(self.tickets)

    def __repr__(self):
        return f"<Event {self.name}>"
