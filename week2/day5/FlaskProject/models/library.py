from datetime import datetime
from sqlalchemy import String, Integer, Text, ForeignKey, DateTime, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from database.index import db

# Association table for many-to-many (Books <-> Authors)
class BookAuthor(db.Model):
    __tablename__ = "books_authors"
    id: Mapped[int] = mapped_column(primary_key=True)
    book_id: Mapped[int] = mapped_column(ForeignKey("books.id", ondelete="CASCADE"), index=True)
    author_id: Mapped[int] = mapped_column(ForeignKey("authors.id", ondelete="CASCADE"), index=True)

class Author(db.Model):
    __tablename__ = "authors"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    bio: Mapped[str | None] = mapped_column(Text(), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    books: Mapped[list["Book"]] = relationship(
        secondary="books_authors",
        back_populates="authors",
        passive_deletes=True,
    )

    def __repr__(self) -> str:
        return f"<Author {self.name!r}>"

class Book(db.Model):
    __tablename__ = "books"
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False, index=True)
    year: Mapped[int | None] = mapped_column(Integer, nullable=True)
    category: Mapped[str | None] = mapped_column(String(80), nullable=True)  # simple category text
    image_url: Mapped[str | None] = mapped_column(Text(), nullable=True)     # optional image URL
    rating: Mapped[int] = mapped_column(Integer, default=0)  # 0–5
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        CheckConstraint("rating >= 0 AND rating <= 5", name="ck_books_rating_range"),
    )

    authors: Mapped[list[Author]] = relationship(
        secondary="books_authors",
        back_populates="books",
        passive_deletes=True,
    )

    def __repr__(self) -> str:
        return f"<Book {self.title!r}>"
