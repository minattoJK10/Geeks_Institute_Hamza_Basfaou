# Library Management System — Flask + PostgreSQL

A full-stack CRUD web application implementing the assignment requirements.

## Features (Mandatory)
- CRUD for Books and Authors
- Search across book titles
- Pagination (6 items per page)
- Update/Delete with confirmation
- Many-to-Many: books_authors
- Proper FK constraints with `ON DELETE CASCADE`
- Database seeding (10+ books, 10+ authors)
- Responsive UI (TailwindCSS)
- Flash messages and basic validation
- Stats page with Chart.js (aggregates)

## Optional (sample implementations included)
- Image URL field on books (displayed on details page)
- Basic date-based filter (by publication year)
- Simple rating (0–5) stored per book

## Tech Stack
- Flask, Flask-SQLAlchemy
- PostgreSQL
- Tailwind CSS (CDN)
- Chart.js (CDN)

## Setup
1. Create and activate a virtual environment, then install requirements:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. Create a PostgreSQL database and set your connection string in `.env`:
   ```env
   DATABASE_URL=postgresql+psycopg2://postgres:postgres@localhost:5432/library_db
   FLASK_DEBUG=1
   SECRET_KEY=dev-secret-change-me
   ```

3. Create schema and seed data:
   ```bash
   psql "$DATABASE_URL" -f database/seed/index.sql
   ```

4. Run the app:
   ```bash
   export FLASK_APP=index.py
   flask run
   # or: python index.py
   ```

5. Open http://127.0.0.1:5000/

## Project Structure
```
project/
├── index.py
├── models/
│   └── library.py
├── database/
│   ├── index.py
│   └── seed/
│       └── index.sql
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── create.html
│   ├── edit.html
│   ├── details.html
│   └── stats.html
└── requirements.txt
```

## Notes
- For production, set a strong `SECRET_KEY` and disable debug.
- If you change models, reflect them into DDL or regenerate schema accordingly.
