import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { ProvinceExplorer } from './components/ProvinceExplorer.tsx';
import { CitizenServicesView } from './components/CitizenServicesView.tsx';
import { SmartAgricultureView } from './components/SmartAgricultureView.tsx';
import { VisitRwandaView } from './components/VisitRwandaView.tsx';
import { InnovationMobilityView } from './components/InnovationMobilityView.tsx';
import { AIAssistantModal } from './components/AIAssistantModal.tsx';
import { CurrencyConverter } from './components/CurrencyConverter.tsx';
import { Footer } from './components/Footer.tsx';
import { ProvinceData } from './data/rwandaData.ts';
import { Shield, Wheat, MapPin, Zap, ArrowRight, Sparkles, Building2, Trees, Plane, X } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [language, setLanguage] = useState<'en' | 'rw' | 'fr'>('en');
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState<boolean>(false);
  const [assistantInitialQuery, setAssistantInitialQuery] = useState<string>('');

  const handleOpenAssistantWithQuery = (query: string) => {
    setAssistantInitialQuery(query);
    setIsAssistantOpen(true);
  };

  const handleAskAIAboutProvince = (province: ProvinceData) => {
    const prompt =
      language === 'rw'
        ? `Nsobanurira amahirwe y'ishoramari, ubuhinzi, n'ubukerarugendo mu Ntara ya ${province.kinyarwandaName} (${province.districts.join(', ')}).`
        : `Provide an analysis of the economic opportunities, key infrastructure, and agricultural staples in Rwanda's ${province.name} (${province.districts.join(', ')}).`;
    handleOpenAssistantWithQuery(prompt);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        onOpenAssistant={() => {
          setAssistantInitialQuery('');
          setIsAssistantOpen(true);
        }}
        onOpenCurrency={() => setIsCurrencyOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              onSearchSubmit={handleOpenAssistantWithQuery}
              language={language}
              onExploreSection={setActiveTab}
            />

            {/* Quick Pillars Bento Grid */}
            <section className="py-12 bg-slate-950 border-b border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                  <div className="text-xs font-mono text-emerald-400 tracking-wider uppercase mb-1">
                    Smart Rwanda Master Plan
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Four Strategic Pillars of Digital Transformation
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Pillar 1: Citizen Services */}
                  <div
                    onClick={() => setActiveTab('citizen')}
                    className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                        <Shield className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">
                        Smart Citizen & Irembo
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Access 100+ public administrative services online: civil status, police clearances, RDB business incorporation, and land UPI mutation.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-emerald-400 font-medium">
                      <span>Explore Services</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Pillar 2: Smart Agriculture */}
                  <div
                    onClick={() => setActiveTab('agriculture')}
                    className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-teal-600/20 border border-teal-500/40 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-105 transition-transform">
                        <Wheat className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                        Smart Agronomy & e-Soko
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Live commodity market prices in RWF/kg across Rwandan districts, coffee berry borer alerts, and an AI Plant Doctor.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-teal-400 font-medium">
                      <span>Launch Agronomist</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Pillar 3: Visit Rwanda */}
                  <div
                    onClick={() => setActiveTab('tourism')}
                    className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                        Visit Rwanda AI Planner
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Mountain Gorilla trekking in Volcanoes NP, Nyungwe canopy walk, and Akagera Big Five safari with custom AI itinerary building.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-medium">
                      <span>Plan Expedition</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Pillar 4: Innovation & Mobility */}
                  <div
                    onClick={() => setActiveTab('innovation')}
                    className="p-5 bg-slate-900/60 border border-slate-800 rounded-xl hover:border-emerald-500/50 hover:bg-slate-900 transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                        <Zap className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        Zipline Drones & E-Mobility
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                        Interactive autonomous medical drone dispatch simulator across 25+ district hospitals, plus Kigali electric moto battery swap network.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-cyan-400 font-medium">
                      <span>Simulate Flight</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Province & 30 Districts Explorer */}
            <ProvinceExplorer
              onAskAIAboutProvince={handleAskAIAboutProvince}
              language={language}
            />

            {/* Vision 2050 Callout Banner */}
            <section className="py-12 bg-slate-950">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="p-8 bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="max-w-2xl">
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
                      Kigali Innovation Hub · C4IR Rwanda
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Built for Rwanda's Vision 2050
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      "Rwanda will be a high-income country with a knowledge-based economy driven by innovation, green technology, and equal opportunity for every citizen."
                    </p>
                  </div>

                  <button
                    onClick={() => handleOpenAssistantWithQuery('What are the key goals and economic benchmarks of Rwanda Vision 2050?')}
                    className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-900/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-200" />
                    <span>Explore Vision 2050 AI Briefing</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'citizen' && <CitizenServicesView language={language} />}
        {activeTab === 'agriculture' && <SmartAgricultureView language={language} />}
        {activeTab === 'tourism' && <VisitRwandaView language={language} />}
        {activeTab === 'innovation' && <InnovationMobilityView language={language} />}
      </main>

      {/* Multilingual AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        language={language}
        initialQuery={assistantInitialQuery}
      />

      {/* Quick Currency Converter Modal (RWF · USD · EUR · GBP) */}
      {isCurrencyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            <button
              onClick={() => setIsCurrencyOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Close Currency Converter"
            >
              <X className="w-5 h-5" />
            </button>
            <CurrencyConverter language={language} />
          </div>
        </div>
      )}

      {/* Global Quiet Footer */}
      <Footer
        onSelectTab={setActiveTab}
        onOpenAssistant={() => {
          setAssistantInitialQuery('');
          setIsAssistantOpen(true);
        }}
      />
    </div>
  );
}
