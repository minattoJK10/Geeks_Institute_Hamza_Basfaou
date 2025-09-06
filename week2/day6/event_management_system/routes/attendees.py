# blueprints/attendees.py
from flask import render_template, request, redirect, url_for, flash, Blueprint

from database.index import db
from models import Attendee

ITEMS_PER_PAGE = 6
attendees_bp = Blueprint("attendees", __name__, url_prefix="/attendees")

@attendees_bp.route("/")
def list_attendees():
    page = request.args.get("page", 1, type=int)
    pagination = Attendee.query.order_by(Attendee.created_at.desc()).paginate(
        page=page, per_page=ITEMS_PER_PAGE, error_out=False
    )
    return render_template("attendees/list.html", pagination=pagination)

@attendees_bp.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        data = request.form
        a = Attendee(name=data["name"], email=data["email"], phone=data.get("phone"))
        db.session.add(a)
        db.session.commit()
        flash("Attendee created!", "success")
        return redirect(url_for("attendees.list_attendees"))
    return render_template("attendees/create.html")

@attendees_bp.route("/<int:attendee_id>/edit", methods=["GET", "POST"])
def edit(attendee_id):
    a = Attendee.query.get_or_404(attendee_id)
    if request.method == "POST":
        data = request.form
        a.name = data["name"]
        a.email = data["email"]
        a.phone = data.get("phone")
        db.session.commit()
        flash("Attendee updated!", "success")
        return redirect(url_for("attendees.list_attendees"))
    return render_template("attendees/edit.html", a=a)

@attendees_bp.route("/<int:attendee_id>/delete", methods=["POST"])
def delete(attendee_id):
    a = Attendee.query.get_or_404(attendee_id)
    db.session.delete(a)
    db.session.commit()
    flash("Attendee deleted.", "info")
    return redirect(url_for("attendees.list_attendees"))
