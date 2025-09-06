# index.py
import os
from flask import Flask, render_template, redirect, url_for
from dotenv import load_dotenv
from database.index import init_db, db
from routes import events_bp, organizers_bp, attendees_bp, tickets_bp, dashboard_bp
from models import *  # ensure models are registered for migrations

load_dotenv()

def create_app():
    app = Flask(__name__)

    # 🔹 Configure à partir du .env
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    init_db(app)

    # Blueprints
    app.register_blueprint(events_bp)
    app.register_blueprint(organizers_bp)
    app.register_blueprint(attendees_bp)
    app.register_blueprint(tickets_bp)
    app.register_blueprint(dashboard_bp)

    @app.route("/")
    def index():  # ✅ renamed from home → index
        return redirect(url_for("events.list_events"))

    @app.errorhandler(404)
    def not_found(e):
        return render_template("404.html"), 404

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
