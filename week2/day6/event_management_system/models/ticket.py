# models/ticket.py
from database.index import db
from datetime import datetime

class Ticket(db.Model):
    __tablename__ = "tickets"

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(
        db.Integer,
        db.ForeignKey("events.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    attendee_id = db.Column(
        db.Integer,
        db.ForeignKey("attendees.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    ticket_status = db.Column(db.String(20), default="confirmed")

    __table_args__ = (db.UniqueConstraint("event_id", "attendee_id"),)

    event = db.relationship("Event", back_populates="tickets")
    attendee = db.relationship("Attendee", back_populates="tickets")

    def __repr__(self):
        return f"<Ticket e:{self.event_id} a:{self.attendee_id}>"
