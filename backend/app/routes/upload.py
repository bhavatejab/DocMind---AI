from fastapi import APIRouter, UploadFile, File
from app.services.pdf_loader import extract_text_from_pdf
from app.services.text_splitter import split_text
from app.services.vector_store import create_vector_store

import shutil
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text_from_pdf(file_path)

    chunks = split_text(extracted_text)

    create_vector_store(chunks)

    return {
        "filename": file.filename,
        "characters": len(extracted_text),
        "total_chunks": len(chunks),
        "message": "Vector database created successfully!"
    }