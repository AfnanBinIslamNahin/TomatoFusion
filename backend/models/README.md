# TomatoFusion Model Directory

Place your 3 trained Keras model files directly in this directory:

1. `best_efficientnetv2m_finetuned_model.keras`
2. `best_mobilenetv3large_finetuned_model.keras`
3. `best_densenet201_finetuned_model.keras`

## Model Architecture Details

- **EfficientNetV2M**:
  - Input resolution: `320 x 320`
  - Preprocessing: `tf.keras.applications.efficientnet_v2.preprocess_input`
  - Used for Grad-CAM visual attention heatmaps

- **MobileNetV3Large**:
  - Input resolution: `224 x 224`
  - Preprocessing: `tf.keras.applications.mobilenet_v3.preprocess_input`

- **DenseNet201**:
  - Input resolution: `224 x 224`
  - Preprocessing: `tf.keras.applications.densenet.preprocess_input`

## Ensemble Prediction Pipeline

The backend applies equal-weight soft voting across all three models:
```python
final_prediction = (pred_efficientnetv2m + pred_mobilenetv3large + pred_densenet201) / 3
```

Class indices:
- `0`: Early Blight
- `1`: Healthy
- `2`: Late Blight
- `3`: Septoria Leaf Spot
