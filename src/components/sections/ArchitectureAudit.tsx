import React, { useState } from 'react';
import { ShieldAlert, FileCode, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { PORTFOLIO_DATA, ConcurrencyAuditItem } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

export const ArchitectureAudit: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string>(PORTFOLIO_DATA.concurrencyAudits[0].id);

  const categories = ['All', 'Concurrency', 'Security', 'Architecture', 'Performance'];

  const filteredAudits = PORTFOLIO_DATA.concurrencyAudits.filter((audit) => {
    if (selectedCategory === 'All') return true;
    return audit.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    sound.playClick();
    setExpandedId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="architecture" className="relative py-28 border-t border-white/5 bg-slate-950">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        {/* Section Header */}
        <div className="section-intro section-intro--left architecture-intro">
          <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Systems & Concurrency Deep Dive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How the system<br /><em>stays honest.</em>
          </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 mt-3 font-light leading-relaxed">
            Ten decisions that keep shared state safe: locks, commits, origin checks, and the small pieces of restraint that stop a live product from lying.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sound.playClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.2)] font-semibold'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Audit Cards Grid */}
        <div className="audit-list">
          {filteredAudits.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`audit-item rounded-xl border transition-all duration-200 ${
                  isExpanded
                    ? 'border-cyan-500/50 bg-slate-900/80 shadow-[0_0_25px_rgba(6,182,212,0.12)]'
                    : 'border-white/5 bg-slate-950/60 hover:border-white/15'
                }`}
              >
                {/* Header Row */}
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left gap-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <span className="audit-item__number font-mono text-xs font-bold px-2 py-1 rounded bg-white/5 text-cyan-400 border border-white/10 shrink-0">
                      #{item.number}
                    </span>
                     <div className="truncate audit-item__title-wrap">
                      <h4 className="text-sm sm:text-base font-semibold text-slate-100 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5 truncate">
                        <FileCode className="w-3 h-3 text-slate-500 shrink-0" />
                        <span className="truncate">{item.file}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                     <span
                       className={`audit-item__category text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                        item.category === 'Concurrency'
                          ? 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                          : item.category === 'Security'
                          ? 'bg-purple-950/60 border-purple-500/40 text-purple-300'
                          : item.category === 'Performance'
                          ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                          : 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                      }`}
                    >
                      {item.category}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                </button>

                {/* Expanded Details Body */}
                {isExpanded && (
                   <div className="audit-item__body px-4 pb-5 sm:px-5 sm:pb-6 pt-2 border-t border-white/5 text-xs animate-fadeIn space-y-3">
                    <p className="text-slate-300 leading-relaxed sm:text-sm">
                      {item.summary}
                    </p>

                    {/* Source Code Evidence Quote */}
                    <div className="rounded-lg bg-black/80 border border-cyan-500/20 p-3 sm:p-4 font-mono text-[11px] sm:text-xs">
                      <div className="flex items-center justify-between text-slate-500 mb-2 pb-1.5 border-b border-white/5">
                        <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Verified Code Proof</span>
                        </span>
                        <span className="text-[10px] text-slate-400">{item.file}</span>
                      </div>
                      <code className="text-emerald-300 block whitespace-pre-wrap leading-relaxed">
                        "{item.codeQuote}"
                      </code>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
