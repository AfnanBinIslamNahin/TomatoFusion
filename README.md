# TomatoFusion: Smart Tomato Leaf Disease Diagnosis

TomatoFusion is a precision agricultural AI web platform designed to diagnose foliar tomato diseases using a 3-model deep learning ensemble with explainable Grad-CAM visual attention heatmaps.

---

## 1. System Architecture

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Vite.
- **Backend**: Python 3.10+, FastAPI, Uvicorn, TensorFlow / Keras, OpenCV Headless, Pillow.
- **Ensemble Model Strategy**:
  - **EfficientNetV2M** (Input size: $320 \times 320$, preprocessing: `tf.keras.applications.efficientnet_v2.preprocess_input`)
  - **MobileNetV3Large** (Input size: $224 \times 224$, preprocessing: `tf.keras.applications.mobilenet_v3.preprocess_input`)
  - **DenseNet201** (Input size: $224 \times 224$, preprocessing: `tf.keras.applications.densenet.preprocess_input`)
  - **Ensemble Mechanism**: Equal-weight soft voting consensus:
    $$\text{Final Probabilities} = \frac{P_{\text{eff}} + P_{\text{mob}} + P_{\text{dense}}}{3}$$
  - **Explainability**: Real Grad-CAM heatmap generated from the final convolutional feature layer of the EfficientNetV2M branch corresponding to the ensemble's argmax predicted class.
- **Recognized Tomato Leaf Conditions**:
  1. `Early Blight`
  2. `Healthy`
  3. `Late Blight`
  4. `Septoria Leaf Spot`

---

## 2. Directory Structure

```
TomatoFusion/
├── backend/
│   ├── __init__.py           # Python package marker
│   ├── disease_info.py       # Agronomic descriptions, symptoms, management, plant care
│   ├── gradcam.py            # Grad-CAM heatmap generation & image overlay
│   ├── inference.py          # 3-model loading, preprocessing & soft-voting ensemble
│   ├── main.py               # FastAPI application, CORS, input validation, endpoints
│   ├── models/               # Target directory for .keras model files
│   │   ├── best_efficientnetv2m_finetuned_model.keras
│   │   ├── best_mobilenetv3large_finetuned_model.keras
│   │   └── best_densenet201_finetuned_model.keras
│   └── requirements.txt      # Python dependencies
├── src/
│   ├── components/           # UI components (DiagnosisResult, ProbabilityBar, GradCAMViewer, etc.)
│   ├── pages/                # Page views (Home, Diagnose, Diseases, HowItWorks, About)
│   ├── services/             # API client (predictLeaf) with percentage normalization
│   ├── types/                # TypeScript interfaces and disease types
│   ├── utils/                # toPercentage normalization helper
│   ├── App.tsx               # Root tab navigation and routing
│   ├── index.css             # Tailwind CSS imports and global styles
│   └── main.tsx              # React StrictMode entry point
├── .env.example              # Example environment variables
├── .env.local                # Local environment overrides
├── .gitignore                # Git ignore rules
├── index.html                # Single-script entry point
├── package.json              # Frontend npm dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration with React and Tailwind plugins
└── README.md                 # Project documentation
```

---

## 3. Running the Project Locally

### A. Frontend (React + Vite)
```bash
# 1. Install dependencies
npm install

# 2. Start the development server (runs on http://localhost:3000)
npm run dev

# 3. Production build
npm run build
```

### B. Backend (Python + FastAPI)
Executed from the **project root**:
```bash
# 1. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install requirements
pip install -r backend/requirements.txt

# 3. Start the FastAPI server from the project root (runs on http://localhost:8000)
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

---

## 4. Models Directory

Place your three trained Keras model files into `backend/models/`:

1. `backend/models/best_efficientnetv2m_finetuned_model.keras`
2. `backend/models/best_mobilenetv3large_finetuned_model.keras`
3. `backend/models/best_densenet201_finetuned_model.keras`

The backend loads these models **once on server startup** during the FastAPI lifespan event.

---

## 5. What Remains Untestable Until Real `.keras` Files Are Added

1. **Ensemble Softmax Inference**:
   Without the weight tensors in the `.keras` files, TensorFlow cannot execute the forward passes (`predict()`). When calling `POST /api/predict` without models present, the backend cleanly and safely responds with `HTTP 503 Service Unavailable`, prompting the frontend to display:
   > *"Diagnosis service is temporarily unavailable. Please try again later."*

2. **Real Grad-CAM Heatmap Generation**:
   The gradient backpropagation via `tf.GradientTape()` on convolutional activations requires actual trained convolutional weights. Once the models are loaded, Grad-CAM overlays are dynamically generated and encoded as base64 JPEG data URIs for immediate UI rendering.

3. **Validation Status**:
   You can verify whether models are detected at any time by requesting:
   ```bash
   curl http://localhost:8000/health
   ```
   Output when models are pending:
   ```json
   {
     "status": "ok",
     "models_loaded": false,
     "models": {
       "efficientnetv2m": false,
       "mobilenetv3large": false,
       "densenet201": false
     }
   }
   ```
