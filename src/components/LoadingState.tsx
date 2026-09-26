/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Loader2, Leaf, Sparkles, CheckCircle2 } from 'lucide-react';

interface LoadingStateProps {
  fileName?: string;
}

const STAGES = [
  'Preparing leaf image for analysis...',
  'Checking foliar surface patterns...',
  'Evaluating disease indicators...',
  'Generating visual explanation heatmap...',
  'Compiling plant care and prevention guidance...',
];

export const LoadingState: React.FC<LoadingStateProps> = ({ fileName }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < STAGES.length - 1 ? prev + 1 : prev));
    }, 900);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto rounded-3xl border border-emerald-100 bg-white p-8 sm:p-10 shadow-xs text-center space-y-6">
      {/* Central Radar Pulse */}
      <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-100/60 animate-ping" />
        <div className="relative w-16 h-16 rounded-full bg-emerald-50 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-700 shadow-sm">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-sans tracking-tight">
          Analyzing your tomato leaf...
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
          Please wait while the system inspects the leaf and prepares your diagnosis report.
        </p>
        {fileName && (
          <div className="inline-block px-3 py-1 rounded-md bg-stone-100 border border-stone-200 text-xs font-mono text-stone-600">
            {fileName}
          </div>
        )}
      </div>

      {/* Steps progress */}
      <div className="text-left space-y-2 pt-2 max-w-sm mx-auto">
        {STAGES.map((label, idx) => {
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;
          return (
            <div
              key={idx}
              className={`flex items-center gap-2.5 p-2 rounded-lg text-xs transition-colors ${
                isCurrent
                  ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200/70'
                  : isDone
                  ? 'text-stone-500 opacity-80'
                  : 'text-stone-400 opacity-40'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-stone-300 shrink-0" />
              )}
              <span className="truncate">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
