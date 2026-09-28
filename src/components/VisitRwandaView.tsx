import React, { useState } from 'react';
import { TOURISM_DESTINATIONS, TourismDestination } from '../data/rwandaData.ts';
import { CurrencyConverter } from './CurrencyConverter.tsx';
import { MapPin, Compass, Calendar, DollarSign, HeartHandshake, Sparkles, Loader2, CheckCircle, ArrowRight } from 'lucide-react';

interface VisitRwandaViewProps {
  language: 'en' | 'rw' | 'fr';
}

export const VisitRwandaView: React.FC<VisitRwandaViewProps> = ({ language }) => {
  const [selectedDestination, setSelectedDestination] = useState<TourismDestination>(TOURISM_DESTINATIONS[0]);
  const [duration, setDuration] = useState<string>('5 Days (Primates & Big Five)');
  const [travelStyle, setTravelStyle] = useState<string>('Eco-Conscious Mid-Range');
  const [interests, setInterests] = useState<string>('Mountain Gorillas, Nyungwe Canopy Walk, Akagera Safari');
  const [itineraryResult, setItineraryResult] = useState<string | null>(null);
  const [isLoadingItinerary, setIsLoadingItinerary] = useState<boolean>(false);
  const [itineraryError, setItineraryError] = useState<string | null>(null);

  const handleGenerateItinerary = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingItinerary(true);
    setItineraryError(null);
    setItineraryResult(null);

    const prompt = `Generate a realistic, detailed day-by-day travel itinerary for Rwanda:
Trip Length: ${duration}
Traveler Style: ${travelStyle}
Core Interests: ${interests}
Language: ${language}

Please include:
1. Day-by-Day Route & Driving Times between Kigali and regions (e.g. Kigali to Musanze is 2.5 hours on RN4; Musanze to Nyungwe via Karongi Kivu belt is 5-6 hours).
2. Mountain Gorilla permit guidance ($1,500 foreign / EAC discount) and physical preparation.
3. Recommended eco-lodges / accommodation categories.
4. Essential gear packing list for rainforest and volcanic hikes (gaiters, gardening gloves, rain jacket).
5. Community conservation revenue-sharing impact (10% back to local communities).`;

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          category: 'tourism',
          language,
          context: 'Visit Rwanda official tourist planning & conservation guidelines',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate itinerary');
      }
      setItineraryResult(data.response);
    } catch (err: any) {
      console.error('Itinerary error:', err);
      setItineraryError(err.message || 'Unable to generate itinerary at this time.');
    } finally {
      setIsLoadingItinerary(false);
    }
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Visual Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
          <div className="h-64 sm:h-80 w-full relative">
            <img
              src="/src/assets/images/rwanda_volcanoes_gorillas_1790626637827.jpg"
              alt="Mountain Gorilla in Volcanoes National Park Rwanda"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 max-w-2xl">
              <div className="text-xs font-mono text-emerald-400 tracking-wider uppercase mb-1">
                Ubukerarugendo · Visit Rwanda Eco-Conservation
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Visit Rwanda · Conservation & Wonder
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Home to over a third of the world's remaining endangered mountain gorillas, Central Africa’s largest protected wetland in Akagera, and the primeval UNESCO rainforest of Nyungwe.
              </p>
            </div>
          </div>
        </div>

        {/* Flagship Destinations Explorer */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Protected Parks & Heritage
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Rwanda's Premier Eco-Tourism Destinations
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {TOURISM_DESTINATIONS.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setSelectedDestination(dest)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedDestination.id === dest.id
                    ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] font-mono text-emerald-400 truncate">{dest.type}</div>
                <div className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-1">
                  {dest.name.split('(')[0]}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{dest.location}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Destination Details & AI Itinerary Planner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Destination Profile (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                {selectedDestination.type}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{selectedDestination.name}</h3>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{selectedDestination.location}</span>
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-300">Park Highlights:</span>
              <ul className="text-slate-300 space-y-1 list-disc list-inside">
                {selectedDestination.highlights.map((h, i) => (
                  <li key={i} className="leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
                <span className="text-slate-500 block">Permits / Access:</span>
                <span className="text-emerald-400 font-semibold">{selectedDestination.permitFee}</span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
                <span className="text-slate-500 block">Optimal Season:</span>
                <span className="text-slate-200 font-semibold">{selectedDestination.bestTimeToVisit}</span>
              </div>
            </div>

            <div className="p-3 bg-teal-950/20 border border-teal-900/40 rounded-lg text-xs">
              <div className="flex items-center gap-1.5 text-teal-300 font-semibold mb-1">
                <HeartHandshake className="w-4 h-4" />
                <span>Community Conservation Model</span>
              </div>
              <p className="text-slate-300 leading-relaxed">{selectedDestination.conservationNote}</p>
            </div>

            <button
              onClick={() => setInterests(`Focus on ${selectedDestination.name} highlights including ${selectedDestination.highlights[0]}`)}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Add to Itinerary Generator ↓
            </button>
          </div>

          {/* AI Itinerary Generator (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-600/20 border border-emerald-500/40 rounded-lg text-emerald-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Itinerary & Expedition Planner</h3>
                <p className="text-xs text-slate-400">
                  Custom route planning with accurate Rwandan road networks, permit timings, and packing lists.
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerateItinerary} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Trip Duration</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="3 Days (Gorillas & Kigali Express)">3 Days (Gorillas & Kigali Express)</option>
                    <option value="5 Days (Primates & Big Five)">5 Days (Primates & Big Five)</option>
                    <option value="7 Days (Grand Rwanda Circuit)">7 Days (Grand Rwanda Circuit)</option>
                    <option value="10 Days (Complete Wilderness & Kivu Trail)">10 Days (Complete Wilderness & Kivu Trail)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Traveler Style</label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  >
                    <option value="Eco-Conscious Mid-Range">Eco-Conscious Mid-Range</option>
                    <option value="Luxury Safari & Primate Lodges">Luxury Safari & Primate Lodges</option>
                    <option value="Active Adventure & Hiking">Active Adventure & Hiking</option>
                    <option value="Cultural & Community Focused">Cultural & Community Focused</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Specific Interests & Priorities</label>
                <input
                  type="text"
                  value={interests}
                  onChange={(e) => setInterests(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="e.g., Gorillas in Musanze, Canopy Walk in Nyungwe, Kigali Genocide Memorial"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoadingItinerary}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isLoadingItinerary ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                    <span>Synthesizing Rwanda Route via Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Tailored Rwanda Itinerary</span>
                  </>
                )}
              </button>
            </form>

            {/* Error state */}
            {itineraryError && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-200">
                {itineraryError}
              </div>
            )}

            {/* Generated Itinerary Output */}
            {itineraryResult && (
              <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span>Personalized Visit Rwanda Itinerary</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">RDB Tourism Standards</span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
                  {itineraryResult}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Real-time Currency Converter Section */}
        <div className="pt-4">
          <CurrencyConverter language={language} />
        </div>

      </div>
    </div>
  );
};
