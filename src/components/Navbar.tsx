import React from 'react';
import { Compass, Globe, Sparkles, Shield, Wheat, MapPin, Zap, MessageSquareCode, Coins } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: 'en' | 'rw' | 'fr';
  setLanguage: (lang: 'en' | 'rw' | 'fr') => void;
  onOpenAssistant: () => void;
  onOpenCurrency: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onOpenAssistant,
  onOpenCurrency,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', labelRw: 'Incamake', labelFr: 'Aperçu', icon: Compass },
    { id: 'citizen', label: 'Smart Citizen', labelRw: 'Irembo & Serivisi', labelFr: 'Services Citoyens', icon: Shield },
    { id: 'agriculture', label: 'Agriculture', labelRw: 'Ubuhinzi', labelFr: 'Agriculture', icon: Wheat },
    { id: 'tourism', label: 'Visit Rwanda', labelRw: 'Ubukerarugendo', labelFr: 'Tourisme', icon: MapPin },
    { id: 'innovation', label: 'Innovation', labelRw: 'Ikoranabuhanga', labelFr: 'Innovation', icon: Zap },
  ];

  const getNavLabel = (item: typeof navItems[0]) => {
    if (language === 'rw') return item.labelRw;
    if (language === 'fr') return item.labelFr;
    return item.label;
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Brand title, single line */}
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
              <span className="font-bold text-sm tracking-wider text-emerald-300">RW</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors whitespace-nowrap">
                AI SMART RWANDA
              </span>
              <span className="text-[11px] text-slate-400 font-mono tracking-tight -mt-0.5">
                Imbere Heza · Vision 2050
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-800/90 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{getNavLabel(item)}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Language switcher + Assistant trigger) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Segmented Control */}
            <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  language === 'en' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('rw')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  language === 'rw' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
                title="Ikinyarwanda"
              >
                RW
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2 py-1 rounded-md transition-colors ${
                  language === 'fr' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
                title="Français"
              >
                FR
              </button>
            </div>

            {/* Currency Converter Quick Trigger */}
            <button
              onClick={onOpenCurrency}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 whitespace-nowrap cursor-pointer"
              title="Real-time Currency Converter (RWF · USD · EUR · GBP)"
            >
              <Coins className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline font-mono">FRW / $</span>
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 whitespace-nowrap cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span className="hidden sm:inline">Ask AI Assistant</span>
              <span className="sm:hidden">AI</span>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Secondary Navigation Row */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-800/80 bg-slate-950 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 px-2.5 py-1 text-[11px] font-medium transition-colors ${
                isActive ? 'text-emerald-400 font-semibold' : 'text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{getNavLabel(item)}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
