import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Database, GitBranch, LockKeyhole, Radio, Server, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

interface ReelFrame {
  eyebrow: string;
  title: string;
  body: string;
  signal: string;
  metric: string;
  metricLabel: string;
  accent: 'lime' | 'coral' | 'violet' | 'paper';
}

const frames: ReelFrame[] = [
  {
    eyebrow: 'the brief',
    title: 'Make the hard parts invisible.',
    body: 'Start with the things users should never have to think about: auth, roles, state, recovery, and the edge cases hiding behind the happy path.',
    signal: 'intent / clarity',
    metric: '01',
    metricLabel: 'principle',
    accent: 'paper',
  },
  {
    eyebrow: 'system 01 / LMS',
    title: 'Credentials that can prove themselves.',
    body: PORTFOLIO_DATA.projects[0].architecturalDecisions[0].description,
    signal: 'reportlab → qr → verify',
    metric: '13',
    metricLabel: 'Django apps',
    accent: 'lime',
  },
  {
    eyebrow: 'system 02 / MTBS',
    title: 'Two people. One seat. Zero drift.',
    body: PORTFOLIO_DATA.projects[1].architecturalDecisions[0].description,
    signal: 'socket / snapshot / lock',
    metric: '0',
    metricLabel: 'collision windows',
    accent: 'coral',
  },
  {
    eyebrow: 'the throughline',
    title: 'Design is what happens after the race condition.',
    body: 'The interface is the visible end of the system. Build the boundary honestly and the product gets to feel calm, direct, and human.',
    signal: 'ship → observe → refine',
    metric: '2',
    metricLabel: 'production systems',
    accent: 'violet',
  },
];

const nodes = [
  { label: 'client', icon: <Radio /> },
  { label: 'API', icon: <GitBranch /> },
  { label: 'auth', icon: <LockKeyhole /> },
  { label: 'database', icon: <Database /> },
  { label: 'events', icon: <Zap /> },
];

export const SystemReel: React.FC = () => {
  const reelRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const activeFrame = Math.min(frames.length - 1, Math.floor(progress * frames.length));
  const frame = frames[activeFrame];

  useEffect(() => {
    const reel = reelRef.current;
    if (!reel) return undefined;

    let request = 0;
    const update = () => {
      request = 0;
      const rect = reel.getBoundingClientRect();
      const distance = Math.max(1, reel.offsetHeight - window.innerHeight);
      const sectionTop = window.scrollY + rect.top;
      const next = Math.max(0, Math.min(0.999, (window.scrollY - sectionTop) / distance));
      setProgress(next);
      reel.style.setProperty('--reel-progress', String(next));
      reel.style.setProperty('--reel-turn', `${next * 360}deg`);
    };

    const handleScroll = () => {
      if (!request) request = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (request) window.cancelAnimationFrame(request);
    };
  }, []);

  return (
    <section ref={reelRef} id="reel" className={`system-reel system-reel--${frame.accent}`}>
      <div className="system-reel__sticky">
        <div className="system-reel__topline">
          <span><Sparkles className="w-3 h-3" /> scroll / system reel</span>
          <span>anatomy of a build <b>{String(activeFrame + 1).padStart(2, '0')} / {String(frames.length).padStart(2, '0')}</b></span>
        </div>

        <div className="system-reel__layout">
          <div className="system-reel__copy" key={activeFrame}>
            <p className="eyebrow"><span>02A</span> / {frame.eyebrow}</p>
            <h2>{frame.title}</h2>
            <p className="system-reel__body">{frame.body}</p>
            <div className="system-reel__signal"><span className="signal-dot" /> {frame.signal}</div>
            <a href="#projects" onClick={() => sound.playClick()} className="system-reel__link">See the proof <ArrowUpRight className="w-4 h-4" /></a>
          </div>

          <div className="system-map" aria-label="Interactive architecture map">
            <div className="system-map__halo system-map__halo--one" />
            <div className="system-map__halo system-map__halo--two" />
            <div className="system-map__orbit system-map__orbit--one" />
            <div className="system-map__orbit system-map__orbit--two" />
            <div className="system-map__core" key={`${activeFrame}-${frame.metric}`}>
              <span>{frame.metric}</span>
              <small>{frame.metricLabel}</small>
            </div>
            <div className="system-map__line system-map__line--a" />
            <div className="system-map__line system-map__line--b" />
            <div className="system-map__line system-map__line--c" />
            {nodes.map((node, index) => (
              <div key={node.label} className={`system-map__node system-map__node--${index + 1}`}>
                {node.icon}<span>{node.label}</span>
              </div>
            ))}
            <div className="system-map__terminal"><span>&gt;</span> transaction.on_commit()<i /></div>
          </div>

          <div className="system-reel__aside">
            <div className="system-reel__aside-head"><Server className="w-4 h-4" /><span>runtime / live</span><i /></div>
            <div className="system-reel__readout"><strong>{String(Math.round(progress * 100)).padStart(2, '0')}</strong><span>scroll<br />progress</span></div>
            <div className="system-reel__steps">
              {frames.map((item, index) => (
                <span key={item.eyebrow} className={index === activeFrame ? 'is-active' : ''}><b>0{index + 1}</b>{item.eyebrow}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="system-reel__bottomline"><span>scroll to inspect</span><ArrowDown className="w-4 h-4" /><span className="system-reel__bottomline-rule" /></div>
      </div>
    </section>
  );
};
