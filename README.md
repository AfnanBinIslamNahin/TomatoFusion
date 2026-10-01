# 🍅 TomatoFusion

**TomatoFusion** is an explainable hybrid ensemble deep learning system for tomato leaf disease classification and intelligent diagnosis support.

The project is being developed as an end-to-end AI application: from a self-collected real-field dataset and deep learning model development to a web-based diagnosis interface powered by a FastAPI backend.

> **Current status:** Core model development, ensemble inference, Grad-CAM explainability, frontend UI, FastAPI backend, local end-to-end testing, and initial cloud deployment are complete. Secure online hosting of the trained model files is the main remaining deployment step.

---

## 🌿 Supported Classes

TomatoFusion currently classifies tomato leaf images into four categories:

- Early Blight
- Healthy
- Late Blight
- Septoria Leaf Spot

---

## 🔬 Research Background

TomatoFusion was developed using a **completely self-collected tomato leaf image dataset** gathered by our team from real agricultural field environments in Bangladesh.

No public benchmark dataset images were used for model training. The images were reviewed, cleaned, and quality-filtered before model development so the system better reflects practical field conditions and natural variations in tomato leaves.

---

## 🧠 Model Development

Twelve individual deep learning architectures were trained and evaluated during the research phase.

The final TomatoFusion ensemble combines:

- **EfficientNetV2M**
- **MobileNetV3Large**
- **DenseNet201**

Each model independently produces class-wise probabilities. The final prediction is generated using **equal-weight soft voting**:

```text
Final Probability =
(EfficientNetV2M + MobileNetV3Large + DenseNet201) / 3
