/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { LoadingState } from '../components/LoadingState';
import { DiagnosisResult } from '../components/DiagnosisResult';
import { predictLeaf } from '../services/api';
import { DiagnosisResponse } from '../types/diagnosis';
import { AlertCircle } from 'lucide-react';

interface DiagnosePageProps {
  onNavigateHome: () => void;
}

export const DiagnosePage: React.FC<DiagnosePageProps> = ({ onNavigateHome }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResponse | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setErrorMessage(null);
    setDiagnosisResult(null);
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    setDiagnosisResult(null);
  };

  const handleAnalyzeLeaf = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setErrorMessage(null);
    setDiagnosisResult(null);

    try {
      // Calls POST {VITE_API_BASE_URL}/api/predict with multipart/form-data field 'file'
      const response = await predictLeaf(selectedFile);
      setDiagnosisResult(response);
    } catch {
      setErrorMessage('Diagnosis service is temporarily unavailable. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeAnother = () => {
    setDiagnosisResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {isLoading ? (
        <LoadingState fileName={selectedFile?.name} />
      ) : diagnosisResult && previewUrl ? (
        <DiagnosisResult
          result={diagnosisResult}
          originalImageUrl={previewUrl}
          onAnalyzeAnother={handleAnalyzeAnother}
          onBackToHome={onNavigateHome}
        />
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

          {/* User-friendly error message if backend is unavailable */}
          {errorMessage && (
            <div className="max-w-3xl mx-auto rounded-2xl border border-amber-200 bg-amber-50/90 p-5 sm:p-6 shadow-xs flex items-start gap-3.5 text-amber-950 animate-in fade-in-50 duration-200">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold text-sm sm:text-base text-amber-950">
                  {errorMessage}
                </p>
                <p className="text-xs sm:text-sm text-amber-900/80 font-normal">
                  We could not connect to the diagnosis service at this time. Please check your network connection and try again.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
