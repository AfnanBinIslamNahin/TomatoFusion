/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DISEASES_DATA } from '../data/diseasesData';
import { DiseaseInfoCard } from '../components/DiseaseInfoCard';
import { BookOpen, Search, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';

interface DiseasesPageProps {
  onNavigateToDiagnose: () => void;
}

export const DiseasesPage: React.FC<DiseasesPageProps> = ({ onNavigateToDiagnose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredDiseases = DISEASES_DATA.filter((d) => {
    return (
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.commonSymptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Foliar Disease Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 font-sans tracking-tight">
          Tomato Leaf Conditions
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-normal">
          Explore the four tomato leaf conditions recognized by TomatoFusion, learn their common symptoms, and discover simple prevention tips.
        </p>
      </div>

      {/* Clean Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conditions or symptoms..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-2xs"
          />
        </div>
      </div>

      {/* Four Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredDiseases.map((disease) => (
          <DiseaseInfoCard
            key={disease.id}
            disease={disease}
            initiallyExpanded={false}
          />
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 p-8 space-y-2">
          <Leaf className="w-8 h-8 text-stone-400 mx-auto" />
          <p className="font-bold text-stone-700">No condition matches your search</p>
          <p className="text-xs text-stone-500">Try searching for &quot;Early Blight&quot;, &quot;Late Blight&quot;, &quot;Septoria&quot;, or &quot;Healthy&quot;.</p>
        </div>
      )}

      {/* Action Banner */}
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50/70 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Have a Spotted or Yellowing Leaf?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-sans">
            Check your tomato leaf with AI
          </h3>
          <p className="text-sm text-stone-600 max-w-xl font-normal">
            Upload a photo right away to identify whether it is Early Blight, Late Blight, Septoria Leaf Spot, or Healthy.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToDiagnose}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-sm transition cursor-pointer"
        >
          <span>Diagnose Leaf</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
