# Backend - Tournament Tracking System

This is the Django backend for the Tournament Tracking System.

## Quick Start

1. Activate the virtual environment:
   - PowerShell: `.
   env\Scripts\Activate.ps1`
   - CMD: `.
   env\Scripts\activate.bat`

2. Install dependencies if needed:
   ```bash
   pip install -r requirements.txt
   ```

3. Apply migrations:
   ```bash
   python manage.py migrate
   ```

4. Run the server:
   ```bash
   python manage.py runserver
   ```

5. Access the API at:
   `http://127.0.0.1:8000/api/`

## Notes

- `corsheaders` is enabled in `core/settings.py` for local frontend access.
- The database file is `db.sqlite3`.
- API routes are registered in `tournaments/urls.py`.
