import React from 'react';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { ArchitectureAudit } from './components/sections/ArchitectureAudit';
import { Skills } from './components/sections/Skills';
import { CareerArc } from './components/sections/CareerArc';
import { TerminalContact } from './components/sections/TerminalContact';
import { Footer } from './components/ui/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { InteractiveStage } from './components/ui/InteractiveStage';
import { SectionHUD } from './components/ui/SectionHUD';
import { SystemReel } from './components/sections/SystemReel';

export function App() {
  return (
    <div className="site-shell relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Glassmorphic Navigation Bar */}
      <Navbar />
      <ScrollProgress />
      <InteractiveStage />
      <SectionHUD />

      {/* Main Experience Layout */}
      <main className="relative">
        <Hero />
        <SystemReel />
        <Projects />
        <ArchitectureAudit />
        <Skills />
        <CareerArc />
        <TerminalContact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
