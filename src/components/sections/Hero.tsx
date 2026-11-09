import React from 'react';
import { ArrowDown, ArrowUpRight, Activity, Command, ShieldCheck, Sparkles, Wifi } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { sound } from '../../utils/audio';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';

const signalSeats = [
  ['A1', 'free'], ['A2', 'free'], ['A3', 'booked'], ['A4', 'booked'], ['A5', 'free'], ['A6', 'free'],
  ['B1', 'free'], ['B2', 'hold'], ['B3', 'free'], ['B4', 'free'], ['B5', 'hold'], ['B6', 'free'],
  ['C1', 'free'], ['C2', 'free'], ['C3', 'free'], ['C4', 'free'], ['C5', 'free'], ['C6', 'free'],
] as const;

export const Hero: React.FC = () => {
  return (
    <section id="hero" className="hero-section relative min-h-screen overflow-hidden pt-28 pb-10">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow hero-glow--one" aria-hidden="true" />
      <div className="hero-glow hero-glow--two" aria-hidden="true" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="hero-topline">
          <span className="hero-kicker"><Sparkles className="w-3 h-3" /> Independent full-stack engineer</span>
          <span className="hero-location">Bangalore / IST <span className="signal-dot" /> available for the right build</span>
        </div>

        <div className="hero-layout">
          <div className="hero-copy">
            <p className="eyebrow"><span>01</span> / systems that survive contact with reality</p>
            <h1>
              Systems<br />
              <span className="hero-italic">that feel</span> <span className="hero-accent">simple.</span>
            </h1>
            <p className="hero-intro">
              {PORTFOLIO_DATA.profile.philosophy.headline}
            </p>
            <div className="hero-actions">
              <a href="#projects" onClick={() => sound.playClick()} className="button button--primary">
                See the work <ArrowDown className="w-4 h-4" />
              </a>
              <a href="#terminal" onClick={() => sound.playClick()} className="button button--quiet">
                Start a conversation <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="hero-socials">
              <a href={PORTFOLIO_DATA.profile.github} target="_blank" rel="noopener noreferrer" onClick={() => sound.playClick()}>
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
              <a href={PORTFOLIO_DATA.profile.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => sound.playClick()}>
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
              <span className="hero-socials__note">MCA / builder / systems-minded</span>
            </div>
          </div>

          <div className="signal-wrap" aria-label="Live system signal preview">
            <div className="signal-card">
              <div className="signal-card__top">
                <div className="window-dots"><i /><i /><i /></div>
                <span><Wifi className="w-3 h-3" /> live / mtbs.engine</span>
                <span className="signal-card__status"><span className="signal-dot" /> stable</span>
              </div>
              <div className="signal-card__body">
                <div className="signal-card__heading">
                  <div>
                    <p className="eyebrow eyebrow--small">real-time seat state</p>
                    <h2>Showtime / 104</h2>
                  </div>
                  <Activity className="signal-activity" />
                </div>
                <div className="signal-screen"><span /> projection screen</div>
                <div className="signal-seats">
                  {signalSeats.map(([id, state]) => <span key={id} className={`signal-seat signal-seat--${state}`} title={`${id}: ${state}`}>{id}</span>)}
                </div>
                <div className="signal-card__legend">
                  <span><i className="signal-seat--free" /> available</span>
                  <span><i className="signal-seat--hold" /> hold</span>
                  <span><i className="signal-seat--booked" /> booked</span>
                </div>
              </div>
              <div className="signal-card__footer">
                <span><Command className="w-3 h-3" /> transaction.on_commit()</span>
                <span className="signal-footer-ok"><ShieldCheck className="w-3 h-3" /> synced</span>
              </div>
            </div>
            <div className="signal-float signal-float--top"><span>0</span> collision windows</div>
            <div className="signal-float signal-float--bottom"><span>13</span> Django apps / 2 production systems</div>
          </div>
        </div>

        <div className="hero-metrics">
          {PORTFOLIO_DATA.profile.metrics.map((metric, idx) => (
            <div key={idx} className="hero-metric">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.highlight}</small>
            </div>
          ))}
        </div>

        <div className="hero-scroll-cue"><span>keep going</span><span className="hero-scroll-line" /></div>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <span>BACKEND LOGIC</span><b>✳</b><span>FRONTEND CRAFT</span><b>✳</b><span>REAL-TIME STATE</span><b>✳</b><span>HONEST ARCHITECTURE</span><b>✳</b>
      </div>
    </section>
  );
};
