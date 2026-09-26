/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Percent,
  Sprout,
  UploadCloud,
  FileCheck2,
  Leaf,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tab: 'home' | 'diagnose' | 'diseases' | 'how-it-works' | 'about') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span>Smart Crop Health & Leaf Pathology</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-950 font-sans tracking-tight leading-[1.1]">
                  AI-Powered Tomato Leaf Disease Diagnosis
                </h1>
                <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal max-w-2xl">
                  Upload a tomato leaf image to identify possible diseases and receive an easy-to-understand diagnosis with visual explanation and plant-care guidance.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('diagnose')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white text-base font-bold shadow-sm shadow-emerald-900/10 transition cursor-pointer"
                >
                  <span>Diagnose a Leaf</span>
                  <ArrowRight className="w-4 h-4 text-emerald-200" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-base font-semibold transition cursor-pointer"
                >
                  <span>Learn More</span>
                </button>
              </div>

              {/* Supported conditions quick preview */}
              <div className="pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-500">
                <span className="font-semibold text-stone-700">Detects 4 Conditions:</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Early Blight
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Late Blight
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Septoria Leaf Spot
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Healthy Leaves
                </span>
              </div>
            </div>

            {/* Right Hero Visual Area: Modern Agricultural Illustration Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-100/70 via-stone-50 to-emerald-50 border border-emerald-100 flex items-center justify-center p-4">
                  {/* Clean SVG Botanical Plant Artwork */}
                  <svg viewBox="0 0 320 240" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Stem */}
                    <path d="M160 220C160 170 155 120 162 40" stroke="#15803d" strokeWidth="6" strokeLinecap="round" />
                    <path d="M160 160C190 145 225 140 250 148" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />
                    <path d="M160 110C125 95 90 92 65 102" stroke="#15803d" strokeWidth="4" strokeLinecap="round" />

                    {/* Central Healthy Leaf */}
                    <path
                      d="M162 40C130 65 120 110 160 145C200 110 190 65 162 40Z"
                      fill="#22c55e"
                      stroke="#16a34a"
                      strokeWidth="2"
                    />
                    <path d="M161 45V140" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />

                    {/* Right Leaflet */}
                    <path
                      d="M250 148C265 120 255 85 220 95C200 120 220 140 250 148Z"
                      fill="#16a34a"
                      stroke="#15803d"
                      strokeWidth="2"
                    />

                    {/* Left Leaflet */}
                    <path
                      d="M65 102C55 130 75 160 105 145C118 120 95 105 65 102Z"
                      fill="#16a34a"
                      stroke="#15803d"
                      strokeWidth="2"
                    />

                    {/* Ripe Red Tomatoes */}
                    <circle cx="185" cy="180" r="26" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                    <circle cx="185" cy="180" r="23" fill="#dc2626" />
                    <path d="M178 170C180 165 190 165 192 170" stroke="#fca5a5" strokeWidth="3" strokeLinecap="round" />
                    {/* Calyx */}
                    <path d="M185 154L183 162M185 154L190 160M185 154L177 158" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />

                    <circle cx="140" cy="195" r="20" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                    <circle cx="140" cy="195" r="17" fill="#dc2626" />

                    {/* Scan indicator overlay */}
                    <rect x="110" y="30" width="100" height="120" rx="8" stroke="#059669" strokeWidth="2" strokeDasharray="4 4" fill="rgba(5, 150, 105, 0.08)" />
                    <circle cx="160" cy="90" r="6" fill="#10b981" />
                  </svg>

                  <div className="absolute bottom-3 left-3 right-3 py-1.5 px-3 rounded-xl bg-white/95 backdrop-blur-xs border border-stone-200 text-stone-800 text-xs flex items-center justify-between shadow-xs">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      Visual Diagnosis
                    </span>
                    <span className="text-emerald-700 font-bold text-[11px]">Instant Analysis</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>Target Foliar Health</span>
                    <span className="text-emerald-700 font-semibold">Easy & Accessible</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-normal">
                    Designed for gardeners, growers, and agricultural field teams. Simply upload a picture to get an instant breakdown of the condition and actionable steps to take.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR SIMPLE FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
            Why Use TomatoFusion
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-sans tracking-tight">
            Key Features
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Feature 1: Disease Detection */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-stone-900 font-sans">
              Disease Detection
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Identify common tomato leaf diseases from an uploaded image.
            </p>
          </div>

          {/* Feature 2: AI Confidence */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Percent className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-stone-900 font-sans">
              AI Confidence
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              See how confident the system is about its prediction.
            </p>
          </div>

          {/* Feature 3: Visual Explanation */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-stone-900 font-sans">
              Visual Explanation
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              View a Grad-CAM heatmap showing the image regions that influenced the AI prediction.
            </p>
          </div>

          {/* Feature 4: Care Guidance */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow space-y-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-lg text-stone-900 font-sans">
              Care Guidance
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-normal">
              Receive useful information about the detected condition, management, prevention, and plant care.
            </p>
          </div>
        </div>
      </section>

      {/* HOW TOMATOFUSION HELPS (3 Simple Steps) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/40 p-8 sm:p-12 lg:p-14 shadow-xs space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-sans tracking-tight">
              How TomatoFusion Helps
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-normal">
              A fast and straightforward way to keep your tomato crop protected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg font-mono mx-auto sm:mx-0">
                1
              </div>
              <h3 className="font-bold text-lg text-stone-900">
                Upload a tomato leaf image
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Take a clear, focused photo with your smartphone or select a leaf picture from your computer.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black text-lg font-mono mx-auto sm:mx-0">
                2
              </div>
              <h3 className="font-bold text-lg text-stone-900">
                Let TomatoFusion analyze the leaf
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Our trained AI system evaluates disease indicators and creates a visual explanation heatmap.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3 text-center sm:text-left">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-lg font-mono mx-auto sm:mx-0">
                3
              </div>
              <h3 className="font-bold text-lg text-stone-900">
                View the diagnosis and recommended guidance
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                Get an easy-to-read summary, actionable care checklists, and preventive garden advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION: "Check Your Tomato Leaf" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-stone-900 text-white p-8 sm:p-12 shadow-xl space-y-6">
          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Start Now
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sans tracking-tight">
              Ready to check your plants?
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
              Upload a tomato leaf picture right from your garden or greenhouse to get instant AI assistance.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('diagnose')}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-900/40 transition cursor-pointer"
              >
                <span>Check Your Tomato Leaf</span>
                <ArrowRight className="w-5 h-5 text-emerald-100" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
