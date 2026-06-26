# Tournament Tracking System

A full-stack tournament tracking app with a Django REST backend and a React/Vite frontend.

## Project Structure

- `backend/` - Django project and REST API
- `frontend/` - React application built with Vite

## Prerequisites

- Python 3.11+ (or the version used in `backend/env`)
- Node.js 18+ / npm 10+
- Git

## Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Activate the virtual environment:
   - Windows PowerShell:
     ```powershell
     .\env\Scripts\Activate.ps1
     ```
   - Windows cmd:
     ```cmd
     .\env\Scripts\activate.bat
     ```

3. Install Python dependencies if needed:
   ```bash
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django development server:
   ```bash
   python manage.py runserver
   ```

The backend will be available at `http://127.0.0.1:8000/`.

## Frontend Setup

1. Open a second terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend dev server:
   ```bash
   npm run dev
   ```

The frontend will typically run at `http://127.0.0.1:5173/`.

## How to Use

- The frontend calls the backend API at `http://127.0.0.1:8000/api/`.
- The main spectator view fetches matches and standings for one tournament.
- Ensure both the backend and frontend servers are running simultaneously.

## Troubleshooting

- If the frontend cannot connect to the backend, confirm the backend is running on `127.0.0.1:8000`.
- If you see CORS errors, verify that `backend/core/settings.py` has `corsheaders` configured and `CORS_ALLOW_ALL_ORIGINS = True`.
- If you need to reset the database, delete `backend/db.sqlite3` and re-run migrations.

## Deploying to Netlify

### Frontend Setup

1. **Connect Your Repository:**
   - Push your code to GitHub, GitLab, or Bitbucket
   - Go to [netlify.com](https://netlify.com) and log in
   - Click "Add new site" → "Import an existing project"
   - Select your repository

2. **Configure Build Settings:**
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`
   - The `netlify.toml` file is already configured with these settings

3. **Set Environment Variables:**
   - In Netlify dashboard → Site settings → Build & deploy → Environment
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api/`
   - Replace with your actual backend URL (e.g., Heroku, Railway, or your own server)

### Backend Setup

Deploy your Django backend to one of these platforms:

#### Option 1: Heroku (Recommended for beginners)

1. **Install Heroku CLI** and log in:
   ```bash
   heroku login
   ```

2. **Create a new app:**
   ```bash
   heroku create your-app-name
   ```

3. **Add PostgreSQL addon:**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

4. **Set environment variables:**
   ```bash
   heroku config:set DEBUG=False
   heroku config:set SECRET_KEY=your-secure-secret-key-here
   heroku config:set CORS_ALLOWED_ORIGINS=https://your-netlify-site.netlify.app
   ```

5. **Deploy:**
   ```bash
   git push heroku main
   ```

#### Option 2: Railway.app

1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Add PostgreSQL from the plugins
4. Set environment variables in the project settings
5. Railway auto-deploys on push

#### Option 3: PythonAnywhere

1. Go to [pythonanywhere.com](https://pythonanywhere.com) and create an account
2. Upload your code and set up a virtual environment
3. Configure a web app with Django
4. Set up environment variables in the web app settings

### Important: CORS Configuration

After deploying your backend, update `CORS_ALLOWED_ORIGINS` to include your Netlify domain:

**For development**, edit `backend/core/settings.py`:
```python
CORS_ALLOW_ALL_ORIGINS = True  # Only for development!
```

**For production**, use environment variable:
```bash
CORS_ALLOWED_ORIGINS=https://your-netlify-site.netlify.app,https://yourdomain.com
```

Then update the backend URL in your frontend's Netlify environment variables.

## Notes

- The backend uses Django REST Framework.
- The frontend uses React and Axios for API requests.
- Add your own tournament data by using Django admin or building a data import flow.
