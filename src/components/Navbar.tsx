/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeTab: 'home' | 'diagnose' | 'diseases' | 'how-it-works' | 'about';
  setActiveTab: (tab: 'home' | 'diagnose' | 'diseases' | 'how-it-works' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems: Array<{ id: 'home' | 'diagnose' | 'diseases' | 'how-it-works' | 'about'; label: string }> = [
    { id: 'home', label: 'Home' },
    { id: 'diagnose', label: 'Diagnose' },
    { id: 'diseases', label: 'Diseases' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About' },
  ];

  const handleNavClick = (id: 'home' | 'diagnose' | 'diseases' | 'how-it-works' | 'about') => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Official Logo / Brand */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center group text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
            aria-label="TomatoFusion Home"
          >
            {!logoError ? (
              <img
                src="/TF.png"
                alt="TomatoFusion"
                onError={() => setLogoError(true)}
                className="h-[38px] sm:h-[48px] w-auto max-w-[190px] sm:max-w-[220px] object-contain block transition-transform group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-900/10 group-hover:bg-emerald-700 transition-colors">
                  <Leaf className="w-5 h-5 text-emerald-100" />
                </div>
                <span className="font-extrabold text-xl tracking-tight text-emerald-950 font-sans">
                  Tomato<span className="text-emerald-600">Fusion</span>
                </span>
              </div>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'text-emerald-800 bg-emerald-50 font-semibold'
                      : 'text-stone-600 hover:text-emerald-700 hover:bg-stone-100/70'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('diagnose')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-sm font-semibold shadow-sm hover:bg-emerald-800 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Diagnose Leaf</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-emerald-800 rounded-lg hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-3 mt-2 border-t border-stone-100 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => handleNavClick('diagnose')}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 text-white font-semibold shadow-sm cursor-pointer"
              >
                <span>Diagnose Leaf</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
