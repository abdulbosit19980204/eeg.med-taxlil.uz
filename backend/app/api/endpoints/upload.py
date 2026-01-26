from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
from pathlib import Path

router = APIRouter()

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/")
async def upload_edf(file: UploadFile = File(...)):
    if not file.filename.endswith(('.edf', '.bdf')):
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload .edf or .bdf")
    
    file_path = UPLOAD_DIR / file.filename
    
    try:
        with file_path.open("wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not save file: {str(e)}")
        
    return {
        "filename": file.filename,
        "saved_path": str(file_path),
        "message": "File uploaded successfully"
    }
