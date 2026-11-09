import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, Command, FileDown, Search, Volume2, VolumeX, X, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

interface CommandItem {
  id: string;
  label: string;
  hint: string;
  group: string;
  onSelect: () => void;
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const CommandPalette: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setIsOpen(false);
    setQuery('');
    setActiveIndex(0);
  };

  const open = () => {
    sound.playClick();
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen) window.requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const items = useMemo<CommandItem[]>(() => [
    { id: 'reel', label: 'Inspect the system reel', hint: 'scroll-driven architecture map', group: 'Navigate', onSelect: () => { close(); scrollTo('reel'); } },
    { id: 'systems', label: 'Open selected systems', hint: 'LMS / MTBS / Travel', group: 'Navigate', onSelect: () => { close(); scrollTo('projects'); } },
    { id: 'audit', label: 'Read the architecture audit', hint: '10 verified decisions', group: 'Navigate', onSelect: () => { close(); scrollTo('architecture'); } },
    { id: 'skills', label: 'Inspect technical stack', hint: 'skills backed by proof', group: 'Navigate', onSelect: () => { close(); scrollTo('skills'); } },
    { id: 'contact', label: 'Start a conversation', hint: PORTFOLIO_DATA.profile.email, group: 'Navigate', onSelect: () => { close(); scrollTo('terminal'); } },
    { id: 'cinemora', label: 'Launch Cinemora live', hint: 'cinemora-alpha.vercel.app', group: 'External', onSelect: () => { sound.playSuccess(); window.open('https://cinemora-alpha.vercel.app/', '_blank', 'noopener,noreferrer'); close(); } },
    { id: 'resume', label: 'Download resume', hint: PORTFOLIO_DATA.profile.resumeFile, group: 'External', onSelect: () => { sound.playSuccess(); window.open(`/${PORTFOLIO_DATA.profile.resumeFile}`, '_blank', 'noopener,noreferrer'); close(); } },
    { id: 'audio', label: isMuted ? 'Enable interface sounds' : 'Mute interface sounds', hint: 'audio feedback', group: 'Interface', onSelect: () => { const next = sound.toggleMute(); setIsMuted(next); } },
  ], [isMuted]);

  const filteredItems = items.filter((item) => `${item.label} ${item.hint} ${item.group}`.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    setActiveIndex((current) => Math.min(current, Math.max(filteredItems.length - 1, 0)));
  }, [query, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen((current) => !current);
        return;
      }

      if (!isOpen) return;
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        setActiveIndex((current) => Math.min(current + 1, filteredItems.length - 1));
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        setActiveIndex((current) => Math.max(current - 1, 0));
      }
      if (event.key === 'Enter') {
        event.preventDefault();
        filteredItems[activeIndex]?.onSelect();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, query, filteredItems.length]);

  return (
    <>
      <button className="command-trigger" onClick={open} aria-label="Open command palette">
        <Command className="w-3.5 h-3.5" /><span>command</span><kbd>⌘K</kbd>
      </button>

      {isOpen && (
        <div className="command-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
          <div className="command-palette" role="dialog" aria-modal="true" aria-label="Portfolio command palette">
            <div className="command-palette__search"><Search className="w-4 h-4" /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0); }} placeholder="What do you want to inspect?" /><button onClick={close} aria-label="Close command palette"><X className="w-4 h-4" /></button></div>
            <div className="command-palette__body">
              {filteredItems.length === 0 && <p className="command-empty">No matching system. Try “Cinemora”, “audit”, or “contact”.</p>}
              {filteredItems.map((item, index) => (
                <button key={item.id} className={`command-item ${activeIndex === index ? 'is-active' : ''}`} onMouseEnter={() => setActiveIndex(index)} onClick={() => { sound.playClick(); item.onSelect(); }}>
                  <span className="command-item__icon">{item.id === 'resume' ? <FileDown /> : item.id === 'cinemora' ? <ArrowUpRight /> : item.id === 'audio' ? (isMuted ? <Volume2 /> : <VolumeX />) : <Zap />}</span>
                  <span className="command-item__copy"><b>{item.label}</b><small>{item.hint}</small></span><span className="command-item__group">{item.group}</span>
                </button>
              ))}
            </div>
            <div className="command-palette__footer"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> select</span><span><kbd>esc</kbd> close</span></div>
          </div>
        </div>
      )}
    </>
  );
};
