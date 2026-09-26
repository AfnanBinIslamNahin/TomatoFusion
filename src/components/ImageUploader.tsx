/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileImage,
  X,
  RefreshCw,
  Sparkles,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Camera,
} from 'lucide-react';

interface ImageUploaderProps {
  selectedFile: File | null;
  previewUrl: string | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  selectedFile,
  previewUrl,
  onFileSelect,
  onRemove,
  onAnalyze,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

  const validateAndHandleFile = (file: File) => {
    setFileError(null);

    const type = file.type.toLowerCase();
    const isJpegOrPng =
      ALLOWED_TYPES.includes(type) ||
      file.name.toLowerCase().endsWith('.jpg') ||
      file.name.toLowerCase().endsWith('.jpeg') ||
      file.name.toLowerCase().endsWith('.png');

    if (!isJpegOrPng) {
      setFileError('Invalid file type. Please upload a JPG, JPEG, or PNG image.');
      return;
    }

    if (file.size > MAX_SIZE_BYTES) {
      setFileError('File exceeds 10 MB limit. Please select a smaller leaf image.');
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndHandleFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="w-full space-y-8">
      {/* Page Heading & Subtitle */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-950 font-sans tracking-tight">
          Diagnose Your Tomato Leaf
        </h1>
        <p className="text-stone-600 text-sm sm:text-base font-normal">
          Upload a clear photo of a tomato leaf to check its condition.
        </p>
      </div>

      {/* Main Upload Box */}
      <div className="max-w-3xl mx-auto">
        {!previewUrl ? (
          /* Drag and Drop Area */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-3xl border-2 border-dashed p-8 sm:p-14 text-center cursor-pointer transition-all duration-200 bg-white ${
              isDragOver
                ? 'border-emerald-600 bg-emerald-50/60 scale-[1.01]'
                : 'border-stone-300 hover:border-emerald-500 hover:bg-stone-50/60 shadow-xs'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              className="hidden"
              onChange={handleInputChange}
            />

            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shadow-xs">
                <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Drag & Drop Your Tomato Leaf Image Here
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  or choose a picture from your device or camera
                </p>
              </div>

              <button
                type="button"
                className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-sm transition-all pointer-events-none"
              >
                <Camera className="w-4 h-4" />
                <span>Choose Image</span>
              </button>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-400">
                <span className="px-2 py-0.5 rounded bg-stone-100 font-mono">JPG</span>
                <span className="px-2 py-0.5 rounded bg-stone-100 font-mono">JPEG</span>
                <span className="px-2 py-0.5 rounded bg-stone-100 font-mono">PNG</span>
                <span>•</span>
                <span className="font-semibold text-stone-600">Maximum file size: 10 MB</span>
              </div>
            </div>
          </div>
        ) : (
          /* Preview Mode */
          <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="relative aspect-16/10 sm:aspect-2/1 w-full rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 flex items-center justify-center shadow-inner">
              <img
                src={previewUrl}
                alt="Selected tomato leaf"
                className="w-full h-full object-contain"
              />
            </div>

            {/* File Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200 text-stone-700 text-xs sm:text-sm">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0">
                  <FileImage className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-stone-900 truncate">
                    {selectedFile?.name || 'Selected leaf image'}
                  </p>
                  <p className="text-stone-500 text-xs">
                    {selectedFile ? formatFileSize(selectedFile.size) : ''}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Change Image</span>
                </button>
                <button
                  type="button"
                  onClick={onRemove}
                  disabled={isLoading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-rose-200 bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold transition cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove Image</span>
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
              className="hidden"
              onChange={handleInputChange}
            />

            {/* Analyze Leaf Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onAnalyze}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-extrabold text-base sm:text-lg shadow-sm hover:shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-5 h-5 text-emerald-200" />
                <span>Analyze Leaf</span>
              </button>
            </div>
          </div>
        )}

        {/* Error notification if validation fails */}
        {fileError && (
          <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <span>{fileError}</span>
          </div>
        )}
      </div>

      {/* For Better Results Section */}
      <div className="max-w-3xl mx-auto rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 text-stone-800">
        <div className="flex items-center gap-2 mb-3 text-emerald-950 font-bold text-sm sm:text-base">
          <HelpCircle className="w-4 h-4 text-emerald-700" />
          <span>For Better Results</span>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-600">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Use a clear and focused image</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Make sure the leaf is clearly visible</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Avoid blurry or extremely dark photos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Prefer one tomato leaf in the image when possible</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
