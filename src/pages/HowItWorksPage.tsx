/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  UploadCloud,
  Cpu,
  CheckCircle2,
  Eye,
  FileText,
  ArrowRight,
  ArrowDown,
  Sparkles,
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigateToDiagnose: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigateToDiagnose }) => {
  const steps = [
    {
      step: 1,
      title: 'Upload a Leaf Photo',
      description: 'The user uploads a clear tomato leaf image using their smartphone or computer.',
      icon: UploadCloud,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      step: 2,
      title: 'AI Analysis',
      description: 'TomatoFusion analyzes the uploaded leaf using its trained AI system to scan foliar patterns, textures, and spot characteristics.',
      icon: Cpu,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      step: 3,
      title: 'Disease Identification',
      description: 'The system identifies the most likely tomato leaf condition and calculates confidence scores across the four recognized classes.',
      icon: CheckCircle2,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      step: 4,
      title: 'Visual Explanation',
      description: 'A Grad-CAM heatmap helps show which regions of the leaf influenced the prediction, giving you transparency into why the AI reached its conclusion.',
      icon: Eye,
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      step: 5,
      title: 'Diagnosis & Guidance',
      description: 'The user receives information about the condition, recommended management, prevention, and plant-care guidance to protect their tomato plants.',
      icon: FileText,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-14">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Simple & Transparent Workflow</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-sans tracking-tight">
          How TomatoFusion Works
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
          A straightforward five-step process designed to help you quickly diagnose tomato leaf health and take the right action.
        </p>
      </div>

      {/* 5-Step Visual Workflow */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isLast = idx === steps.length - 1;

          return (
            <React.Fragment key={s.step}>
              <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${s.color}`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Step {s.step}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 font-sans">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {s.description}
                    </p>
                  </div>
                </div>
              </div>

              {!isLast && (
                <div className="flex justify-center py-0.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-700 shadow-2xs">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={onNavigateToDiagnose}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <span>Diagnose a Leaf Now</span>
          <ArrowRight className="w-4 h-4 text-emerald-200" />
        </button>
      </div>
    </div>
  );
};
