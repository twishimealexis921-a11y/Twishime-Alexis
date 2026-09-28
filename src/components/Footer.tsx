import React from 'react';
import { ExternalLink, Heart } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenAssistant: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAssistant }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                RW
              </div>
              <span className="font-bold text-white text-sm">AI SMART RWANDA</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Unified digital intelligence platform supporting Rwanda's Vision 2050, the Smart Rwanda Master Plan, and the National AI Strategy.
            </p>
            <div className="text-[11px] font-mono text-emerald-400">
              Kigali · Republic of Rwanda
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs font-mono uppercase tracking-wider">
              Core Modules
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onSelectTab('overview')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  National Overview & 30 Districts
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('citizen')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Irembo 2.0 Citizen Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('agriculture')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Smart Agronomy & e-Soko Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tourism')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Visit Rwanda & Mountain Gorillas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('innovation')}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Zipline Drones & Green City
                </button>
              </li>
            </ul>
          </div>

          {/* Official Government Portals */}
          <div className="space-y-2">
            <h4 className="text-white font-semibold text-xs font-mono uppercase tracking-wider">
              Official Portals
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="https://irembo.gov.rw"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Irembo Public Services</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://rdb.rw"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Rwanda Development Board</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://rab.gov.rw"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Rwanda Agriculture Board</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://visitrwanda.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Visit Rwanda Conservation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://minict.gov.rw"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                  <span>Ministry of ICT & Innovation</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Civic Values & AI Assistant */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs font-mono uppercase tracking-wider">
              Civic Culture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rooted in homegrown solutions: <strong className="text-slate-300">Umuganda</strong> (community solidarity), <strong className="text-slate-300">Imihigo</strong> (performance targets), and <strong className="text-slate-300">Ubudehe</strong> (social cohesion).
            </p>
            <button
              onClick={onOpenAssistant}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 rounded-lg text-xs font-medium transition-colors cursor-pointer"
            >
              Open Multilingual AI Assistant
            </button>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AI Smart Rwanda. Dedicated to the sustainable development of Rwanda.
          </div>
          <div className="flex items-center gap-4">
            <span>Kinyarwanda · English · Français</span>
            <span>·</span>
            <span>Vision 2050</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
