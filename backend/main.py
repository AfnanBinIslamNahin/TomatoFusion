"""
TomatoFusion FastAPI Application.
Provides endpoints for health checking and 3-model ensemble disease diagnosis.
"""

import io
import logging
import os
from contextlib import asynccontextmanager
from typing import List

from fastapi import FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, UnidentifiedImageError

from .inference import (
    are_models_loaded,
    get_model_status,
    load_models,
    predict_ensemble,
)

# Logging setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("tomatofusion.main")

# Max upload size: 10 Megabytes
MAX_FILE_SIZE = 10 * 1024 * 1024
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png"}
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/jpg"}


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Loads Keras models once at server startup.
    Does not reload models on every request.
    """
    logger.info("Initializing TomatoFusion application...")
    model_status = load_models()
    loaded_count = sum(1 for v in model_status.values() if v)
    logger.info(f"Loaded {loaded_count}/3 models on startup.")
    yield
    logger.info("Shutting down TomatoFusion application...")


app = FastAPI(
    title="TomatoFusion API",
    description="Explainable Hybrid Ensemble Deep-Learning API for Tomato Leaf Disease Diagnosis",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS configuration
raw_origins = os.environ.get(
    "CORS_ORIGINS",
    "http://localhost:3000"
)
origins: List[str] = [orig.strip() for orig in raw_origins.split(",") if orig.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    """Root endpoint providing service details."""
    return {
        "service": "TomatoFusion Inference API",
        "description": "AI-Powered Tomato Leaf Disease Diagnosis",
        "endpoints": {
            "health": "/health",
            "predict": "/api/predict [POST, multipart/form-data, field: file]",
        },
        "models_loaded": are_models_loaded(),
    }


@app.get("/health")
def health_check():
    """
    Returns server health and model loading readiness.
    """
    model_status = get_model_status()
    all_loaded = are_models_loaded()
    return {
        "status": "ok",
        "models_loaded": all_loaded,
        "models": {k: v["loaded"] for k, v in model_status.items()},
        "details": model_status,
    }


@app.post("/api/predict")
async def predict_leaf(file: UploadFile = File(...)):
    """
    Diagnoses an uploaded tomato leaf image using the 3-model ensemble
    (EfficientNetV2M + MobileNetV3Large + DenseNet201) with Grad-CAM visual explanation.
    """
    # 1. Verify models are loaded
    if not are_models_loaded():
        logger.error("Predict endpoint called but models are not loaded.")
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=(
                "TomatoFusion models are not loaded. Please ensure "
                "best_efficientnetv2m_finetuned_model.keras, "
                "best_mobilenetv3large_finetuned_model.keras, and "
                "best_densenet201_finetuned_model.keras are placed in the backend/models directory."
            ),
        )

    # 2. File type validation by extension
    filename = file.filename or ""
    _, ext = os.path.splitext(filename.lower())
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file format '{ext}'. Please upload a JPG, JPEG, or PNG image.",
        )

    # 3. Read image bytes and validate maximum size
    try:
        contents = await file.read()
    except Exception as e:
        logger.error(f"Error reading uploaded file: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not read the uploaded file.",
        )

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size exceeds the 10 MB limit. Please select a smaller leaf image.",
        )

    if len(contents) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty.",
        )

    # 4. Safe image decoding and conversion to RGB
    try:
        image = Image.open(io.BytesIO(contents))
        image = image.convert("RGB")
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is not a valid image or could not be decoded.",
        )
    except Exception as e:
        logger.error(f"Image decode error: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to decode the image.",
        )

    # 5. Run inference pipeline
    try:
        diagnosis_report = predict_ensemble(image)
        return diagnosis_report
    except Exception as e:
        logger.error(f"Ensemble inference error: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An error occurred while analyzing the tomato leaf image.",
        )


if __name__ == "__main__":
    import uvicorn

    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", "8000"))
    uvicorn.run("backend.main:app", host=host, port=port, reload=True)
