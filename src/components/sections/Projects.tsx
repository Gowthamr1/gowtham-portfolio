import React, { useState } from 'react';
import { ArrowUpRight, Check, ExternalLink, Layers3, QrCode, Radio } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../data/portfolioData';
import { InteractiveSeatMap } from '../canvas/InteractiveSeatMap';
import { CertificateModal } from '../ui/CertificateModal';
import { sound } from '../../utils/audio';
import { GithubIcon } from '../ui/Icons';

type ProjectId = 'lms' | 'mtbs' | 'travel';

const accentById: Record<ProjectId, { className: string; label: string; soft: string }> = {
  lms: { className: 'case-study--lime', label: 'learning systems', soft: 'self-verifying credentials' },
  mtbs: { className: 'case-study--coral', label: 'real-time systems', soft: 'zero collision booking' },
  travel: { className: 'case-study--violet', label: 'booking systems', soft: 'multi-service state' },
};

const Stack: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="case-stack">
    {items.map((item) => <span key={item}>{item}</span>)}
  </div>
);

const LearningVisual: React.FC = () => (
  <div className="case-visual case-visual--learning">
    <div className="visual-window-bar"><span><i /><i /><i /></span><b>student / course-player</b><em>● live</em></div>
    <div className="learning-visual__body">
      <div className="learning-visual__nav"><span className="visual-logo">L</span><span>My learning</span><span>Certificates</span><span>Progress</span></div>
      <div className="learning-visual__title"><div><small>CONTINUE LEARNING</small><h4>Advanced Django APIs</h4><p>Module 08 / Transactions & concurrency</p></div><strong>72%</strong></div>
      <div className="learning-progress"><span /></div>
      <div className="learning-visual__cards"><div><span>01</span><b>REST foundations</b><small>Complete</small></div><div className="is-active"><span>08</span><b>Transactions</b><small>In progress</small></div><div><span>09</span><b>WebSockets</b><small>Locked</small></div></div>
    </div>
    <div className="visual-caption"><span>role-aware portals</span><span>ReportLab + QR verification</span></div>
  </div>
);

const CinemaVisual: React.FC = () => (
  <div className="case-visual case-visual--cinema">
    <div className="visual-window-bar"><span><i /><i /><i /></span><b>showtime / 104</b><em><Radio className="w-3 h-3" /> synced</em></div>
    <div className="cinema-visual__body">
      <div className="cinema-visual__top"><div><small>REAL-TIME SEAT STATE</small><h4>Screen 04 / 19:30</h4></div><span className="visual-badge"><Radio className="w-3 h-3" /> WebSocket open</span></div>
      <div className="cinema-screen">projection screen</div>
      <div className="mini-seats">{Array.from({ length: 24 }, (_, index) => <span key={index} className={index === 5 || index === 6 ? 'is-booked' : index === 12 ? 'is-held' : ''}>{String.fromCharCode(65 + Math.floor(index / 6))}{(index % 6) + 1}</span>)}</div>
      <div className="cinema-log"><span>&gt; seat D1 acquired</span><span className="is-good">&gt; broadcast full snapshot</span><span>&gt; transaction.on_commit()</span></div>
    </div>
  </div>
);

const TravelVisual: React.FC = () => (
  <div className="case-visual case-visual--travel">
    <div className="visual-window-bar"><span><i /><i /><i /></span><b>itinerary / 00291</b><em>booking flow</em></div>
    <div className="travel-visual__body">
      <div className="travel-visual__route"><div><small>DEPART</small><strong>BLR</strong><span>Bengaluru</span></div><div className="route-line"><span>✦</span></div><div><small>ARRIVE</small><strong>DXB</strong><span>Dubai</span></div></div>
      <div className="travel-details"><span><small>FLIGHT</small>AI 984</span><span><small>DATE</small>18 MAY 2026</span><span><small>STATUS</small><b>CONFIRMED</b></span></div>
      <div className="travel-state"><span className="is-done"><Check /> initiated</span><span className="is-done"><Check /> payment held</span><span><span className="travel-pulse" /> confirmed</span></div>
    </div>
  </div>
);

const VisualForProject: React.FC<{ id: ProjectId }> = ({ id }) => {
  if (id === 'lms') return <LearningVisual />;
  if (id === 'mtbs') return <CinemaVisual />;
  return <TravelVisual />;
};

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectId>('lms');
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const project = PORTFOLIO_DATA.projects.find((item) => item.id === activeTab)!;
  const accent = accentById[activeTab];

  return (
    <section id="projects" className="case-studies relative py-28">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-14">
        <div className="section-intro section-intro--left">
          <div>
            <p className="eyebrow"><span>02</span> / selected systems</p>
            <h2>Small interfaces.<br /><em>Serious</em> machinery.</h2>
          </div>
          <p className="section-intro__copy">I like the part of the product that has to be true even when the network is slow, two users click at once, or a certificate needs to prove itself.</p>
        </div>

        <div className="case-workbench">
          <aside className="project-index" aria-label="Project index">
            <div className="project-index__heading"><span>SELECTED WORK</span><small>{PORTFOLIO_DATA.projects.length} SYSTEMS</small></div>
            <div className="project-index__items" role="tablist" aria-label="Selected projects">
              {PORTFOLIO_DATA.projects.map((item, index) => {
                const itemAccent = accentById[item.id as ProjectId];
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="selected-project-detail"
                    type="button"
                    onClick={() => { sound.playClick(); setActiveTab(item.id as ProjectId); }}
                    className={`project-index__item ${isActive ? 'is-active' : ''} ${itemAccent.className}`}
                  >
                    <span className="project-index__number">0{index + 1}</span>
                    <span className="project-index__copy"><b>{item.title}</b><small>{item.subtitle}</small><em>{item.liveUrl ? 'LIVE DEMO' : 'CASE STUDY'}</em></span>
                    <span className="project-index__arrow"><ArrowUpRight className="w-4 h-4" /></span>
                    {isActive && <span className="project-index__active-line" />}
                  </button>
                );
              })}
            </div>
            <div className="project-index__hint"><span className="signal-dot" /> choose a system to inspect</div>
          </aside>

          <div key={activeTab} id="selected-project-detail" className={`case-study ${accent.className}`}>
          <div className="case-study__header">
            <div><p className="case-study__label"><span>{project.plate}</span> / {accent.label} <i /> {project.status}</p><h3>{project.title}</h3><p>{project.subtitle}</p></div>
            <div className="case-study__links">
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={() => sound.playClick()}>launch live <ExternalLink className="w-4 h-4" /></a>}
              {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={() => sound.playClick()}>source <GithubIcon className="w-4 h-4" /></a>}
              {activeTab === 'lms' && <button onClick={() => { sound.playSuccess(); setIsCertModalOpen(true); }}><QrCode className="w-4 h-4" /> certificate</button>}
            </div>
          </div>

          <div className="case-study__grid">
            <div className="case-study__visual-column"><VisualForProject id={activeTab} />{activeTab === 'mtbs' && <div className="case-study__demo"><div className="case-study__demo-heading"><span><Radio className="w-4 h-4" /> interact with the proof</span><button onClick={() => document.getElementById('seat-simulator')?.scrollIntoView({ behavior: 'smooth' })}>open simulator <ArrowUpRight className="w-3 h-3" /></button></div><p>Click an available seat to acquire a temporary hold. The UI mirrors the engine's full-snapshot broadcast model.</p></div>}</div>
            <div className="case-study__notes">
              <div className="case-note"><small>THE PROBLEM</small><p>{project.problem}</p></div>
              <div className="case-note"><small>THE MOVE</small><p>{project.scope}</p></div>
              <div className="case-note case-note--signal"><small>THE SIGNAL</small><strong>{accent.soft}</strong><span>Built by one developer / shipped as a system</span></div>
            </div>
          </div>

          <div className="case-study__footer">
            <div><small>CLIENT</small><Stack items={project.clientStack.slice(0, 5)} /></div>
            <div><small>SERVER</small><Stack items={project.serverStack.slice(0, 5)} /></div>
            <div className="case-study__db"><small>DATA / DELIVERY</small><p>{project.database}</p><span>{project.deployment}</span></div>
          </div>

            <div className="decision-strip"><span className="decision-strip__title"><Layers3 className="w-4 h-4" /> one decision worth zooming in on</span>{project.architecturalDecisions.slice(0, 2).map((decision) => <div className="decision-strip__item" key={decision.title}><Check className="w-3.5 h-3.5" /><span>{decision.title}</span></div>)}</div>
          </div>
        </div>

        {activeTab === 'mtbs' && <div id="seat-simulator" className="case-simulator"><div className="section-intro section-intro--compact"><div><p className="eyebrow"><span>03</span> / live proof</p><h2>See the lock<br /><em>hold.</em></h2></div><p className="section-intro__copy">A small interactive slice of the Cinema Booking Engine. The important bit is not the seat grid; it is the state staying honest across a race.</p></div><InteractiveSeatMap /></div>}
      </div>
      <CertificateModal isOpen={isCertModalOpen} onClose={() => setIsCertModalOpen(false)} />
    </section>
  );
};
