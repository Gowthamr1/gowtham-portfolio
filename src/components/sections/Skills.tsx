import React, { useEffect, useState } from 'react';
import { Cpu, CheckCircle2, ShieldCheck, Database, Layout, Lock, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

export const Skills: React.FC = () => {
  const [activeProof, setActiveProof] = useState<{ name: string; proof: string; level: string } | null>(null);

  useEffect(() => {
    if (!activeProof) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveProof(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProof]);

  const getCategoryIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 1:
        return <Layout className="w-4 h-4 text-emerald-400" />;
      case 2:
        return <Lock className="w-4 h-4 text-purple-400" />;
      default:
        return <Database className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 border-t border-white/5 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills Backed by Proof of Implementation
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 font-light leading-relaxed">
            Every listed skill has been implemented, tested, and validated across 13 Django apps and production React environments.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
            <div
              key={cat.title}
              className="rounded-2xl border border-white/10 bg-[#0c1222]/90 p-6 hover:border-cyan-500/30 transition-all"
            >
              {/* Category Title */}
              <div className="flex items-center gap-2.5 mb-1 pb-3 border-b border-white/5">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  {getCategoryIcon(idx)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{cat.title}</h3>
                  <p className="text-[11px] font-mono text-slate-400">{cat.subtitle}</p>
                </div>
              </div>

              {/* Skills Chips */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                {cat.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => {
                      sound.playClick();
                      setActiveProof({
                        name: skill.name,
                        proof: skill.proof,
                        level: skill.level
                      });
                    }}
                    onMouseEnter={() => sound.playHover()}
                    className="p-3 rounded-xl border border-white/5 bg-slate-950/60 hover:bg-slate-900/80 hover:border-cyan-500/40 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded border uppercase ${
                          skill.level === 'Solid'
                            ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                            : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                        }`}
                      >
                        {skill.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {skill.proof}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proof Inspector Modal / Active Panel */}
        {activeProof && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setActiveProof(null);
            }}
          >
            <div
              className="relative w-full max-w-lg rounded-2xl border border-cyan-500/40 bg-slate-950 p-6 shadow-[0_0_40px_rgba(6,182,212,0.25)] text-slate-100"
              role="dialog"
              aria-modal="true"
              aria-labelledby="skill-proof-title"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <h4 id="skill-proof-title" className="font-mono font-bold text-sm text-cyan-300">{activeProof.name}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-200">
                    {activeProof.level}
                  </span>
                </div>
                <button
                  onClick={() => setActiveProof(null)}
                  className="text-xs font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-white/5"
                >
                  Close
                </button>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 space-y-2 mb-6">
                <span className="text-slate-400 uppercase tracking-wider text-[10px] font-mono block">
                  Verified Implementation Proof
                </span>
                <p className="leading-relaxed bg-slate-900/80 p-3.5 rounded-xl border border-white/5 font-mono text-emerald-300">
                  {activeProof.proof}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveProof(null)}
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold transition-all"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
