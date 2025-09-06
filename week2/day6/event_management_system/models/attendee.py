# models/attendee.py
from database.index import db
from datetime import datetime

class Attendee(db.Model):
    __tablename__ = "attendees"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    tickets = db.relationship(
        "Ticket",
        back_populates="attendee",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    events = db.relationship(
        "Event",
        secondary="tickets",
        back_populates="attendees",
        viewonly=True
    )

    def __repr__(self):
        return f"<Attendee {self.email}>"
