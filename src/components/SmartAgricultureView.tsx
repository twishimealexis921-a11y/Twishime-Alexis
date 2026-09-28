import React, { useState } from 'react';
import { RWANDA_CROPS, CropData } from '../data/rwandaData.ts';
import { Wheat, Stethoscope, AlertTriangle, ArrowUpRight, CheckCircle2, Loader2, Sparkles, Sprout, ShieldCheck } from 'lucide-react';

interface SmartAgricultureViewProps {
  language: 'en' | 'rw' | 'fr';
}

export const SmartAgricultureView: React.FC<SmartAgricultureViewProps> = ({ language }) => {
  const [selectedCrop, setSelectedCrop] = useState<CropData>(RWANDA_CROPS[0]);
  const [cropForDiagnosis, setCropForDiagnosis] = useState<string>('Specialty Arabica Coffee');
  const [symptomsInput, setSymptomsInput] = useState<string>('Yellow powdery orange spots on the underside of coffee leaves and premature defoliation.');
  const [districtInput, setDistrictInput] = useState<string>('Huye (Southern Province)');
  const [soilInput, setSoilInput] = useState<string>('High altitude volcanic loam, 1,750m');
  const [diagnosisResult, setDiagnosisResult] = useState<string | null>(null);
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState<boolean>(false);
  const [diagnosisError, setDiagnosisError] = useState<string | null>(null);

  const handleRunDiagnosis = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptomsInput.trim()) return;

    setIsLoadingDiagnosis(true);
    setDiagnosisError(null);
    setDiagnosisResult(null);

    try {
      const response = await fetch('/api/gemini/crop-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: cropForDiagnosis,
          symptoms: symptomsInput,
          district: districtInput,
          soilType: soilInput,
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete diagnosis');
      }
      setDiagnosisResult(data.diagnosis);
    } catch (err: any) {
      console.error('Crop Doctor Error:', err);
      setDiagnosisError(err.message || 'Unable to complete diagnosis at this time.');
    } finally {
      setIsLoadingDiagnosis(false);
    }
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header with Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
          <div className="h-64 sm:h-72 w-full relative">
            <img
              src="/src/assets/images/rwanda_smart_agriculture_1790626627395.jpg"
              alt="Lush coffee and tea terraced hills in Rwanda"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 max-w-2xl">
              <div className="text-xs font-mono text-emerald-400 tracking-wider uppercase mb-1">
                Ubuhinzi bwa Kijyambere · RAB National Agronomy Standards
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Smart Agriculture & Precision Agronomy
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                Empowering Rwandan farmers across the Land of a Thousand Hills with real-time e-Soko commodity pricing, high-altitude Bourbon coffee guidance, and AI-driven plant disease diagnostics.
              </p>
            </div>
          </div>
        </div>

        {/* e-Soko Live Commodity Pricing Tracker */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                e-Soko Market Intelligence
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Rwandan Commodity Benchmark Prices (RWF/kg)
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Verified District Market Rates
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {RWANDA_CROPS.map((crop) => (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedCrop.id === crop.id
                    ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="text-[11px] text-slate-400 truncate">{crop.name}</div>
                <div className="text-base sm:text-lg font-bold text-white font-mono tabular-nums mt-1">
                  {crop.marketPriceRwfKg} <span className="text-xs font-normal text-slate-400">RWF</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono mt-1 text-emerald-400">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{crop.priceTrend}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Crop Profile & AI Crop Doctor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Selected Crop Agronomic Profile (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                {selectedCrop.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">{selectedCrop.name}</h3>
              <p className="text-xs text-slate-400">{selectedCrop.nameRw}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
                <span className="text-slate-500 block">Optimal Elevation:</span>
                <span className="text-slate-200 font-semibold">{selectedCrop.optimalAltitude}</span>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-lg">
                <span className="text-slate-500 block">Annual Rainfall:</span>
                <span className="text-slate-200 font-semibold">{selectedCrop.annualRainfall}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-semibold text-slate-300">Leading Producing Districts:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedCrop.mainDistricts.map((d) => (
                  <span key={d} className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-slate-300">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-semibold text-slate-300">Harvest Timeline:</span>
              <p className="text-slate-400 leading-relaxed">{selectedCrop.harvestSeason}</p>
            </div>

            <div className="space-y-1 text-xs">
              <span className="font-semibold text-slate-300">Common Pathogens & Vectors:</span>
              <ul className="text-slate-400 list-disc list-inside space-y-0.5">
                {selectedCrop.commonPests.map((pest, i) => (
                  <li key={i}>{pest}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-xs">
              <span className="font-semibold text-emerald-300 block mb-1">RAB Recommended Standard:</span>
              <p className="text-slate-300 leading-relaxed">{selectedCrop.bestPractices}</p>
            </div>

            <button
              onClick={() => {
                setCropForDiagnosis(selectedCrop.name);
                setSymptomsInput(`Suspected ${selectedCrop.commonPests[0]} symptoms on ${selectedCrop.name}.`);
                setDistrictInput(selectedCrop.mainDistricts[0] || 'Musanze');
              }}
              className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Load into AI Diagnostic Engine ↓
            </button>
          </div>

          {/* AI Crop Doctor & Agronomy Diagnostic Tool (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-emerald-600/20 border border-emerald-500/40 rounded-lg text-emerald-400">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Agronomist & Crop Doctor</h3>
                <p className="text-xs text-slate-400">
                  Powered by Gemini 3.8 Flash trained on Rwanda Agriculture Board (RAB) agronomy guidelines.
                </p>
              </div>
            </div>

            <form onSubmit={handleRunDiagnosis} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Target Crop</label>
                  <input
                    type="text"
                    value={cropForDiagnosis}
                    onChange={(e) => setCropForDiagnosis(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    placeholder="e.g., Arabica Bourbon, Kinigi Irish Potato"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1">Rwandan District / Altitude</label>
                  <input
                    type="text"
                    value={districtInput}
                    onChange={(e) => setDistrictInput(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                    placeholder="e.g., Musanze, Huye, Gicumbi"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Soil / Field Conditions</label>
                <input
                  type="text"
                  value={soilInput}
                  onChange={(e) => setSoilInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="e.g., Volcanic soil, well drained, terraced slope"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">
                  Observed Symptoms (Leaves, stems, cherries, tubers, wilt)
                </label>
                <textarea
                  rows={3}
                  value={symptomsInput}
                  onChange={(e) => setSymptomsInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  placeholder="Describe leaf spots, curling, discoloration, boring holes, wilt pattern..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoadingDiagnosis}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {isLoadingDiagnosis ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-200" />
                    <span>Analyzing Pathogen Pattern with Gemini...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run Agronomic AI Diagnosis</span>
                  </>
                )}
              </button>
            </form>

            {/* Diagnosis Result Box */}
            {diagnosisError && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-lg text-xs text-red-200">
                {diagnosisError}
              </div>
            )}

            {diagnosisResult && (
              <div className="p-4 bg-slate-950 border border-emerald-500/40 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Agronomic Diagnosis & Action Plan</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">RAB Compliance Protocol</span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
                  {diagnosisResult}
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>RAB Toll-Free Extension: 4640</span>
                  <span>Contact Sector Agronomist</span>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
