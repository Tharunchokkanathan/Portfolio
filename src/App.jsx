import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Academics from './components/Academics';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function App() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#060707] text-zinc-100 selection:bg-[#0d281e] selection:text-[#34d399] overflow-x-hidden font-sans">
        <main>
          <Hero />
          <About />
          <Academics />
          <Skills />
          <Projects />
        </main>
        <Contact />
        <Navbar />
      </div>
    </SmoothScroll>
  );
}
