# models/organizer.py
from database.index import db
from datetime import datetime

class Organizer(db.Model):
    __tablename__ = "organizers"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    phone = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    events = db.relationship(
        "Event",
        back_populates="organizer",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    def __repr__(self):
        return f"<Organizer {self.name}>"
