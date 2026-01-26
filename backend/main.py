from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Med-Taxlil EEG API",
    description="API for EEG Analysis and Seizure Detection",
    version="0.1.0"
)

# CORS Configuration
origins = [
    "http://localhost:3000", # Next.js Frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Med-Taxlil EEG Backend is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

# TODO: Add routers for upload and analysis
# from app.api.endpoints import upload, analysis
# app.include_router(upload.router, prefix="/api/v1/upload", tags=["upload"])
