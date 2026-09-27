/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DiseaseDetail } from '../types/diagnosis';
import { ChevronDown, ChevronUp, AlertCircle, ShieldCheck, Sprout, ImageIcon } from 'lucide-react';

interface DiseaseInfoCardProps {
  disease: DiseaseDetail;
  initiallyExpanded?: boolean;
}

const DISEASE_IMAGE_MAP: Record<string, string> = {
  'Early Blight': '/disease-images/early-blight.jpg',
  'Late Blight': '/disease-images/late-blight.jpg',
  'Septoria Leaf Spot': '/disease-images/septoria-leaf-spot.jpg',
  Healthy: '/disease-images/healthy.jpg',
};

export const DiseaseInfoCard: React.FC<DiseaseInfoCardProps> = ({
  disease,
  initiallyExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [imageError, setImageError] = useState(false);

  const imageSrc = disease.image || DISEASE_IMAGE_MAP[disease.name] || '';

  return (
    <div className="rounded-3xl border border-stone-200 bg-white shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
      {/* Top Banner */}
      <div className={`p-6 bg-gradient-to-br ${disease.bannerColor} border-b border-stone-100 flex items-center justify-between gap-4`}>
        <div className="space-y-1.5 flex-1">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${disease.badgeColor}`}>
            {disease.name === 'Healthy' ? 'Healthy Condition' : 'Foliar Condition'}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-sans tracking-tight">
            {disease.name}
          </h3>
          <p className="text-xs text-stone-600 font-medium">
            {disease.tagline}
          </p>
        </div>

        {/* Real Leaf Photograph Container */}
        <div className="w-[84px] h-[84px] sm:w-[116px] sm:h-[116px] shrink-0 rounded-2xl overflow-hidden border border-stone-200/90 shadow-2xs bg-stone-100 flex items-center justify-center">
          {!imageError && imageSrc ? (
            <img
              src={imageSrc}
              alt={`${disease.name} tomato leaf`}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center block"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-100 text-stone-400 p-2 text-center select-none">
              <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-stone-400 stroke-[1.5]" />
              <span className="text-[10px] font-medium text-stone-400 mt-1 uppercase tracking-wider">
                Photo
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Body Summary */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <p className="text-sm text-stone-600 leading-relaxed font-normal">
          {disease.shortDescription}
        </p>

        {/* Expandable Section */}
        {expanded && (
          <div className="pt-4 border-t border-stone-100 space-y-4 text-xs sm:text-sm animate-in fade-in-50 duration-200">
            {/* Common Visible Symptoms */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-800">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Common Symptoms</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-stone-600">
                {disease.commonSymptoms.map((sym, idx) => (
                  <li key={idx} className="leading-relaxed font-normal">
                    {sym}
                  </li>
                ))}
              </ul>
            </div>

            {/* How It Affects The Plant */}
            <div className="space-y-1.5 p-3.5 rounded-xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-1.5 font-bold text-stone-800 text-xs">
                <Sprout className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Impact on Tomato Plants</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-normal">
                {disease.howItAffectsPlant}
              </p>
            </div>

            {/* General Prevention Tips */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 font-bold text-stone-800">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>General Prevention Tips</span>
              </div>
              <ul className="space-y-1.5 pl-6 list-disc text-stone-600">
                {disease.preventionTips.map((tip, idx) => (
                  <li key={idx} className="leading-relaxed font-normal">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Toggle Button */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="w-full pt-3 mt-2 border-t border-stone-100 flex items-center justify-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
        >
          <span>{expanded ? 'Show Less Information' : 'View Symptoms & Prevention Tips'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
