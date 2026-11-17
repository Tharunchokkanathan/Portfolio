import React from 'react';
import { Palette, Layout, Cpu } from 'lucide-react';
import BlurText from './BlurText';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  Layout: Layout,
  Cpu: Cpu,
  Palette: Palette,
};

export default function Skills() {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 scroll-mt-6">
      <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
        <BlurText delay={0} blur={8} distance={20}>
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E97DA6] mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E97DA6] shadow-[0_0_8px_rgba(233,125,166,0.6)]"></span>
            Capabilities
          </div>
        </BlurText>
        <BlurText
          as="h2"
          text="Core Expertise & Stack"
          blur={10}
          distance={35}
          delay={60}
          className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 justify-center"
        />
        <BlurText
          as="p"
          text="Core programming languages, web & database technologies, and design tools honed through coursework and real-world projects."
          blur={8}
          distance={25}
          delay={120}
          className="text-sm sm:text-base text-zinc-400 max-w-xl text-center justify-center"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Layout;
          return (
            <BlurText key={cat.category} delay={140 + i * 80} blur={10} distance={30}>
              <div
                className="p-7 sm:p-8 rounded-3xl bg-[#090b0a] border border-white/5 hover:border-[#B94273]/30 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#2D0A1E]/70 border border-[#B94273]/35 flex items-center justify-center text-[#E97DA6] mb-6 shadow-[0_0_15px_rgba(185,66,115,0.15)]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {cat.category}
                  </h3>
                  <p className="text-xs text-zinc-400 mb-6">
                    {cat.description}
                  </p>
                  <ul className="space-y-3">
                    {cat.items.map((skill) => (
                      <li
                        key={skill}
                        className="text-xs sm:text-sm text-zinc-300 flex items-center gap-2.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E97DA6]/50 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 text-[11px] font-mono text-zinc-500">
                  Pillar 0{i + 1}
                </div>
              </div>
            </BlurText>
          );
        })}
      </div>
    </section>
  );
}
