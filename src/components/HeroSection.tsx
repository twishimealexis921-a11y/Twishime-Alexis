import React, { useState } from 'react';
import { Search, ArrowRight, ShieldCheck, Cpu, Leaf, Compass } from 'lucide-react';
import { RWANDA_STATS } from '../data/rwandaData.ts';

interface HeroSectionProps {
  onSearchSubmit: (query: string) => void;
  language: 'en' | 'rw' | 'fr';
  onExploreSection: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearchSubmit,
  language,
  onExploreSection,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearchSubmit(query.trim());
    }
  };

  const getSubheading = () => {
    if (language === 'rw') {
      return 'Ihuriro ry’ubwenge buhanitse ryorohereza abaturage, abahinzi, n’abashyitsi kubona serivisi za leta, inama z’ubuhinzi, n’ubukerarugendo bwo mu Birunga.';
    }
    if (language === 'fr') {
      return 'La plateforme unifiée d’intelligence artificielle pour le Rwanda : services citoyens, agronomie de précision, éco-tourisme et innovation durable.';
    }
    return 'The unified intelligence engine for the Republic of Rwanda. Instant guidance for Irembo citizen services, precision coffee & tea agronomy, gorilla eco-tourism, and sustainable urban mobility.';
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 border-b border-slate-800">
      {/* Background Hero Image with Measured Scrim Overlay for WCAG AA compliance */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_kigali_skyline_1790626615062.jpg"
          alt="Kigali Rwanda Skyline at Twilight"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-90"
        />
        {/* Measured dark gradient scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/60 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Anti-Slop Zero-Pill Metadata Line */}
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-4 tracking-wide">
          <span>REPUBLIC OF RWANDA</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>VISION 2050</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>SMART MASTER PLAN</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>NATIONAL AI STRATEGY</span>
        </div>

        {/* Display Headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
            Unified Intelligence for the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300">
              Land of a Thousand Hills
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {getSubheading()}
          </p>
        </div>

        {/* Real-time Query / Search Interface */}
        <div className="mt-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="relative flex items-center shadow-2xl">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  language === 'rw'
                    ? 'Baza ikibazo kuri Irembo, Ubuhinzi, Pariki y\'Ibirunga, cyangwa Drones...'
                    : language === 'fr'
                    ? 'Posez une question sur Irembo, l\'agriculture, les gorilles, ou la santé...'
                    : 'Ask about Irembo services, coffee diseases, gorilla permits, Zipline drones...'
                }
                className="w-full pl-10 pr-28 py-3.5 bg-slate-900/90 border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all backdrop-blur-md"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 cursor-pointer"
              >
                <span>{language === 'rw' ? 'Shakisha' : language === 'fr' ? 'Consulter' : 'Inquire'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Prompt Suggestion Chips (Functional Buttons with click handlers) */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-500">Quick start:</span>
            <button
              onClick={() => onSearchSubmit('How to register a company on RDB in Rwanda?')}
              className="text-slate-300 hover:text-emerald-400 underline decoration-slate-700 underline-offset-4 hover:decoration-emerald-400 transition-colors cursor-pointer"
            >
              RDB 6-hr Incorporation
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onSearchSubmit('How do I treat Coffee Leaf Rust on Bourbon coffee in Rwanda?')}
              className="text-slate-300 hover:text-emerald-400 underline decoration-slate-700 underline-offset-4 hover:decoration-emerald-400 transition-colors cursor-pointer"
            >
              Coffee Leaf Rust Guide
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onSearchSubmit('Volcanoes National Park mountain gorilla permits booking advice')}
              className="text-slate-300 hover:text-emerald-400 underline decoration-slate-700 underline-offset-4 hover:decoration-emerald-400 transition-colors cursor-pointer"
            >
              Gorilla Permits ($1,500)
            </button>
            <span aria-hidden="true" className="text-slate-700">·</span>
            <button
              onClick={() => onSearchSubmit('How does Zipline medical drone delivery operate from Muhanga & Kayonza?')}
              className="text-slate-300 hover:text-emerald-400 underline decoration-slate-700 underline-offset-4 hover:decoration-emerald-400 transition-colors cursor-pointer"
            >
              Zipline Drones
            </button>
          </div>
        </div>

        {/* Tabular Benchmark Metrics Grid (Anti-slop: real verified national data with tabular numerals) */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">4G/5G Coverage</div>
            <div className="text-2xl font-bold text-white font-mono tabular-nums mt-1">{RWANDA_STATS.internetCoverage4G5G}</div>
            <div className="text-xs text-slate-500 mt-0.5">National broadband footprint</div>
          </div>

          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Irembo Services</div>
            <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums mt-1">{RWANDA_STATS.iremboServicesCount}</div>
            <div className="text-xs text-slate-500 mt-0.5">Paperless e-Gov transactions</div>
          </div>

          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Zipline Deliveries</div>
            <div className="text-2xl font-bold text-teal-400 font-mono tabular-nums mt-1">{RWANDA_STATS.ziplineDeliveriesMade}</div>
            <div className="text-xs text-slate-500 mt-0.5">Emergency blood & vaccine drops</div>
          </div>

          <div className="p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="text-xs text-slate-400 uppercase tracking-wider font-mono">Ease of Business</div>
            <div className="text-2xl font-bold text-amber-300 font-mono tabular-nums mt-1">{RWANDA_STATS.easeOfDoingBusinessAfricaRank}</div>
            <div className="text-xs text-slate-500 mt-0.5">Ranked in Sub-Saharan Africa</div>
          </div>
        </div>

      </div>
    </section>
  );
};
