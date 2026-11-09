import React, { useState } from 'react';
import { Volume2, VolumeX, FileDown, Terminal, Menu, X, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { CommandPalette } from './CommandPalette';

export const Navbar: React.FC = () => {
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const newState = sound.toggleMute();
    setIsMuted(newState);
  };

  const navLinks = [
    { label: 'Systems', href: '#projects' },
    { label: 'Concurrency Audit', href: '#architecture' },
    { label: 'Skills', href: '#skills' },
    { label: 'Journey', href: '#journey' },
    { label: 'Terminal', href: '#terminal' }
  ];

  const handleLinkClick = () => {
    sound.playClick();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="nav-shell fixed top-0 left-0 right-0 z-40">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14 h-[76px] flex items-center justify-between">
        {/* Brand & Telemetry Badge */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="nav-brand flex items-center gap-2.5 group"
          >
            <div className="nav-brand__mark w-8 h-8 rounded-full flex items-center justify-center text-cyan-400 transition-all">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="font-mono font-bold text-sm tracking-wider text-slate-100 group-hover:text-cyan-300 transition-colors">
              {PORTFOLIO_DATA.profile.name}
            </span>
          </a>

          {/* Telemetry Pill */}
          <div className="nav-availability hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>BLR (UTC+5:30) · Open to Roles</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="nav-links hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              onMouseEnter={() => sound.playHover()}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-cyan-300 hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls: Audio Toggle + Resume CTA */}
        <div className="flex items-center gap-2.5">
          <CommandPalette />
          {/* Audio FX Toggle */}
          <button
            onClick={toggleSound}
            className={`nav-sound p-2 rounded-lg border transition-all ${
              isMuted
                ? 'border-slate-800 bg-slate-900/50 text-slate-500 hover:text-slate-300'
                : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
            }`}
            title={isMuted ? 'Unmute Audio FX' : 'Mute Audio FX'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Resume PDF Download */}
          <a
            href={`/${PORTFOLIO_DATA.profile.resumeFile}`}
            download
            onClick={() => sound.playSuccess()}
            className="nav-resume flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
             className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
         <div className="nav-mobile md:hidden border-b border-white/10 bg-[#030712]/98 px-4 py-4 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-3 py-2 rounded-lg text-sm font-mono text-slate-300 hover:bg-white/5 hover:text-cyan-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Location: Bangalore (UTC+5:30)</span>
            <span className="text-emerald-400 font-semibold">Available</span>
          </div>
        </div>
      )}
    </header>
  );
};
