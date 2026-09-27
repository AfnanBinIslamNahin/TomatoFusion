"""
TomatoFusion Inference Pipeline.
Loads the three fine-tuned Keras models, handles architecture-specific preprocessing,
performs equal-weight soft voting ensemble, and generates the diagnosis response.
"""

import logging
import os
from typing import Dict, Any, Tuple
import numpy as np
from PIL import Image
import tensorflow as tf

from .disease_info import get_disease_info
from .gradcam import generate_gradcam_data_url

logger = logging.getLogger("tomatofusion.inference")

# Strict, consistent class ordering
CLASSES = [
    "Early Blight",
    "Healthy",
    "Late Blight",
    "Septoria Leaf Spot",
]

# Model filenames
MODEL_FILENAMES = {
    "efficientnetv2m": "best_efficientnetv2m_finetuned_model.keras",
    "mobilenetv3large": "best_mobilenetv3large_finetuned_model.keras",
    "densenet201": "best_densenet201_finetuned_model.keras",
}

# In-memory model registry
_MODELS: Dict[str, Any] = {
    "efficientnetv2m": None,
    "mobilenetv3large": None,
    "densenet201": None,
}


def get_models_dir() -> str:
    """Returns the models directory path, configurable via TOMATOFUSION_MODELS_DIR."""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    return os.environ.get("TOMATOFUSION_MODELS_DIR", os.path.join(base_dir, "models"))


def get_model_paths() -> Dict[str, str]:
    """Returns absolute paths for all three model files."""
    models_dir = get_models_dir()
    return {
        key: os.path.join(models_dir, filename)
        for key, filename in MODEL_FILENAMES.items()
    }


def load_models() -> Dict[str, bool]:
    """
    Loads the three fine-tuned Keras models into memory.
    Called once during FastAPI startup.
    """
    paths = get_model_paths()
    status = {}

    for key, path in paths.items():
        if os.path.exists(path):
            try:
                logger.info(f"Loading {key} model from {path}...")
                _MODELS[key] = tf.keras.models.load_model(path, compile=False)
                status[key] = True
                logger.info(f"Successfully loaded {key} model.")
            except Exception as e:
                logger.error(f"Failed to load {key} model from {path}: {e}")
                _MODELS[key] = None
                status[key] = False
        else:
            logger.warning(f"Model file not found for {key} at {path}")
            _MODELS[key] = None
            status[key] = False

    return status


def are_models_loaded() -> bool:
    """Checks whether all three models are loaded and ready for inference."""
    return all(_MODELS[k] is not None for k in MODEL_FILENAMES.keys())


def get_model_status() -> Dict[str, Any]:
    """Returns the loading and file existence status for all models."""
    paths = get_model_paths()
    return {
        key: {
            "file": MODEL_FILENAMES[key],
            "file_exists": os.path.exists(paths[key]),
            "loaded": _MODELS[key] is not None,
            "path": paths[key],
        }
        for key in MODEL_FILENAMES.keys()
    }


def prepare_inputs(image: Image.Image) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
    """
    Prepares input tensors with architecture-specific dimensions and preprocessing:
      - EfficientNetV2M: 320x320 with tf.keras.applications.efficientnet_v2.preprocess_input
      - MobileNetV3Large: 224x224 with tf.keras.applications.mobilenet_v3.preprocess_input
      - DenseNet201: 224x224 with tf.keras.applications.densenet.preprocess_input
    """
    # 1. EfficientNetV2M: 320 x 320
    img_eff = image.resize((320, 320), Image.Resampling.BILINEAR)
    arr_eff = np.array(img_eff, dtype=np.float32)
    arr_eff = np.expand_dims(arr_eff, axis=0)
    input_eff = tf.keras.applications.efficientnet_v2.preprocess_input(arr_eff)

    # 2. MobileNetV3Large: 224 x 224
    img_mob = image.resize((224, 224), Image.Resampling.BILINEAR)
    arr_mob = np.array(img_mob, dtype=np.float32)
    arr_mob = np.expand_dims(arr_mob, axis=0)
    input_mob = tf.keras.applications.mobilenet_v3.preprocess_input(arr_mob)

    # 3. DenseNet201: 224 x 224
    img_dense = image.resize((224, 224), Image.Resampling.BILINEAR)
    arr_dense = np.array(img_dense, dtype=np.float32)
    arr_dense = np.expand_dims(arr_dense, axis=0)
    input_dense = tf.keras.applications.densenet.preprocess_input(arr_dense)

    return input_eff, input_mob, input_dense


def predict_ensemble(image: Image.Image) -> Dict[str, Any]:
    """
    Runs the TomatoFusion 3-model soft-voting ensemble prediction:
      1. Preprocesses image for each backbone
      2. Obtains independent softmax probability vectors P1, P2, P3
      3. Computes equal-weight soft voting: (P1 + P2 + P3) / 3
      4. Identifies argmax class and confidence
      5. Generates Grad-CAM visualization from EfficientNetV2M for the final predicted class
      6. Bundles disease description, symptoms, management, prevention, plant care, safety advice
    """
    if not are_models_loaded():
        raise RuntimeError("TomatoFusion models are not loaded. Please ensure all 3 .keras files are present.")

    input_eff, input_mob, input_dense = prepare_inputs(image)

    # Independent forward passes
    pred_eff = _MODELS["efficientnetv2m"].predict(input_eff, verbose=0)[0]
    pred_mob = _MODELS["mobilenetv3large"].predict(input_mob, verbose=0)[0]
    pred_dense = _MODELS["densenet201"].predict(input_dense, verbose=0)[0]

    # Equal-weight soft voting consensus
    final_probs = (pred_eff + pred_mob + pred_dense) / 3.0

    # Argmax prediction and confidence
    pred_idx = int(np.argmax(final_probs))
    pred_class = CLASSES[pred_idx]
    confidence = float(final_probs[pred_idx])

    # Class probability dictionary mapped to exact class labels
    probabilities = {
        CLASSES[i]: round(float(final_probs[i]), 4)
        for i in range(len(CLASSES))
    }

    # Generate Grad-CAM from the EfficientNetV2M branch for the ensemble's predicted class
    gradcam_url = generate_gradcam_data_url(
        model=_MODELS["efficientnetv2m"],
        preprocessed_img=input_eff,
        original_pil_image=image,
        target_class_idx=pred_idx,
    )

    # Agronomic guidance dictionary
    info = get_disease_info(pred_class)

    return {
        "prediction": pred_class,
        "confidence": round(confidence, 4),
        "probabilities": probabilities,
        "gradcam_url": gradcam_url,
        "description": info["description"],
        "symptoms": info["symptoms"],
        "management": info["management"],
        "prevention": info["prevention"],
        "plant_care": info["plant_care"],
        "safety_advice": info["safety_advice"],
    }
