import React, { useState } from 'react';
import { IREMBO_SERVICES, IremboService } from '../data/rwandaData.ts';
import { Shield, Search, FileText, CheckCircle2, Clock, Banknote, Sparkles, ExternalLink, ArrowRight, Loader2 } from 'lucide-react';

interface CitizenServicesViewProps {
  language: 'en' | 'rw' | 'fr';
}

export const CitizenServicesView: React.FC<CitizenServicesViewProps> = ({ language }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeServiceGuide, setActiveServiceGuide] = useState<IremboService | null>(null);
  const [guideContent, setGuideContent] = useState<string>('');
  const [isLoadingGuide, setIsLoadingGuide] = useState(false);
  const [guideError, setGuideError] = useState<string | null>(null);

  const categories = ['All', 'Civil Status', 'Police & Justice', 'Traffic & Transport', 'Land & Property', 'Business & Trade', 'Healthcare & Social'];

  const filteredServices = IREMBO_SERVICES.filter((svc) => {
    const matchesSearch =
      svc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      svc.titleRw.toLowerCase().includes(searchTerm.toLowerCase()) ||
      svc.agency.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || svc.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleFetchGuide = async (service: IremboService) => {
    setActiveServiceGuide(service);
    setIsLoadingGuide(true);
    setGuideError(null);
    setGuideContent('');

    try {
      const response = await fetch('/api/gemini/irembo-guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName: `${service.title} (${service.titleRw}) managed by ${service.agency}`,
          citizenType: 'Citizen with National ID',
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate guide');
      }
      setGuideContent(data.guide);
    } catch (err: any) {
      console.error('Error getting Irembo guide:', err);
      setGuideError(err.message || 'Unable to retrieve guide at this time.');
    } finally {
      setIsLoadingGuide(false);
    }
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Block */}
        <div>
          <div className="text-xs font-mono text-emerald-400 tracking-wider uppercase mb-1">
            Ikoranabuhanga mu Serivisi za Leta · Irembo 2.0 & RDB
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Smart Citizen & Public Services Portal
          </h1>
          <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
            Rwanda has digitized over 100 public services across local government, police, land, business registration, and healthcare. Use our AI guide to receive instant document checklists, fees in RWF, and portal workflows.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search services (e.g., criminal record, UPI, driving license)..."
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-950/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
                  <span>{svc.category}</span>
                  <span className="text-emerald-400 font-semibold">{svc.onlinePortal}</span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">
                  {svc.title}
                </h3>
                <p className="text-xs text-emerald-400/90 font-medium mt-0.5">
                  {svc.titleRw}
                </p>

                <div className="mt-3 text-xs text-slate-400">
                  <span className="text-slate-500">Managing Authority:</span>{' '}
                  <span className="text-slate-300 font-medium">{svc.agency}</span>
                </div>

                {/* Service Specs: Tabular numbers */}
                <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Banknote className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-mono tabular-nums">
                      {svc.estimatedFeeRwf === 0 ? 'FREE' : `${svc.estimatedFeeRwf.toLocaleString()} RWF`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span className="truncate">{svc.deliveryTime}</span>
                  </div>
                </div>

                {/* Key Prerequisites preview */}
                <div className="mt-3">
                  <div className="text-[11px] text-slate-400 font-medium mb-1">Prerequisites:</div>
                  <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
                    {svc.prerequisites.slice(0, 2).map((req, i) => (
                      <li key={i} className="truncate">{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => handleFetchGuide(svc)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-slate-800 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Full AI Checklist</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* AI Guide Modal / Deep Inspection Drawer */}
        {activeServiceGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-slate-900 border border-slate-700 max-w-2xl w-full rounded-2xl p-6 max-h-[85vh] overflow-y-auto shadow-2xl space-y-4">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                    Official AI Guidance · {activeServiceGuide.category}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">{activeServiceGuide.title}</h3>
                  <div className="text-xs text-slate-400">{activeServiceGuide.agency}</div>
                </div>
                <button
                  onClick={() => setActiveServiceGuide(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-md text-sm font-mono cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Fee and Delivery Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">Official Fee:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    {activeServiceGuide.estimatedFeeRwf === 0
                      ? 'FREE (0 RWF)'
                      : `${activeServiceGuide.estimatedFeeRwf.toLocaleString()} RWF`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Processing Time:</span>
                  <span className="text-slate-200 font-medium">{activeServiceGuide.deliveryTime}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Payment Method:</span>
                  <span className="text-slate-200 font-medium">MTN MoMo / Airtel / BK</span>
                </div>
              </div>

              {/* AI Guide Output Container */}
              <div className="bg-slate-950/80 p-4 border border-slate-800 rounded-xl min-h-[160px]">
                {isLoadingGuide && (
                  <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
                    <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                    <span className="text-xs text-slate-400">
                      Querying official government database protocols via Gemini 3.8 Flash...
                    </span>
                  </div>
                )}

                {guideError && (
                  <div className="p-3 bg-red-950/50 border border-red-800/80 rounded-lg text-xs text-red-200">
                    {guideError}
                  </div>
                )}

                {!isLoadingGuide && guideContent && (
                  <div className="prose prose-invert prose-xs text-slate-300 max-w-none text-xs leading-relaxed space-y-2 whitespace-pre-line">
                    {guideContent}
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2">
                <a
                  href={`https://${activeServiceGuide.onlinePortal}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4"
                >
                  <span>Go to official {activeServiceGuide.onlinePortal}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setActiveServiceGuide(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Close Guide
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
