import React from 'react';
import { Sparkles, GraduationCap } from 'lucide-react';
import BlurText from './BlurText';
import { portfolioData } from '../data/portfolioData';

export default function About() {
  const { personal } = portfolioData;

  const highlights = [
    {
      title: 'Google Developer Groups (GDG)',
      badge: 'Community',
      desc: 'Active attendee participating in regional Google developer summits, hands-on workshops, and technical architecture deep-dives.',
    },
    {
      title: 'DevFest & Tech Summits',
      badge: 'Conferences',
      desc: 'Regularly travels for tech conferences, AI/ML hackathons, and design conventions across Chennai and the broader developer ecosystem.',
    },
    {
      title: 'AI/ML & Product Engineering',
      badge: 'Core Focus',
      desc: 'Dedicated to bridging intelligent machine learning models with accessible, fluid digital interfaces and thoughtful product management.',
    },
  ];

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 scroll-mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Bio & Philosophy */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            About Me
          </div>

          {/* Name & Academic Identity */}
          <div className="mb-6">
            <BlurText
              as="h2"
              text={personal.name}
              blur={12}
              distance={35}
              delay={40}
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-2"
            />
            <BlurText
              text={personal.title}
              blur={10}
              distance={25}
              delay={80}
              className="text-base sm:text-lg font-semibold text-emerald-400 mb-2"
            />
            <BlurText delay={120} blur={8} distance={20}>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-zinc-400 font-mono">
                <span className="text-zinc-300 font-medium">{personal.institution}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-400">{personal.affiliation}</span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-500">{personal.batch}</span>
              </div>
            </BlurText>
          </div>

          <div className="h-px w-full bg-white/5 mb-6" />

          <BlurText
            as="h3"
            text="Rooted in AI & ML. Driven by intuitive UI/UX design & software engineering."
            blur={10}
            distance={35}
            delay={140}
            className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-4 leading-snug"
          />

          <div className="space-y-4 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            {personal.aboutParagraphs.map((para, i) => (
              <BlurText
                key={i}
                as="p"
                text={para}
                blur={8}
                distance={25}
                delay={180 + i * 50}
                className="text-sm sm:text-base text-zinc-400 leading-relaxed font-normal"
              />
            ))}
          </div>
        </div>

        {/* Right Column: Community & Technical Involvements */}
        <div className="lg:col-span-6 space-y-4">
          <BlurText delay={80} blur={8} distance={20}>
            <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Community Involvements & Travel
            </div>
          </BlurText>

          {highlights.map((item, idx) => (
            <BlurText key={idx} delay={120 + idx * 70} blur={10} distance={30}>
              <div className="p-6 sm:p-7 rounded-2xl bg-[#090b0a] border border-white/5 hover:border-emerald-500/25 transition-all duration-300 group">
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {item.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </BlurText>
          ))}
        </div>
      </div>
    </section>
  );
}
