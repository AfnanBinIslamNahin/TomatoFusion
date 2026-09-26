"""
TomatoFusion Grad-CAM Module.
Generates explainable Grad-CAM visual attention heatmaps from the
EfficientNetV2M branch for the ensemble's predicted disease class.
"""

import base64
import io
import logging
from typing import Optional
import cv2
import numpy as np
from PIL import Image
import tensorflow as tf

logger = logging.getLogger("tomatofusion.gradcam")


def find_last_conv_layer(model: tf.keras.Model) -> Optional[tf.keras.layers.Layer]:
    """
    Dynamically identifies the last 4D convolutional feature layer in the model.
    Checks top-level layers and inside nested sub-models if present.
    """
    # Check top-level layers first
    for layer in reversed(model.layers):
        try:
            if hasattr(layer, "output_shape") and layer.output_shape is not None:
                shape = layer.output_shape
                if isinstance(shape, tuple) and len(shape) == 4:
                    return layer
            elif hasattr(layer, "output") and len(layer.output.shape) == 4:
                return layer
        except Exception:
            continue

    # If nested model exists inside, check its layers
    for layer in reversed(model.layers):
        if hasattr(layer, "layers") and isinstance(layer.layers, list):
            for inner_layer in reversed(layer.layers):
                try:
                    if hasattr(inner_layer, "output_shape") and inner_layer.output_shape is not None:
                        shape = inner_layer.output_shape
                        if isinstance(shape, tuple) and len(shape) == 4:
                            return inner_layer
                    elif hasattr(inner_layer, "output") and len(inner_layer.output.shape) == 4:
                        return inner_layer
                except Exception:
                    continue

    # Fallback search by layer name/type
    for layer in reversed(model.layers):
        layer_type = layer.__class__.__name__.lower()
        if "conv" in layer_type or "fused" in layer_type:
            return layer

    return None


def generate_gradcam_heatmap(
    model: tf.keras.Model,
    preprocessed_img: np.ndarray,
    target_class_idx: int,
) -> Optional[np.ndarray]:
    """
    Computes normalized Grad-CAM heatmap [0, 1] for the specified class index.
    Handles flat models, sequential models, and nested backbones.
    """
    try:
        last_conv = find_last_conv_layer(model)
        if last_conv is None:
            logger.warning("Could not locate a 4D convolutional layer for Grad-CAM.")
            return None

        # Attempt direct gradient sub-model construction
        try:
            grad_model = tf.keras.models.Model(
                inputs=[model.inputs],
                outputs=[last_conv.output, model.output],
            )
            with tf.GradientTape() as tape:
                conv_outputs, predictions = grad_model(preprocessed_img)
                loss = predictions[:, target_class_idx]
            grads = tape.gradient(loss, conv_outputs)
        except Exception as direct_err:
            logger.debug(f"Direct Grad-CAM model creation failed ({direct_err}), trying nested resolution...")
            sub_model = None
            classifier_layers = []
            found_sub = False

            for l in model.layers:
                if hasattr(l, "layers") and last_conv in l.layers:
                    sub_model = l
                    found_sub = True
                elif found_sub:
                    classifier_layers.append(l)

            if sub_model is None:
                return None

            sub_grad_model = tf.keras.models.Model(
                inputs=[sub_model.inputs],
                outputs=[last_conv.output, sub_model.output],
            )

            with tf.GradientTape() as tape:
                conv_outputs, sub_features = sub_grad_model(preprocessed_img)
                tape.watch(conv_outputs)
                preds = sub_features
                for cl in classifier_layers:
                    preds = cl(preds)
                loss = preds[:, target_class_idx]

            grads = tape.gradient(loss, conv_outputs)

        if grads is None:
            logger.warning("Grad-CAM gradient tape returned None.")
            return None

        # Channel-wise mean of gradients
        pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

        # Weight feature channels by pooled gradients
        conv_outputs_val = conv_outputs[0]
        heatmap = conv_outputs_val @ pooled_grads[..., tf.newaxis]
        heatmap = tf.squeeze(heatmap)

        # Apply ReLU to keep only positive contributions
        heatmap = tf.maximum(heatmap, 0.0)

        # Normalize heatmap to [0, 1]
        max_val = tf.math.reduce_max(heatmap)
        if max_val > 0:
            heatmap = heatmap / max_val

        return heatmap.numpy()
    except Exception as e:
        logger.warning(f"Grad-CAM heatmap computation error: {e}")
        return None


def create_gradcam_overlay(
    original_pil_image: Image.Image,
    heatmap: np.ndarray,
    alpha: float = 0.45,
) -> Image.Image:
    """
    Overlays colored heatmap on the original tomato leaf image.
    """
    orig_np = np.array(original_pil_image)
    orig_h, orig_w = orig_np.shape[:2]

    # Resize heatmap to original image dimensions
    resized_heatmap = cv2.resize(heatmap, (orig_w, orig_h))

    # Scale to 0-255 uint8
    heatmap_uint8 = np.uint8(255 * resized_heatmap)

    # Apply COLORMAP_JET to generate heatmap colors
    colored_heatmap = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)

    # OpenCV COLORMAP_JET produces BGR, convert to RGB
    colored_heatmap_rgb = cv2.cvtColor(colored_heatmap, cv2.COLOR_BGR2RGB)

    # Blend original image with heatmap
    overlay = cv2.addWeighted(orig_np, 1.0 - alpha, colored_heatmap_rgb, alpha, 0)
    return Image.fromarray(overlay)


def generate_gradcam_data_url(
    model: tf.keras.Model,
    preprocessed_img: np.ndarray,
    original_pil_image: Image.Image,
    target_class_idx: int,
) -> str:
    """
    Main entry point for generating Grad-CAM visualization from EfficientNetV2M.
    Returns a base64 encoded data URI string (data:image/jpeg;base64,...),
    or an empty string if Grad-CAM cannot be computed.
    """
    try:
        heatmap = generate_gradcam_heatmap(
            model=model,
            preprocessed_img=preprocessed_img,
            target_class_idx=target_class_idx,
        )

        if heatmap is None:
            return ""

        overlay_img = create_gradcam_overlay(original_pil_image, heatmap)

        buffer = io.BytesIO()
        overlay_img.save(buffer, format="JPEG", quality=90)
        img_str = base64.b64encode(buffer.getvalue()).decode("utf-8")
        return f"data:image/jpeg;base64,{img_str}"
    except Exception as e:
        logger.warning(f"Failed to generate Grad-CAM data URL: {e}")
        return ""
