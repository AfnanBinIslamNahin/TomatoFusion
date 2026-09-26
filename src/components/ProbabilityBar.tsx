/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ClassProbabilities } from '../types/diagnosis';

interface ProbabilityBarProps {
  probabilities: ClassProbabilities;
  topPrediction?: string;
}

const CLASS_CONFIG: Record<
  string,
  { label: string; barColor: string; bgAccent: string; borderAccent: string }
> = {
  'Healthy': {
    label: 'Healthy',
    barColor: 'bg-emerald-600',
    bgAccent: 'bg-emerald-50 text-emerald-950',
    borderAccent: 'border-emerald-200',
  },
  'Late Blight': {
    label: 'Late Blight',
    barColor: 'bg-rose-600',
    bgAccent: 'bg-rose-50 text-rose-950',
    borderAccent: 'border-rose-200',
  },
  'Early Blight': {
    label: 'Early Blight',
    barColor: 'bg-amber-600',
    bgAccent: 'bg-amber-50 text-amber-950',
    borderAccent: 'border-amber-200',
  },
  'Septoria Leaf Spot': {
    label: 'Septoria Leaf Spot',
    barColor: 'bg-indigo-600',
    bgAccent: 'bg-indigo-50 text-indigo-950',
    borderAccent: 'border-indigo-200',
  },
};

const CLASS_KEYS = ['Early Blight', 'Healthy', 'Late Blight', 'Septoria Leaf Spot'] as const;

export const ProbabilityBar: React.FC<ProbabilityBarProps> = ({
  probabilities,
  topPrediction,
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between pb-1 border-b border-stone-100">
        <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Condition Probabilities
        </h4>
        <span className="text-xs text-stone-400">All 4 Classes</span>
      </div>

      <div className="space-y-3">
        {CLASS_KEYS.map((key) => {
          const rawVal = probabilities[key] ?? 0;
          const percentage = Math.min(100, Math.max(0, Number(rawVal)));
          const formatted = percentage.toFixed(1);
          const isTop = topPrediction === key;
          const config = CLASS_CONFIG[key] || {
            label: key,
            barColor: 'bg-emerald-600',
            bgAccent: 'bg-stone-50 text-stone-900',
            borderAccent: 'border-stone-200',
          };

          return (
            <div
              key={key}
              className={`p-3.5 rounded-xl border transition-all ${
                isTop
                  ? `${config.bgAccent} ${config.borderAccent} shadow-xs ring-1 ring-emerald-500/20`
                  : 'bg-white border-stone-200/80 text-stone-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{config.label}</span>
                  {isTop && (
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-white text-stone-800 border border-stone-200 shadow-2xs">
                      Highest Match
                    </span>
                  )}
                </div>
                <span className="font-mono font-bold text-sm tracking-tight">
                  {formatted}%
                </span>
              </div>

              {/* Progress Track */}
              <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${config.barColor}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
