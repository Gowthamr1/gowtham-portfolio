import React, { useEffect, useState } from 'react';

const sections = [
  { id: 'hero', label: 'intro' },
  { id: 'reel', label: 'reel' },
  { id: 'projects', label: 'systems' },
  { id: 'architecture', label: 'audit' },
  { id: 'skills', label: 'stack' },
  { id: 'journey', label: 'journey' },
  { id: 'terminal', label: 'contact' },
];

export const SectionHUD: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveSection(id);
      }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
      observer.observe(element);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const activeIndex = sections.findIndex(({ id }) => id === activeSection);

  return (
    <nav className="section-hud" aria-label="Section navigation">
      <span className="section-hud__count">0{Math.max(activeIndex + 1, 1)} / 0{sections.length}</span>
      <div className="section-hud__rail">
        {sections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-label={`Go to ${section.label}`}
            aria-current={activeSection === section.id ? 'step' : undefined}
            className={activeSection === section.id ? 'is-active' : ''}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{section.label}</b>
          </a>
        ))}
      </div>
      <span className="section-hud__caption">GOWTHAM R / 2026</span>
    </nav>
  );
};
