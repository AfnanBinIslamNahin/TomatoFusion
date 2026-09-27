/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DiagnosisResponse } from '../types/diagnosis';
import { toPercentage } from '../utils/format';
import { ProbabilityBar } from './ProbabilityBar';
import { GradCAMViewer } from './GradCAMViewer';
import { SafetyNotice } from './SafetyNotice';
import {
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Sprout,
  CheckSquare,
  HelpCircle,
  FileCheck2,
} from 'lucide-react';

interface DiagnosisResultProps {
  result: DiagnosisResponse;
  originalImageUrl: string;
  onAnalyzeAnother: () => void;
  onBackToHome: () => void;
}

export const DiagnosisResult: React.FC<DiagnosisResultProps> = ({
  result,
  originalImageUrl,
  onAnalyzeAnother,
  onBackToHome,
}) => {
  const isHealthy = result.prediction.toLowerCase().includes('healthy');

  // Friendly title format: e.g. "Late Blight Detected" or "Healthy Leaf Detected"
  const formattedDetectedTitle = isHealthy
    ? 'Healthy Leaf Detected'
    : `${result.prediction} Detected`;

  const managementList = result.management || result.treatment || [];
  const preventionList = result.prevention || [];
  const plantCareList = result.plant_care || result.fertilizer || [];
  const symptomsList = result.symptoms || [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in-50 duration-300">
      {/* Top Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            TomatoFusion Analysis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-sans tracking-tight">
            Leaf Diagnosis Report
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            Status: Complete
          </span>
        </div>
      </div>

      {/* SECTION A: DIAGNOSIS SUMMARY & SECTION B: CLASS PROBABILITIES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* A. Diagnosis Summary Card (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Diagnosis Summary
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                  isHealthy
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border-amber-200'
                }`}
              >
                {isHealthy ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                ) : (
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                )}
                {isHealthy ? 'Healthy Leaf' : 'Leaf Issue'}
              </span>
            </div>

            {/* Uploaded Tomato Leaf Image */}
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-900 border border-stone-200 shadow-inner">
              <img
                src={originalImageUrl}
                alt="Uploaded tomato leaf"
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-medium text-white">
                Uploaded Leaf
              </div>
            </div>

            {/* Detected Condition & Confidence */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 space-y-2">
              <div className="text-xs font-semibold text-stone-500">
                Detected Condition:
              </div>
              <div className="text-2xl font-black text-stone-900 tracking-tight">
                {formattedDetectedTitle}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-200 text-xs">
                <span className="text-stone-500">Confidence:</span>
                <span className="font-mono font-extrabold text-base text-emerald-700">
                  {toPercentage(result.confidence)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* B. Class Probabilities (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <ProbabilityBar
            probabilities={result.probabilities}
            topPrediction={result.prediction}
          />

          <div className="mt-6 pt-4 border-t border-stone-100 text-xs text-stone-500">
            Probability breakdown across the four recognized tomato leaf conditions.
          </div>
        </div>
      </div>

      {/* SECTION C: AI VISUAL EXPLANATION */}
      <GradCAMViewer
        originalImageUrl={originalImageUrl}
        gradcamUrl={result.gradcam_url}
        predictionName={result.prediction}
      />

      {/* SECTION D: ABOUT THIS CONDITION */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg sm:text-xl text-stone-900 font-sans">
              About This Condition
            </h3>
            <p className="text-xs text-stone-500">Understanding what was found on the leaf</p>
          </div>
        </div>

        <p className="text-sm sm:text-base text-stone-700 leading-relaxed font-normal">
          {result.description}
        </p>

        {/* Visible Symptoms Checklist if provided */}
        {symptomsList.length > 0 && (
          <div className="pt-2 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Common Visible Symptoms:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-stone-600">
              {symptomsList.map((sym, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 rounded-lg bg-stone-50 border border-stone-200/70">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION E: WHAT SHOULD YOU DO? (Management Checklist Cards) */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg sm:text-xl text-stone-900 font-sans">
              What Should You Do?
            </h3>
            <p className="text-xs text-stone-500">
              Step-by-step practical management for this condition
            </p>
          </div>
        </div>

        {managementList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {managementList.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl border border-stone-200 bg-stone-50/60 hover:bg-stone-50 transition"
              >
                <div className="p-1 rounded-md bg-white border border-stone-300 text-emerald-700 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                  {item}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-stone-500 italic">
            No urgent treatment actions needed. Continue routine plant maintenance.
          </p>
        )}
      </div>

      {/* SECTION F & G: PREVENTION & PLANT CARE GUIDANCE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* F. How to Reduce Future Risk (Prevention) */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-stone-900 font-sans">
                  How to Reduce Future Risk
                </h4>
                <p className="text-xs text-stone-500">Preventive habits for healthier crops</p>
              </div>
            </div>

            {preventionList.length > 0 ? (
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                {preventionList.map((prev, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed font-normal">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                    <span>{prev}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-stone-500 italic">Standard gardening practices recommended.</p>
            )}
          </div>
        </div>

        {/* G. Plant Care Guidance */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <Sprout className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-base sm:text-lg text-stone-900 font-sans">
                  Plant Care Guidance
                </h4>
                <p className="text-xs text-stone-500">General plant vigor and nutrient tips</p>
              </div>
            </div>

            {plantCareList.length > 0 ? (
              <ul className="space-y-2.5 text-xs sm:text-sm text-stone-600">
                {plantCareList.map((care, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 leading-relaxed font-normal">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{care}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-stone-500 italic">Maintain balanced watering and organic compost.</p>
            )}
          </div>
        </div>
      </div>

      {/* SECTION H: SAFETY NOTICE & BUTTONS */}
      <SafetyNotice
        onAnalyzeAnother={onAnalyzeAnother}
        onBackToHome={onBackToHome}
        showActions={true}
      />
    </div>
  );
};
