/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'diagnose' | 'diseases' | 'how-it-works' | 'about') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const [logoError, setLogoError] = useState(false);

  const handleNav = (tab: 'home' | 'diagnose' | 'diseases' | 'how-it-works' | 'about') => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Column */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              {!logoError ? (
                <img
                  src="/tomatofusion-logo.png"
                  alt="TomatoFusion"
                  onError={() => setLogoError(true)}
                  className="w-[42px] h-[42px] object-contain rounded-lg shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
              )}
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Tomato<span className="text-emerald-400">Fusion</span>
              </span>
            </div>
            <p className="text-stone-300 text-sm font-medium">
              Smart Tomato Leaf Disease Diagnosis
            </p>
            <p className="text-stone-400 text-xs max-w-md leading-relaxed">
              Upload a clear photo of your tomato leaf to identify possible conditions, view visual explanation heatmaps, and access practical plant-care and prevention guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-6 flex flex-col sm:flex-row sm:justify-end gap-8 sm:gap-16">
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Navigation</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('home')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('diagnose')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Diagnose
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('diseases')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    Diseases
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('how-it-works')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    How It Works
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('about')}
                    className="hover:text-emerald-400 transition-colors cursor-pointer"
                  >
                    About
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3 max-w-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Supported Conditions</h4>
              <ul className="space-y-1.5 text-xs text-stone-400">
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Early Blight</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Late Blight</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Septoria Leaf Spot</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Healthy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Line with Disclaimer */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} TomatoFusion. All rights reserved.</p>
          <div className="flex items-center gap-2 text-stone-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AI-assisted agricultural decision-support system.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
