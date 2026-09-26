/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, CheckCircle2, ArrowRight, Leaf, Heart } from 'lucide-react';

interface AboutPageProps {
  onNavigateToDiagnose: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToDiagnose }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* Heading & Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Leaf className="w-3.5 h-3.5 text-emerald-600" />
          <span>Agricultural AI Solution</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-sans tracking-tight">
          About TomatoFusion
        </h1>
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
          TomatoFusion is an AI-powered tomato leaf disease diagnosis system designed to help users identify common tomato leaf conditions from images. The system combines deep-learning-based image analysis with visual explanation and practical plant-care information to provide an easy-to-understand diagnosis experience.
        </p>
      </div>

      {/* Our Goal Section */}
      <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
            <Target className="w-6 h-6 text-emerald-700" />
          </div>
          <h2 className="text-2xl font-extrabold text-stone-900 font-sans">
            Our Goal
          </h2>
        </div>
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-normal">
          Our goal is to make tomato leaf disease identification easier, faster, and more accessible through an intelligent and user-friendly digital platform.
        </p>
      </div>

      {/* What TomatoFusion Can Identify */}
      <div className="rounded-3xl border border-stone-200 bg-white p-8 sm:p-10 shadow-xs space-y-6">
        <h2 className="text-2xl font-extrabold text-stone-900 font-sans">
          What TomatoFusion Can Identify
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              name: 'Early Blight',
              description: 'Characterized by dark concentric rings and yellow halos on foliage.',
            },
            {
              name: 'Late Blight',
              description: 'Identifiable by large, irregular water-soaked dark patches that spread quickly.',
            },
            {
              name: 'Septoria Leaf Spot',
              description: 'Recognized by numerous small round lesions with grayish centers and dark borders.',
            },
            {
              name: 'Healthy Leaves',
              description: 'Vibrant green leaves free from fungal lesions, spotting, or viral discolorations.',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="p-5 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-start gap-3.5"
            >
              <div className="p-1 rounded-md bg-white border border-stone-300 text-emerald-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-stone-900 text-base">{item.name}</h3>
                <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onNavigateToDiagnose}
          className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-base shadow-sm hover:shadow-md transition cursor-pointer"
        >
          <span>Diagnose a Tomato Leaf</span>
          <ArrowRight className="w-4 h-4 text-emerald-200" />
        </button>
      </div>
    </div>
  );
};
