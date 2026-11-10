import React from 'react';
import { Compass, GraduationCap, Briefcase, Milestone, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';

export const CareerArc: React.FC = () => {
  return (
    <section id="journey" className="relative py-24 border-t border-white/5 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Trajectory & Formation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Engineering Journey
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3 font-light leading-relaxed">
            "I learn by shipping systems that are harder than they need to be, then making them feel simple."
          </p>
        </div>

        {/* 4-Stage Career Arc Timeline */}
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 relative before:absolute before:inset-0 before:left-3.5 sm:before:left-1/2 before:w-0.5 before:bg-gradient-to-b before:from-cyan-500/60 before:via-emerald-500/60 before:to-purple-500/60 before:-ml-px mb-16 sm:mb-20">
          {PORTFOLIO_DATA.careerArc.map((stage, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={stage.stage}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } group`}
              >
                {/* Node Milestone Icon */}
                <div className="absolute left-3.5 sm:left-1/2 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-10">
                  <Milestone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>

                {/* Content Card */}
                <div className="ml-8 sm:ml-0 sm:w-1/2 sm:px-8 w-[calc(100%-32px)] sm:w-1/2">
                  <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-[#0c1222]/90 hover:border-cyan-500/40 transition-all">
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                      <span>{stage.stage}</span>
                      <span className="text-slate-500">{stage.period}</span>
                    </div>

                    <h3 className="text-sm sm:text-lg font-bold text-white mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-xs font-mono text-emerald-400 mb-2 sm:mb-3">
                      {stage.institutionOrCompany}
                    </p>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3 sm:mb-4">
                      {stage.description}
                    </p>

                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/5 text-[10px] sm:text-[11px] font-mono text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span className="truncate">{stage.evidence}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formal Education Deep Dive */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base sm:text-lg font-bold text-white font-mono">Academic Credentials & Coursework</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/10 bg-[#0c1222]/90"
              >
                <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-1">
                  <span>{edu.period}</span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">{edu.degree}</h4>
                <p className="text-xs font-mono text-emerald-400 mb-2 sm:mb-3">{edu.institution}</p>
                <p className="text-xs text-slate-300 mb-3 sm:mb-4 leading-relaxed">{edu.focus}</p>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                    Core Coursework
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span
                        key={course}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] sm:text-[11px] font-mono text-slate-300"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
