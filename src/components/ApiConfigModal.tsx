/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  X,
  Server,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Code2,
  Copy,
  Check,
  RotateCw,
} from 'lucide-react';
import {
  getApiBaseUrl,
  setApiBaseUrl,
  checkApiHealth,
  DEFAULT_API_BASE_URL,
} from '../services/api';

interface ApiConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadSchemaPreview?: () => void;
  onConnectionChange?: (online: boolean) => void;
}

export const ApiConfigModal: React.FC<ApiConfigModalProps> = ({
  isOpen,
  onClose,
  onLoadSchemaPreview,
  onConnectionChange,
}) => {
  const [url, setUrl] = useState(getApiBaseUrl());
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState<{ online: boolean; message: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUrl(getApiBaseUrl());
      testConnection();
    }
  }, [isOpen]);

  const testConnection = async () => {
    setChecking(true);
    const result = await checkApiHealth();
    setStatus(result);
    setChecking(false);
    if (onConnectionChange) {
      onConnectionChange(result.online);
    }
  };

  const handleSave = () => {
    setApiBaseUrl(url);
    testConnection();
  };

  const handleReset = () => {
    setUrl(DEFAULT_API_BASE_URL);
    setApiBaseUrl(DEFAULT_API_BASE_URL);
    testConnection();
  };

  const fastapiSnippet = `# TomatoFusion Python FastAPI Inference Server
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="TomatoFusion Diagnosis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "online"}

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    # 1. Read uploaded image bytes
    contents = await file.read()

    # 2. Run your trained TomatoFusion deep learning model

    # 3. Return diagnosis report matching the application schema
    return {
        "prediction": "Late Blight",
        "confidence": 94.27,
        "probabilities": {
            "Early Blight": 2.14,
            "Healthy": 0.83,
            "Late Blight": 94.27,
            "Septoria Leaf Spot": 2.76
        },
        "gradcam_url": "", # Base64 data URL or image path
        "description": "Late blight is a fast-spreading leaf condition that creates dark, water-soaked patches on tomato leaves and stems.",
        "symptoms": [
            "Large, irregular dark water-soaked patches on leaves",
            "Pale yellow borders around spots",
            "Whitish fuzzy growth on undersides in humid mornings"
        ],
        "management": [
            "Prune and discard infected leaves safely away from plants",
            "Disinfect pruning shears with rubbing alcohol between plants",
            "Avoid handling foliage when wet with rain or dew"
        ],
        "prevention": [
            "Space plants well (60-75 cm apart) for good airflow",
            "Use drip irrigation to keep leaves dry",
            "Apply clean mulch around plant bases to stop soil splash"
        ],
        "plant_care": [
            "Avoid excessive nitrogen fertilizer which causes dense foliage",
            "Maintain balanced watering without alternating extremes"
        ],
        "safety_advice": "TomatoFusion provides AI-assisted guidance for informational and decision-support purposes. For serious disease outbreaks or before applying agricultural chemicals, consult a qualified agricultural professional and follow locally approved product-label instructions."
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
`;

  const copyCode = () => {
    navigator.clipboard.writeText(fastapiSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-stone-900 font-sans">
                Diagnosis API Connection
              </h3>
              <p className="text-xs text-stone-500">
                Connect TomatoFusion to your Python backend server
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Base URL input */}
          <div className="space-y-2">
            <label htmlFor="api-url-input" className="block text-xs font-bold uppercase tracking-wider text-stone-600">
              Backend Server URL
            </label>
            <div className="flex gap-2">
              <input
                id="api-url-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="http://localhost:8000"
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-300 font-mono text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                Save
              </button>
              <button
                type="button"
                onClick={testConnection}
                disabled={checking}
                className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 transition cursor-pointer"
                title="Test Connection"
              >
                <RotateCw className={`w-4 h-4 ${checking ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span>Default: <code className="font-mono text-stone-600">http://localhost:8000</code></span>
              <button
                type="button"
                onClick={handleReset}
                className="text-emerald-700 hover:underline cursor-pointer"
              >
                Reset to default
              </button>
            </div>
          </div>

          {/* Connection Status Box */}
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
              status?.online
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            {status?.online ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1 flex-1">
              <p className="font-bold">
                {status?.online
                  ? 'Diagnosis Service Connected'
                  : 'Diagnosis service is not connected yet.'}
              </p>
              <p className="text-xs opacity-90">
                {status?.message || 'Testing connectivity...'}
              </p>
            </div>
          </div>

          {/* UI Results Preview Button */}
          {onLoadSchemaPreview && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600">
                  Preview Diagnosis Report UI
                </span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-stone-200 text-stone-700">
                  Preview Mode
                </span>
              </div>
              <p className="text-xs text-stone-500 leading-relaxed">
                Inspect how the complete Diagnosis Result screen (with Grad-CAM viewer, probability bars, management steps, and plant care guidance) looks before connecting your backend.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLoadSchemaPreview();
                }}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-stone-300 text-stone-800 hover:bg-stone-100 transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
                <span>Open Diagnosis Report Preview</span>
              </button>
            </div>
          )}

          {/* FastAPI Snippet */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-emerald-600" />
                Python FastAPI Starter Code
              </span>
              <button
                type="button"
                onClick={copyCode}
                className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:text-emerald-900 cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-stone-900 text-stone-100 font-mono text-[11px] overflow-x-auto max-h-40 border border-stone-800">
              <code>{fastapiSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-stone-100 bg-stone-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
