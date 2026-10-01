# 🍅 TomatoFusion

**TomatoFusion** is an explainable hybrid ensemble deep learning system for tomato leaf disease classification and intelligent diagnosis support.

The project is being developed as an end-to-end AI application: from a self-collected real-field dataset and deep learning model development to a web-based diagnosis interface powered by a FastAPI backend.

> **Current Status:** Core model development, ensemble inference, Grad-CAM explainability, frontend UI, FastAPI backend, local end-to-end testing, and initial cloud deployment are complete. Secure online hosting of the trained model files is the main remaining deployment step.

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

No public benchmark dataset images were used for model training.

The collected images were carefully reviewed, cleaned, and quality-filtered before model development so that the system better reflects practical field conditions and natural variations in tomato leaves.

---

## 🧠 Model Development

During the research phase, a total of **12 individual deep learning architectures** were trained and evaluated.

The final TomatoFusion ensemble combines:

- **EfficientNetV2M**
- **MobileNetV3Large**
- **DenseNet201**

Each model independently produces class-wise probabilities.

The final prediction is generated using **equal-weight soft voting**:

```text
Final Probability =
(EfficientNetV2M + MobileNetV3Large + DenseNet201) / 3
```

The class with the highest averaged probability becomes the final prediction.

---

## 📐 Model Input Sizes

| Model | Input Size |
|---|---:|
| EfficientNetV2M | 320 × 320 |
| MobileNetV3Large | 224 × 224 |
| DenseNet201 | 224 × 224 |

---

## 📊 Final Model Performance

| Metric | Result |
|---|---:|
| Accuracy | **88.00%** |
| Macro Precision | **0.8204** |
| Macro Recall | **0.8154** |
| Macro F1-score | **0.8162** |
| Weighted F1-score | **0.8785** |
| Macro AUC | **0.9673** |

TomatoFusion improved overall performance compared with the strongest individual model by combining the prediction probabilities of three different CNN architectures.

---

## 🔥 Explainable AI with Grad-CAM

TomatoFusion includes **Grad-CAM visualization** to improve model interpretability.

- The final disease prediction comes from the complete three-model TomatoFusion ensemble.
- Grad-CAM is generated using the **EfficientNetV2M branch**.
- The visualization is generated for the class predicted by the complete ensemble.
- The heatmap highlights the image regions that influenced the prediction most strongly.

This helps users understand which areas of the tomato leaf contributed to the AI decision.

---

## 🩺 Intelligent Diagnosis Output

After analyzing a tomato leaf image, TomatoFusion is designed to provide:

- Predicted disease or condition
- Prediction confidence
- Class-wise probabilities
- Grad-CAM heatmap
- Disease description
- Common symptoms
- Management guidance
- Prevention guidance
- General plant-care information
- Safety advice

> **Safety Notice:** TomatoFusion provides AI-assisted guidance for informational and decision-support purposes. For serious disease outbreaks or before applying agricultural chemicals, consult a qualified agricultural professional and follow locally approved product-label instructions.

---

# 💻 Web Application

TomatoFusion has been developed as a full-stack AI web application with separate frontend and backend components.

---

## 🎨 Frontend

The frontend is built using:

- React
- TypeScript
- Vite
- Tailwind CSS

### Main Pages

The current web application includes:

- Home
- Diagnose
- Diseases
- How It Works
- About

### Diagnose Page Features

The Diagnose page currently supports:

- Tomato leaf image upload
- Drag-and-drop image upload
- JPG / JPEG / PNG validation
- Maximum upload size validation
- Image preview
- Change image
- Remove image
- Analyze Leaf button
- Loading state
- Diagnosis result display
- Confidence display
- Class probability bars
- Grad-CAM visualization section
- Disease description
- Symptoms
- Management guidance
- Prevention guidance
- Plant-care information
- Safety notice

The frontend does **not** generate fake predictions.

All real predictions are designed to come from the trained TomatoFusion backend.

---

## 🦠 Diseases Page

The Diseases page includes information for:

- Early Blight
- Late Blight
- Septoria Leaf Spot
- Healthy Tomato Leaves

The original AI-generated illustrations were replaced with real tomato leaf photographs.

The disease cards include:

- Real disease image
- Disease name
- Short description
- Symptoms
- Prevention information

---

## 👨‍💻 About Page

The About page contains:

- About TomatoFusion
- Project goal
- Supported tomato leaf conditions
- Research Background
- Developer information
- Research interests
- TomatoFusion branding

The Research Background explains that the training dataset was collected by our own team from real agricultural field environments in Bangladesh and that no public benchmark dataset images were used for model training.

---

# ⚙️ Backend

The backend is built using:

- Python
- FastAPI
- TensorFlow / Keras
- NumPy
- OpenCV
- Pillow
- python-multipart

The backend is responsible for:

- Image validation
- Image preprocessing
- Model loading
- Three-model inference
- Equal-weight soft voting
- Final prediction
- Confidence calculation
- Class probabilities
- Grad-CAM generation
- Disease information
- Management guidance
- Prevention guidance
- Plant-care information
- Safety advice

---

## 🔌 API Endpoints

### Health Check

```text
GET /health
```

This endpoint checks whether the FastAPI backend is running and whether the trained models have been loaded.

Example:

```json
{
  "status": "ok",
  "models_loaded": true
}
```

---

### Prediction Endpoint

```text
POST /api/predict
```

Request format:

```text
multipart/form-data
```

Field name:

```text
file
```

Supported image formats:

```text
JPG
JPEG
PNG
```

---

## 📦 Example API Response

```json
{
  "prediction": "Late Blight",
  "confidence": 0.94,
  "probabilities": {
    "Early Blight": 0.02,
    "Healthy": 0.01,
    "Late Blight": 0.94,
    "Septoria Leaf Spot": 0.03
  },
  "gradcam_url": "...",
  "description": "...",
  "symptoms": [],
  "management": [],
  "prevention": [],
  "plant_care": [],
  "safety_advice": "..."
}
```

The numerical values above represent the response structure only.

Actual predictions are generated by the trained TomatoFusion models.

---

# 🏗️ System Architecture

```text
User
  │
  ▼
React / Vite Frontend
  │
  │
  │ POST /api/predict
  ▼
FastAPI Backend
  │
  ├── EfficientNetV2M
  ├── MobileNetV3Large
  └── DenseNet201
  │
  ▼
Equal-Weight Soft Voting
  │
  ├── Final Prediction
  ├── Confidence
  ├── Class Probabilities
  └── Grad-CAM
  │
  ▼
Disease Information
  │
  ▼
Management + Prevention + Plant Care
  │
  ▼
User Result
```

---

# 📁 Project Structure

```text
TomatoFusion/
│
├── backend/
│   ├── __init__.py
│   ├── main.py
│   ├── inference.py
│   ├── gradcam.py
│   ├── disease_info.py
│   ├── requirements.txt
│   │
│   └── models/
│       └── README.md
│
├── public/
│   ├── TF.png
│   │
│   └── disease-images/
│       ├── early-blight.jpg
│       ├── late-blight.jpg
│       ├── septoria-leaf-spot.jpg
│       └── healthy.jpg
│
├── src/
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── .env.example
├── .gitignore
└── README.md
```

---

# 🤖 Trained Model Files

The TomatoFusion backend expects the following three trained models:

```text
backend/models/
│
├── best_efficientnetv2m_finetuned_model.keras
├── best_mobilenetv3large_finetuned_model.keras
└── best_densenet201_finetuned_model.keras
```

Approximate model sizes:

| Model | Approximate Size |
|---|---:|
| EfficientNetV2M | 383.8 MB |
| MobileNetV3Large | 35.9 MB |
| DenseNet201 | 104.9 MB |

The trained `.keras` files are intentionally excluded from the public source repository.

For local testing, these model files can be placed manually inside:

```text
backend/models/
```

For production deployment, the goal is to host these model files in secure private model storage and allow the backend to load them securely without exposing the trained weights publicly.

---

# 🚀 Local Development

## 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
```

Enter the project directory:

```bash
cd TomatoFusion
```

---

## 2. Create Python Virtual Environment

For the current macOS setup, Python 3.11 is used.

```bash
/Library/Frameworks/Python.framework/Versions/3.11/bin/python3.11 -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Verify Python:

```bash
python --version
```

---

## 3. Install Backend Dependencies

```bash
python -m pip install --upgrade pip
```

Then:

```bash
pip install -r backend/requirements.txt
```

---

## 4. Add Trained Models

Place the three trained `.keras` files inside:

```text
backend/models/
```

Required filenames:

```text
best_efficientnetv2m_finetuned_model.keras

best_mobilenetv3large_finetuned_model.keras

best_densenet201_finetuned_model.keras
```

---

## 5. Run the Backend

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Backend URL:

```text
http://localhost:8000
```

Health endpoint:

```text
http://localhost:8000/health
```

API documentation:

```text
http://localhost:8000/docs
```

When all models are correctly loaded, the backend should report:

```json
{
  "status": "ok",
  "models_loaded": true
}
```

---

## 6. Configure Frontend API

Create or update:

```text
.env.local
```

Add:

```env
VITE_API_BASE_URL=http://localhost:8000
```

---

## 7. Install Frontend Dependencies

```bash
npm install
```

---

## 8. Run Frontend

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:3000
```

---

# 🧪 Local Backend Verification

The local FastAPI backend has successfully loaded all three trained models.

Example successful startup output:

```text
Successfully loaded efficientnetv2m model.

Successfully loaded mobilenetv3large model.

Successfully loaded densenet201 model.

Loaded 3/3 models on startup.

Application startup complete.
```

This confirms that the model-loading pipeline currently works locally.

---

# 🌐 Cloud Deployment

## Frontend

The TomatoFusion frontend has been deployed using Render Static Site.

### Live Website

```text
https://tomatofusion.onrender.com
```

---

## Backend

The FastAPI backend has been deployed using Render Web Service.

### Backend API

```text
https://tomatofusion-api.onrender.com
```

### Health Endpoint

```text
https://tomatofusion-api.onrender.com/health
```

---

# ⚠️ Current Production Limitation

The frontend and backend are currently deployed online.

However, the three trained `.keras` model files are not yet connected to the production backend.

Therefore:

```text
Frontend UI                  ✅ Live

FastAPI Backend              ✅ Live

Local Model Loading          ✅ Working

Local Prediction             ✅ Available

Three Models Locally         ✅ Available

Secure Cloud Model Storage   🚧 In Progress

Public Online Prediction     🚧 Pending
```

The next deployment step is to host the trained models securely in private model storage and allow the Render backend to access them.

---

# 🔐 Model Privacy

The trained models are not intended to be uploaded publicly to the main GitHub repository.

The planned production architecture is:

```text
Public GitHub Repository
        │
        ├── Frontend Code
        └── Backend Code

Private Model Storage
        │
        ├── EfficientNetV2M.keras
        ├── MobileNetV3Large.keras
        └── DenseNet201.keras
        │
        ▼
Render FastAPI Backend
        │
        ▼
TomatoFusion Prediction
```

This approach keeps the trained model weights private while allowing users to access predictions through the public website.

---

# ✅ Current Development Progress

| Component | Status |
|---|---|
| Real-field data collection | ✅ Completed |
| Dataset cleaning | ✅ Completed |
| Dataset preparation | ✅ Completed |
| Class imbalance handling | ✅ Completed |
| Data augmentation | ✅ Completed |
| Transfer learning | ✅ Completed |
| 12 individual models | ✅ Completed |
| Individual model evaluation | ✅ Completed |
| Hybrid ensemble experiments | ✅ Completed |
| Five hybrid ensemble combinations | ✅ Completed |
| Final TomatoFusion ensemble | ✅ Completed |
| Equal-weight soft voting | ✅ Completed |
| Final test evaluation | ✅ Completed |
| Grad-CAM integration | ✅ Implemented |
| Intelligent diagnosis module | ✅ Implemented |
| Disease information module | ✅ Implemented |
| Management guidance | ✅ Implemented |
| Prevention guidance | ✅ Implemented |
| Plant-care guidance | ✅ Implemented |
| Safety guidance | ✅ Implemented |
| React frontend | ✅ Completed |
| Responsive UI | ✅ Completed |
| Real disease photographs | ✅ Added |
| TomatoFusion logo | ✅ Added |
| About section | ✅ Completed |
| Research Background | ✅ Added |
| FastAPI backend | ✅ Completed |
| API endpoints | ✅ Completed |
| Image upload API | ✅ Completed |
| Local three-model loading | ✅ Working |
| Local backend testing | ✅ Working |
| Frontend cloud deployment | ✅ Live |
| Backend cloud deployment | ✅ Live |
| Secure private model hosting | 🚧 In Progress |
| Public production inference | 🚧 Pending |
| Final production testing | 🚧 In Progress |

---

# 🛣️ Next Steps

The current development roadmap includes:

1. Host the three trained `.keras` models in secure private model storage.
2. Connect the Render backend to the private model repository.
3. Automatically download the trained models during deployment.
4. Verify that production `/health` returns:

```json
{
  "models_loaded": true
}
```

5. Test public tomato leaf image prediction.
6. Verify class probabilities.
7. Verify Grad-CAM output in production.
8. Test different disease classes.
9. Monitor backend RAM usage.
10. Optimize cloud deployment.
11. Perform final production testing.
12. Improve deployment scalability.

---

# 🔮 Future Work

Future improvements may include:

- Additional tomato disease classes
- Larger and more geographically diverse field datasets
- Mobile application development
- Lightweight model optimization
- Model compression
- Confidence calibration
- Lesion segmentation
- Advanced ensemble strategies
- Farmer and agricultural expert validation
- Cloud optimization
- Real-time mobile diagnosis
- IoT integration
- Multilingual diagnosis support

---

# 👨‍💻 Developer

## Afnan Bin Islam Nahin

**BSc in Computer Science and Engineering**

**American International University-Bangladesh (AIUB)**

### Research Interests

- Artificial Intelligence
- Machine Learning
- Deep Learning
- Computer Vision
- Explainable Artificial Intelligence
- AI-based real-world applications

---

# 📌 Project Status

## Active Development

TomatoFusion has progressed from deep learning experimentation to a working full-stack AI application.

The following major components have already been implemented:

```text
Research Dataset
      ↓
Model Training
      ↓
Individual Model Evaluation
      ↓
Hybrid Ensemble Development
      ↓
TomatoFusion Model
      ↓
Soft Voting
      ↓
Grad-CAM
      ↓
FastAPI Backend
      ↓
React Frontend
      ↓
Cloud Deployment
```

Current development is focused on:

```text
Secure Model Hosting
        ↓
Production Model Loading
        ↓
Public Online Prediction
        ↓
Final Deployment Testing
```

---

# ⚠️ Disclaimer

TomatoFusion is an AI-assisted research and agricultural decision-support system.

The predictions and recommendations provided by the system are intended for informational and decision-support purposes only.

They should not be considered a replacement for professional agricultural diagnosis or expert consultation.

For serious disease outbreaks or before applying agricultural chemicals, users should consult qualified agricultural professionals and follow locally approved product-label instructions.

---

# ⭐ TomatoFusion

**Smart Tomato Leaf Disease Diagnosis**

Built with Deep Learning, Explainable AI, FastAPI, and React.
