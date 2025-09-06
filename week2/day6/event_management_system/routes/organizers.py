# blueprints/organizers.py
from flask import render_template, request, redirect, url_for, flash, Blueprint

from database.index import db
from models import Organizer

ITEMS_PER_PAGE = 6
organizers_bp = Blueprint("organizers", __name__, url_prefix="/organizers")
@organizers_bp.route("/")
def list_organizers():
    page = request.args.get("page", 1, type=int)
    pagination = Organizer.query.order_by(Organizer.name.asc()).paginate(
        page=page, per_page=ITEMS_PER_PAGE, error_out=False
    )
    return render_template("organizers/list.html", pagination=pagination)

@organizers_bp.route("/create", methods=["GET", "POST"])
def create():
    if request.method == "POST":
        data = request.form
        org = Organizer(name=data["name"], email=data["email"], phone=data.get("phone"))
        db.session.add(org)
        db.session.commit()
        flash("Organizer created!", "success")
        return redirect(url_for("organizers.list_organizers"))
    return render_template("organizers/create.html")

@organizers_bp.route("/<int:org_id>/edit", methods=["GET", "POST"])
def edit(org_id):
    org = Organizer.query.get_or_404(org_id)
    if request.method == "POST":
        data = request.form
        org.name = data["name"]
        org.email = data["email"]
        org.phone = data.get("phone")
        db.session.commit()
        flash("Organizer updated!", "success")
        return redirect(url_for("organizers.list_organizers"))
    return render_template("organizers/edit.html", org=org)

@organizers_bp.route("/<int:org_id>/delete", methods=["POST"])
def delete(org_id):
    org = Organizer.query.get_or_404(org_id)
    db.session.delete(org)
    db.session.commit()
    flash("Organizer deleted.", "info")
    return redirect(url_for("organizers.list_organizers"))
