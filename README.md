# Med-Taxlil EEG Analysis Platform

## Project Structure
- `frontend/`: Next.js Application (React, Tailwind, Shadcn UI)
- `backend/`: FastAPI Application (Python, MNE)

## Getting Started

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access at: http://localhost:3000

### 2. Backend Setup
**Prerequisite:** Python 3.10+

```bash
cd backend
# Activate virtual environment (Windows)
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Server
uvicorn main:app --reload
```
Access API at: http://localhost:8000/docs

## Features Implemented
- **Medical Theme:** Teal/Green aesthetic with dark mode support.
- **EDF Upload:** Drag and drop interface for brain signal files.
- **EEG Viewer:** Canvas-based 19-channel signal visualization with Zoom/Pan.
- **Dashboard:** Layout for future spectral analysis and AI results.
