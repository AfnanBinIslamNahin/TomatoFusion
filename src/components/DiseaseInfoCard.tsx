/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DiseaseDetail } from '../types/diagnosis';
import { ChevronDown, ChevronUp, AlertCircle, ShieldCheck, Sprout } from 'lucide-react';

interface DiseaseInfoCardProps {
  disease: DiseaseDetail;
  initiallyExpanded?: boolean;
}

export const DiseaseInfoCard: React.FC<DiseaseInfoCardProps> = ({
  disease,
  initiallyExpanded = false,
}) => {
  const [expanded, setExpanded] = useState(initiallyExpanded);

  // Clean botanical leaf graphics for each condition
  const renderLeafGraphic = () => {
    switch (disease.name) {
      case 'Healthy':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="160" height="160" rx="16" fill="#ecfdf5" />
            <path
              d="M80 20C45 45 40 95 80 135C120 95 115 45 80 20Z"
              fill="#10b981"
              stroke="#047857"
              strokeWidth="2.5"
            />
            <path d="M80 28V130" stroke="#065f46" strokeWidth="2" strokeLinecap="round" />
            <path d="M80 50L60 62M80 70L55 85M80 90L62 104" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M80 50L100 62M80 70L105 85M80 90L98 104" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="80" cy="135" r="4" fill="#047857" />
          </svg>
        );
      case 'Early Blight':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="160" height="160" rx="16" fill="#fffbeb" />
            <path
              d="M80 20C45 45 40 95 80 135C120 95 115 45 80 20Z"
              fill="#34d399"
              stroke="#059669"
              strokeWidth="2.5"
            />
            {/* Concentric rings / Bullseye spots */}
            <circle cx="65" cy="70" r="14" fill="#fef08a" opacity="0.8" />
            <circle cx="65" cy="70" r="10" stroke="#b45309" strokeWidth="1.5" fill="#d97706" />
            <circle cx="65" cy="70" r="6" stroke="#78350f" strokeWidth="1" fill="#92400e" />
            <circle cx="65" cy="70" r="2.5" fill="#451a03" />

            <circle cx="95" cy="90" r="16" fill="#fef08a" opacity="0.8" />
            <circle cx="95" cy="90" r="12" stroke="#b45309" strokeWidth="1.5" fill="#d97706" />
            <circle cx="95" cy="90" r="7" stroke="#78350f" strokeWidth="1" fill="#92400e" />
            <circle cx="95" cy="90" r="3" fill="#451a03" />

            <path d="M80 28V130" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      case 'Late Blight':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="160" height="160" rx="16" fill="#fff1f2" />
            <path
              d="M80 20C45 45 40 95 80 135C120 95 115 45 80 20Z"
              fill="#6ee7b7"
              stroke="#059669"
              strokeWidth="2.5"
            />
            {/* Large irregular water-soaked dark lesions */}
            <path
              d="M50 48C42 58 45 78 58 84C70 88 78 72 75 58C72 46 58 42 50 48Z"
              fill="#1c1917"
              stroke="#44403c"
              strokeWidth="1.5"
            />
            <path
              d="M75 80C68 92 78 115 95 112C110 108 112 88 102 80C94 72 82 72 75 80Z"
              fill="#292524"
              stroke="#57534e"
              strokeWidth="1.5"
            />
            <path
              d="M48 45C38 56 42 80 57 87"
              stroke="#f5f5f4"
              strokeWidth="2"
              strokeDasharray="2 3"
            />
          </svg>
        );
      case 'Septoria Leaf Spot':
        return (
          <svg viewBox="0 0 160 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="160" height="160" rx="16" fill="#eef2ff" />
            <path
              d="M80 20C45 45 40 95 80 135C120 95 115 45 80 20Z"
              fill="#34d399"
              stroke="#059669"
              strokeWidth="2.5"
            />
            {[
              { cx: 62, cy: 55 },
              { cx: 75, cy: 45 },
              { cx: 95, cy: 60 },
              { cx: 58, cy: 75 },
              { cx: 72, cy: 80 },
              { cx: 90, cy: 85 },
              { cx: 68, cy: 105 },
              { cx: 84, cy: 108 },
              { cx: 102, cy: 98 },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.cx} cy={pt.cy} r="4.5" fill="#fde047" opacity="0.6" />
                <circle cx={pt.cx} cy={pt.cy} r="3" fill="#e7e5e4" stroke="#44403c" strokeWidth="1" />
                <circle cx={pt.cx} cy={pt.cy} r="0.8" fill="#1c1917" />
              </g>
            ))}
            <path d="M80 28V130" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
      default:
        return null;
    }
  };

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

        {/* Botanical Visual Graphic */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border border-white/80 shadow-xs">
          {renderLeafGraphic()}
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
