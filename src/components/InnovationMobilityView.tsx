import React, { useState } from 'react';
import { ZIPLINE_DRONE_NETWORK, DroneHospital } from '../data/rwandaData.ts';
import { Zap, Send, Navigation, HeartPulse, BatteryCharging, Shield, CheckCircle2, Building, Play, RotateCcw } from 'lucide-react';

interface InnovationMobilityViewProps {
  language: 'en' | 'rw' | 'fr';
}

export const InnovationMobilityView: React.FC<InnovationMobilityViewProps> = ({ language }) => {
  const [selectedHospital, setSelectedHospital] = useState<DroneHospital>(ZIPLINE_DRONE_NETWORK[0]);
  const [isSimulatingFlight, setIsSimulatingFlight] = useState<boolean>(false);
  const [flightProgress, setFlightProgress] = useState<number>(0);
  const [hasLanded, setHasLanded] = useState<boolean>(false);

  const startFlightSimulation = (hospital: DroneHospital) => {
    setSelectedHospital(hospital);
    setIsSimulatingFlight(true);
    setFlightProgress(0);
    setHasLanded(false);

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current >= 100) {
        setFlightProgress(100);
        setIsSimulatingFlight(false);
        setHasLanded(true);
        clearInterval(interval);
      } else {
        setFlightProgress(current);
      }
    }, 70);
  };

  return (
    <div className="py-10 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Visual Banner */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
          <div className="h-64 sm:h-72 w-full relative">
            <img
              src="/src/assets/images/rwanda_innovation_hub_1790626648787.jpg"
              alt="Norrsken Kigali and Green City Architecture in Rwanda"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 max-w-2xl">
              <div className="text-xs font-mono text-emerald-400 tracking-wider uppercase mb-1">
                Kigali Innovation City · Green Smart City
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Tech Ecosystem & Clean Urban Mobility
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                From pioneering the world's first commercial drone medical delivery network with Zipline to electrifying public moto transport with Ampersand and Spiro, Rwanda leads Africa in sustainable technology deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Zipline Autonomous Drone Emergency Medical Delivery Simulator */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                Autonomous Healthcare Logistics
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Zipline Rwanda Drone Dispatch Simulator
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              Operating Centers: Muhanga Nest (South) & Kayonza Nest (East)
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Hospital Selection (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                Select Hospital Destination
              </span>

              <div className="space-y-2">
                {ZIPLINE_DRONE_NETWORK.map((hosp) => (
                  <button
                    key={hosp.name}
                    onClick={() => {
                      setSelectedHospital(hosp);
                      setFlightProgress(0);
                      setHasLanded(false);
                      setIsSimulatingFlight(false);
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedHospital.name === hosp.name
                        ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate">{hosp.name}</span>
                      <span className="text-[11px] font-mono text-emerald-400 tabular-nums">{hosp.flightMinutes} min</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5 flex items-center justify-between">
                      <span>{hosp.district}</span>
                      <span className="font-mono">{hosp.distanceKm} km from {hosp.hub}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Flight Radar & Telemetry Display (7 cols) */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-500 block">Flight Mission Target</span>
                  <span className="text-base font-bold text-white">{selectedHospital.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-500 block">Origin Hub</span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">{selectedHospital.hub}</span>
                </div>
              </div>

              {/* Progress Bar & Radar Graphic */}
              <div className="p-5 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Drone Cruising Speed: 101 km/h</span>
                  </span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    {flightProgress}% Completed
                  </span>
                </div>

                {/* Simulated Track */}
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-75"
                    style={{ width: `${flightProgress}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] font-mono text-slate-500 pt-1">
                  <span>Takeoff: {selectedHospital.hub}</span>
                  <span>Payload Drop: {selectedHospital.district}</span>
                </div>
              </div>

              {/* Flight Telemetry Metrics */}
              <div className="grid grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <span className="text-slate-500 block">Radial Distance</span>
                  <span className="text-white font-bold text-sm tabular-nums mt-0.5">
                    {selectedHospital.distanceKm} km
                  </span>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <span className="text-slate-500 block">Transit Time</span>
                  <span className="text-emerald-400 font-bold text-sm tabular-nums mt-0.5">
                    {selectedHospital.flightMinutes} min
                  </span>
                </div>
                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                  <span className="text-slate-500 block">Road Saving</span>
                  <span className="text-teal-300 font-bold text-sm tabular-nums mt-0.5">
                    -3.5 Hours
                  </span>
                </div>
              </div>

              <div className="p-3 bg-red-950/20 border border-red-900/40 rounded-lg text-xs">
                <div className="flex items-center gap-1.5 text-red-300 font-semibold mb-1">
                  <HeartPulse className="w-4 h-4" />
                  <span>Dispatched Medical Payload</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-mono">
                  {selectedHospital.criticalSupplies}
                </p>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => startFlightSimulation(selectedHospital)}
                  disabled={isSimulatingFlight}
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {isSimulatingFlight ? (
                    <>
                      <Navigation className="w-4 h-4 animate-spin text-emerald-200" />
                      <span>Simulating Autonomous Flight...</span>
                    </>
                  ) : hasLanded ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Re-launch Mission to {selectedHospital.name}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Launch Emergency Dispatch Flight</span>
                    </>
                  )}
                </button>
              </div>

              {hasLanded && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>
                    Parachute package safely released above {selectedHospital.name} drop zone. Hospital blood bank notified via SMS.
                  </span>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Clean E-Mobility & Kigali Tech Ecosystem Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
            <div className="p-2.5 bg-emerald-600/20 border border-emerald-500/40 rounded-lg w-fit text-emerald-400">
              <BatteryCharging className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">E-Moto Clean Mobility</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Kigali is rapidly transitioning 30,000+ commercial motorcycle taxis to zero-emission electric bikes powered by Ampersand and Spiro solar-swappable battery stations.
            </p>
            <div className="text-xs font-mono text-emerald-400 tabular-nums">
              +70% driver fuel cost savings
            </div>
          </div>

          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
            <div className="p-2.5 bg-teal-600/20 border border-teal-500/40 rounded-lg w-fit text-teal-400">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Norrsken & CMU Africa</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Norrsken Kigali House hosts over 1,000 pan-African tech innovators alongside Carnegie Mellon University Africa, producing elite software engineers and AI researchers.
            </p>
            <div className="text-xs font-mono text-teal-400 tabular-nums">
              Kigali Innovation City Hub
            </div>
          </div>

          <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-xl space-y-3">
            <div className="p-2.5 bg-amber-600/20 border border-amber-500/40 rounded-lg w-fit text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">National AI & C4IR Center</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rwanda operates the World Economic Forum Center for the Fourth Industrial Revolution (C4IR) to establish ethical AI governance, data privacy laws, and health AI pilots.
            </p>
            <div className="text-xs font-mono text-amber-300 tabular-nums">
              National AI Policy Enforced
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
