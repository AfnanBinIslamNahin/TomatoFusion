/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApiConfigModal } from './components/ApiConfigModal';
import { HomePage } from './pages/HomePage';
import { DiagnosePage } from './pages/DiagnosePage';
import { DiseasesPage } from './pages/DiseasesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AboutPage } from './pages/AboutPage';
import { checkApiHealth } from './services/api';

type NavTab = 'home' | 'diagnose' | 'diseases' | 'how-it-works' | 'about';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [backendOnline, setBackendOnline] = useState<boolean>(false);

  // Sync state with URL hash for intuitive navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavTab;
      if (['home', 'diagnose', 'diseases', 'how-it-works', 'about'].includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: NavTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Check backend health periodically
  useEffect(() => {
    let mounted = true;
    const testHealth = async () => {
      const res = await checkApiHealth();
      if (mounted) {
        setBackendOnline(res.online);
      }
    };

    testHealth();
    const interval = setInterval(testHealth, 25000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* Sticky Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenApiSettings={() => setIsApiModalOpen(true)}
        backendOnline={backendOnline}
      />

      {/* Main Page View */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomePage onNavigate={handleTabChange} />
        )}
        {activeTab === 'diagnose' && (
          <DiagnosePage
            onNavigateHome={() => handleTabChange('home')}
            onOpenApiSettings={() => setIsApiModalOpen(true)}
            backendOnline={backendOnline}
          />
        )}
        {activeTab === 'diseases' && (
          <DiseasesPage onNavigateToDiagnose={() => handleTabChange('diagnose')} />
        )}
        {activeTab === 'how-it-works' && (
          <HowItWorksPage onNavigateToDiagnose={() => handleTabChange('diagnose')} />
        )}
        {activeTab === 'about' && (
          <AboutPage onNavigateToDiagnose={() => handleTabChange('diagnose')} />
        )}
      </main>

      {/* Reusable Footer */}
      <Footer setActiveTab={handleTabChange} />

      {/* Backend API Configuration & Health Modal */}
      <ApiConfigModal
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        onConnectionChange={(online) => setBackendOnline(online)}
        onLoadSchemaPreview={() => {
          handleTabChange('diagnose');
        }}
      />
    </div>
  );
}
