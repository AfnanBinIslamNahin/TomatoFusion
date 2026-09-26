/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface SafetyNoticeProps {
  onAnalyzeAnother?: () => void;
  onBackToHome?: () => void;
  showActions?: boolean;
}

export const SafetyNotice: React.FC<SafetyNoticeProps> = ({
  onAnalyzeAnother,
  onBackToHome,
  showActions = true,
}) => {
  return (
    <div className="w-full rounded-2xl border border-amber-200 bg-amber-50/80 p-5 sm:p-6 text-amber-950 shadow-xs space-y-4">
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
          <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="font-bold text-sm sm:text-base text-amber-950">
            Important Safety Notice
          </h4>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-normal">
            TomatoFusion provides AI-assisted guidance for informational and decision-support purposes.
            For serious disease outbreaks or before applying agricultural chemicals, consult a qualified
            agricultural professional and follow locally approved product-label instructions.
          </p>
        </div>
      </div>

      {showActions && (onAnalyzeAnother || onBackToHome) && (
        <div className="pt-3 border-t border-amber-200/70 flex flex-wrap items-center justify-end gap-3">
          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 active:scale-[0.98] transition cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          )}
          {onAnalyzeAnother && (
            <button
              type="button"
              onClick={onAnalyzeAnother}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] shadow-sm transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Analyze Another Leaf</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
