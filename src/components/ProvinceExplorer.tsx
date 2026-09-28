import React, { useState } from 'react';
import { RWANDA_PROVINCES, ProvinceData } from '../data/rwandaData.ts';
import { MapPin, Mountain, Building2, Trees, Sparkles, ChevronRight } from 'lucide-react';

interface ProvinceExplorerProps {
  onAskAIAboutProvince: (province: ProvinceData) => void;
  language: 'en' | 'rw' | 'fr';
}

export const ProvinceExplorer: React.FC<ProvinceExplorerProps> = ({
  onAskAIAboutProvince,
  language,
}) => {
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('kigali');
  const selectedProvince = RWANDA_PROVINCES.find((p) => p.id === selectedProvinceId) || RWANDA_PROVINCES[0];

  return (
    <section className="py-12 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-mono text-emerald-400 tracking-wider uppercase mb-1">
              National Administrative Intelligence
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5 Provinces · 30 Districts of Rwanda
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Explore demographic profiles, agro-climatic terrain, regional economic pillars, and infrastructure investments across Rwanda.
            </p>
          </div>

          {/* Interactive Province Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            {RWANDA_PROVINCES.map((prov) => (
              <button
                key={prov.id}
                onClick={() => setSelectedProvinceId(prov.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  selectedProvinceId === prov.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {language === 'rw' ? prov.kinyarwandaName : prov.name}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Province Detailed Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-900/60 border border-slate-800 rounded-xl p-6 backdrop-blur-sm">
          
          {/* Column 1: Identity & Key Metrics */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                {selectedProvince.kinyarwandaName}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{selectedProvince.name}</h3>
              <p className="text-xs text-slate-400 mt-1">Administrative Capital: <span className="text-slate-200 font-medium">{selectedProvince.capital}</span></p>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
              <div className="text-xs text-slate-400 font-mono">Districts Count</div>
              <div className="text-2xl font-bold text-white font-mono tabular-nums mt-0.5">
                {selectedProvince.districtsCount} Districts
              </div>
            </div>

            <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
              <div className="text-xs text-slate-400 font-mono">Regional Terrain & Elevation</div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {selectedProvince.terrain}
              </p>
            </div>

            <button
              onClick={() => onAskAIAboutProvince(selectedProvince)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Ask AI About {selectedProvince.name} Opportunities</span>
            </button>
          </div>

          {/* Column 2: 30 Districts Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Included Districts ({selectedProvince.districts.length})
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {selectedProvince.districts.map((district) => (
                <div
                  key={district}
                  className="flex items-center gap-2 p-2.5 bg-slate-950/60 border border-slate-800/80 rounded-lg hover:border-slate-700 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-200 truncate">{district}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-2">
              All districts operate decentralized digital service desks linked to Irembo 2.0 with local One-Stop Centers (BDI).
            </p>
          </div>

          {/* Column 3: Regional Highlights & Economic Engines */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Strategic Economic Pillars
              </h4>
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Key Economic Drivers</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedProvince.keyEconomicPillar}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                Flagship Assets & Landmarks
              </h4>
              <div className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
                <div className="flex items-start gap-2.5">
                  <Trees className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Regional Highlights</div>
                    <div className="text-xs text-slate-400 mt-1 leading-relaxed">{selectedProvince.highlight}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
