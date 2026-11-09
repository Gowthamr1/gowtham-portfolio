import React from 'react';
import { ArrowUp, Cpu, Heart } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-slate-950 py-12 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand & Systems Notice */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <p className="text-slate-200 font-bold tracking-wider">
              {PORTFOLIO_DATA.profile.name}
            </p>
            <p className="text-[11px] text-slate-500">
              Django + React Systems & Real-Time Web Architecture
            </p>
          </div>
        </div>

        {/* Telemetry Status */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-[11px] text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ENGINE STATUS: 60 FPS · CLOUD VERIFIED</span>
        </div>

        {/* Back to Top */}
        <div className="flex items-center gap-4">
          <p className="text-slate-500 text-[11px]">
            Bangalore (UTC+5:30)
          </p>
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-400 hover:text-cyan-300 transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
