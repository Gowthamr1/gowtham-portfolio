import React from 'react';
import { Image as ImageIcon, Sparkles, Layers, Maximize2 } from 'lucide-react';

interface ProjectScreenshotSlotProps {
  id: string;
  title: string;
  aspectRatio: string;
  recommendedResolution: string;
  description: string;
  imageSrc?: string;
  accentColor?: 'cyan' | 'emerald' | 'purple' | 'amber';
  className?: string;
}

export const ProjectScreenshotSlot: React.FC<ProjectScreenshotSlotProps> = ({
  id,
  title,
  aspectRatio,
  recommendedResolution,
  description,
  imageSrc,
  accentColor = 'cyan',
  className = ''
}) => {
  const accentClasses = {
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      glow: '',
      iconBg: 'bg-cyan-500/10 text-cyan-400',
      crosshair: 'border-cyan-500/20'
    },
    emerald: {
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      glow: '',
      iconBg: 'bg-emerald-500/10 text-emerald-400',
      crosshair: 'border-emerald-500/20'
    },
    purple: {
      border: 'border-purple-500/30 hover:border-purple-400/60',
      badge: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      glow: '',
      iconBg: 'bg-purple-500/10 text-purple-400',
      crosshair: 'border-purple-500/20'
    },
    amber: {
      border: 'border-amber-500/30 hover:border-amber-400/60',
      badge: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      glow: '',
      iconBg: 'bg-amber-500/10 text-amber-400',
      crosshair: 'border-amber-500/20'
    }
  }[accentColor];

  return (
    <div
      className={`group relative rounded-xl overflow-hidden border ${accentClasses.border} bg-[#0b0f19] transition-all duration-200 ${className}`}
    >
      {/* Top Telemetry / Window Bar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-slate-900/60 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
          </div>
          <span className="text-slate-400 text-[11px] truncate max-w-[200px] sm:max-w-xs">
            viewport::{id}.png
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-0.5 rounded text-[10px] border ${accentClasses.badge}`}>
            {aspectRatio} · {recommendedResolution}
          </span>
        </div>
      </div>

      {/* Main View Area */}
      {imageSrc ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        </div>
      ) : (
        /* Cyber-Engineered Blueprint Placeholder */
        <div className="relative aspect-[16/10] sm:aspect-[16/9] p-6 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
          {/* Subtle Grid and Crosshair Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
          <div className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 ${accentClasses.crosshair}`} />
          <div className={`absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 ${accentClasses.crosshair}`} />
          <div className={`absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 ${accentClasses.crosshair}`} />
          <div className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 ${accentClasses.crosshair}`} />

          {/* Animated Glow Radar / Tech Rings */}
          <div className="relative mb-4">
            <div className="absolute -inset-3 rounded-full bg-cyan-500/10 blur-md animate-pulse" />
            <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 ${accentClasses.iconBg}`}>
              <ImageIcon className="w-7 h-7" />
            </div>
          </div>

          {/* Title & Slot Info */}
          <h4 className="text-slate-100 font-semibold text-sm sm:text-base tracking-wide flex items-center gap-1.5 mb-1.5">
            <span>{title}</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </h4>

          <p className="text-xs text-slate-400 max-w-md line-clamp-2 px-2 mb-3">
            {description}
          </p>

          {/* Drop Image Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Reserved Slot: <code className="text-cyan-300">/public/projects/{id}.png</code></span>
          </div>
        </div>
      )}
    </div>
  );
};
