import os
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def init_app(app):
    # Prefer .env DATABASE_URL; fallback to a reasonable local default
    database_url = os.getenv("DATABASE_URL", "postgresql+psycopg2://postgres:postgres@localhost:5432/library_db")
    app.config["SQLALCHEMY_DATABASE_URI"] = database_url
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    return app
