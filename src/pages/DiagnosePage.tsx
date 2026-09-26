/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { LoadingState } from '../components/LoadingState';
import { DiagnosisResult } from '../components/DiagnosisResult';
import {
  predictLeaf,
  getApiBaseUrl,
  SAMPLE_API_SCHEMA_PAYLOAD,
  ApiConnectionError,
} from '../services/api';
import { DiagnosisResponse } from '../types/diagnosis';
import {
  AlertTriangle,
  RotateCcw,
  Settings2,
  ExternalLink,
  Server,
} from 'lucide-react';

interface DiagnosePageProps {
  onNavigateHome: () => void;
  onOpenApiSettings: () => void;
  backendOnline?: boolean;
}

export const DiagnosePage: React.FC<DiagnosePageProps> = ({
  onNavigateHome,
  onOpenApiSettings,
  backendOnline,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorNotice, setErrorNotice] = useState<{
    message: string;
    isConnectionError: boolean;
    details?: string;
  } | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResponse | null>(null);
  const [isSchemaPreviewMode, setIsSchemaPreviewMode] = useState<boolean>(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setErrorNotice(null);
    setDiagnosisResult(null);
    setIsSchemaPreviewMode(false);
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorNotice(null);
    setDiagnosisResult(null);
    setIsSchemaPreviewMode(false);
  };

  const handleAnalyzeLeaf = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorNotice(null);
    setDiagnosisResult(null);
    setIsSchemaPreviewMode(false);

    try {
      // Calls POST {baseUrl}/api/predict with multipart/form-data field 'file'
      const response = await predictLeaf(selectedFile);
      setDiagnosisResult(response);
    } catch (err: unknown) {
      if (err instanceof ApiConnectionError) {
        setErrorNotice({
          message: err.message,
          isConnectionError: err.isConnectionError,
        });
      } else {
        setErrorNotice({
          message: 'Diagnosis service is not connected yet.',
          isConnectionError: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Preview helper for inspecting the diagnosis report UI layout
  const handleLoadSchemaPreview = () => {
    if (!previewUrl) {
      const canvas = document.createElement('canvas');
      canvas.width = 480;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f4f4f0';
        ctx.fillRect(0, 0, 480, 480);
        ctx.fillStyle = '#15803d';
        ctx.beginPath();
        ctx.arc(240, 240, 180, 0, Math.PI * 2);
        ctx.fill();
      }
      setPreviewUrl(canvas.toDataURL());
    }
    setDiagnosisResult(SAMPLE_API_SCHEMA_PAYLOAD);
    setIsSchemaPreviewMode(true);
    setErrorNotice(null);
  };

  const handleAnalyzeAnother = () => {
    setDiagnosisResult(null);
    setIsSchemaPreviewMode(false);
    setErrorNotice(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Subtle Service Status Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:px-5 rounded-2xl bg-white border border-stone-200 shadow-2xs text-xs">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              backendOnline ? 'bg-emerald-500' : 'bg-amber-400'
            }`}
          />
          <span className="font-semibold text-stone-700">
            {backendOnline ? 'Diagnosis Server:' : 'Diagnosis Service Status:'}
          </span>
          <span className="text-stone-500">
            {backendOnline ? 'Online & Ready' : 'Awaiting Connection'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenApiSettings}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 font-medium transition cursor-pointer"
          >
            <Settings2 className="w-3.5 h-3.5 text-stone-500" />
            <span>Connection Settings</span>
          </button>

          {!diagnosisResult && (
            <button
              type="button"
              onClick={handleLoadSchemaPreview}
              title="Preview how the diagnosis result screen looks"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold transition cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
              <span>Preview Result UI</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <LoadingState fileName={selectedFile?.name} />
      ) : diagnosisResult && previewUrl ? (
        <div className="space-y-4">
          {isSchemaPreviewMode && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Sample Report Preview:</strong> Displaying a preview of the report layout. (Backend inference service not connected).
                </span>
              </div>
              <button
                type="button"
                onClick={handleAnalyzeAnother}
                className="text-amber-900 font-bold underline shrink-0 cursor-pointer"
              >
                Return to Uploader
              </button>
            </div>
          )}
          <DiagnosisResult
            result={diagnosisResult}
            originalImageUrl={previewUrl}
            onAnalyzeAnother={handleAnalyzeAnother}
            onBackToHome={onNavigateHome}
          />
        </div>
      ) : (
        <div className="space-y-8">
          <ImageUploader
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileSelect={handleFileSelect}
            onRemove={handleRemoveImage}
            onAnalyze={handleAnalyzeLeaf}
            isLoading={isLoading}
          />

          {/* Backend Disconnected Message */}
          {errorNotice && (
            <div className="max-w-3xl mx-auto rounded-3xl border border-amber-200 bg-amber-50/90 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-amber-100 text-amber-800 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-amber-950 font-sans">
                    {errorNotice.message}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-normal">
                    The TomatoFusion website is fully set up and ready to send leaf photos to your Python backend at <code className="font-mono text-xs bg-amber-100/80 px-1 py-0.5 rounded">{getApiBaseUrl()}/api/predict</code>. TomatoFusion does not generate fake or random predictions.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-200/60">
                <button
                  type="button"
                  onClick={onOpenApiSettings}
                  className="inline-flex items-center gap-1.5 font-bold text-amber-900 hover:text-amber-950 underline cursor-pointer"
                >
                  <Settings2 className="w-4 h-4" />
                  <span>Configure Backend URL / View Setup Info</span>
                </button>

                <button
                  type="button"
                  onClick={handleLoadSchemaPreview}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-semibold transition cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Preview Diagnosis Report UI</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
