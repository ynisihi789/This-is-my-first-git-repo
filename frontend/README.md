# Frontend - Tournament Tracking System

This is the React/Vite frontend for the Tournament Tracking System.

## Quick Start

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the app in your browser at the URL shown by Vite, usually:
   `http://127.0.0.1:5173`

## Backend API

- The frontend calls the Django backend at `http://127.0.0.1:8000/api/`.
- API calls are defined in `src/api.js`.
- The spectator dashboard is implemented in `src/SpectatorView.jsx`.

## Notes

- Ensure the backend server is running before opening the frontend.
- If the frontend cannot fetch data, check `backend/core/settings.py` for CORS settings.
- The frontend uses Axios to request matches and standings from the backend.
