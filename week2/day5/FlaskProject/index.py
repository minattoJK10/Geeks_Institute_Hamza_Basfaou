import os
from dotenv import load_dotenv
from flask import Flask, render_template, request, redirect, url_for, flash
from sqlalchemy import func, select
from database.index import init_app, db
from models.library import Book, Author, BookAuthor

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "dev-secret-change-me")
    init_app(app)

    with app.app_context():
        # Ensure tables exist (DDL also provided via SQL seed file)
        db.create_all()

    @app.route("/")
    def home():
        q = request.args.get("q", "").strip()
        year = request.args.get("year", "").strip()
        page = request.args.get("page", 1, type=int)
        per_page = 6

        query = Book.query

        if q:
            query = query.filter(Book.title.ilike(f"%{q}%"))
        if year:
            try:
                y = int(year)
                query = query.filter(Book.year == y)
            except ValueError:
                flash("Year must be a number.", "error")

        books = query.order_by(Book.created_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
        return render_template("index.html", books=books)

    @app.route("/book/<int:book_id>")
    def details(book_id: int):
        book = Book.query.get_or_404(book_id)
        return render_template("details.html", book=book)

    @app.route("/create", methods=["GET", "POST"])
    def create_book():
        if request.method == "POST":
            title = request.form.get("title", "").strip()
            year = request.form.get("year", "").strip()
            category = request.form.get("category", "").strip()
            image_url = request.form.get("image_url", "").strip()
            rating = request.form.get("rating", "0").strip()
            author_ids = request.form.getlist("author_ids")

            errors = []
            if not title:
                errors.append("Title is required.")
            if rating:
                try:
                    r = int(rating)
                    if r < 0 or r > 5:
                        errors.append("Rating must be between 0 and 5.")
                except ValueError:
                    errors.append("Rating must be a number.")
            if year:
                try:
                    int(year)
                except ValueError:
                    errors.append("Year must be a number.")

            if errors:
                for e in errors:
                    flash(e, "error")
            else:
                book = Book(title=title,
                            year=int(year) if year else None,
                            category=category or None,
                            image_url=image_url or None,
                            rating=int(rating) if rating else 0)
                if author_ids:
                    authors = Author.query.filter(Author.id.in_(author_ids)).all()
                    book.authors = authors
                db.session.add(book)
                db.session.commit()
                flash("Book created successfully.", "success")
                return redirect(url_for("home"))

        authors = Author.query.order_by(Author.name.asc()).all()
        return render_template("create.html", authors=authors)

    @app.route("/edit/<int:book_id>", methods=["GET", "POST"])
    def edit_book(book_id: int):
        book = Book.query.get_or_404(book_id)
        if request.method == "POST":
            title = request.form.get("title", "").strip()
            year = request.form.get("year", "").strip()
            category = request.form.get("category", "").strip()
            image_url = request.form.get("image_url", "").strip()
            rating = request.form.get("rating", "0").strip()
            author_ids = request.form.getlist("author_ids")

            errors = []
            if not title:
                errors.append("Title is required.")
            if rating:
                try:
                    r = int(rating)
                    if r < 0 or r > 5:
                        errors.append("Rating must be between 0 and 5.")
                except ValueError:
                    errors.append("Rating must be a number.")
            if year:
                try:
                    int(year)
                except ValueError:
                    errors.append("Year must be a number.")

            if errors:
                for e in errors:
                    flash(e, "error")
            else:
                book.title = title
                book.year = int(year) if year else None
                book.category = category or None
                book.image_url = image_url or None
                book.rating = int(rating) if rating else 0
                # Update authors
                authors = Author.query.filter(Author.id.in_(author_ids)).all() if author_ids else []
                book.authors = authors
                db.session.commit()
                flash("Book updated successfully.", "success")
                return redirect(url_for("details", book_id=book.id))

        authors = Author.query.order_by(Author.name.asc()).all()
        return render_template("edit.html", book=book, authors=authors)

    @app.route("/delete/<int:book_id>", methods=["POST"])
    def delete_book(book_id: int):
        book = Book.query.get_or_404(book_id)
        db.session.delete(book)
        db.session.commit()
        flash("Book deleted.", "success")
        return redirect(url_for("home"))

    @app.route("/stats")
    def stats():
        # Books per year (aggregate)
        bpy = (
            db.session.query(Book.year, func.count(Book.id))
            .filter(Book.year.isnot(None))
            .group_by(Book.year)
            .order_by(Book.year.asc())
            .all()
        )
        books_per_year_labels = [str(y) for (y, c) in bpy]
        books_per_year_counts = [int(c) for (y, c) in bpy]

        # Top authors by book count
        ta = (
            db.session.query(Author.name, func.count(BookAuthor.id))
            .join(BookAuthor, BookAuthor.author_id == Author.id)
            .group_by(Author.id)
            .order_by(func.count(BookAuthor.id).desc(), Author.name.asc())
            .limit(10)
            .all()
        )
        top_authors_labels = [n for (n, c) in ta]
        top_authors_counts = [int(c) for (n, c) in ta]

        return render_template("stats.html",
                               books_per_year_labels=books_per_year_labels,
                               books_per_year_counts=books_per_year_counts,
                               top_authors_labels=top_authors_labels,
                               top_authors_counts=top_authors_counts)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
