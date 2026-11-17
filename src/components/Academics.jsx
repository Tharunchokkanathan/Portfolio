import React from 'react';
import { GraduationCap, Calendar, Award, Building, BookOpen } from 'lucide-react';
import BlurText from './BlurText';
import { portfolioData } from '../data/portfolioData';

export default function Academics() {
  const { education } = portfolioData.personal;

  return (
    <section id="academics" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 scroll-mt-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <BlurText delay={0} blur={8} distance={20}>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#E97DA6] mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E97DA6] shadow-[0_0_8px_rgba(233,125,166,0.6)]"></span>
              Academic Pathway
            </div>
          </BlurText>
          <BlurText
            as="h2"
            text="Education & Qualifications"
            blur={10}
            distance={35}
            delay={60}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white"
          />
        </div>
      </div>

      {/* Academic Cards Grid */}
      <div className="space-y-6">
        {/* Featured College / Engineering Card */}
        {education[0] && (
          <BlurText
            key={education[0].id}
            delay={140}
            blur={10}
            distance={30}
          >
            <div className="p-7 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden bg-gradient-to-br from-[#0a0a0c] via-[#090709] to-[#2D0A1E]/30 border border-[#B94273]/30 shadow-xl shadow-black/50">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#E97DA6]/8 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1 rounded-full border bg-[#E97DA6]/12 text-[#E97DA6] border-[#E97DA6]/25 font-semibold">
                      {education[0].level}
                    </span>
                    {education[0].period && (
                      <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {education[0].period}
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-mono font-bold text-[#FFC9B9] bg-[#B94273]/20 px-3 py-1 rounded-full border border-[#B94273]/35">
                    {education[0].score}
                  </div>
                </div>

                <h3 className="font-bold text-white mb-2 text-2xl sm:text-3xl">
                  {education[0].degree}
                </h3>

                <div className="text-xs sm:text-sm text-zinc-400 font-medium mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-zinc-200 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-zinc-500" />
                    {education[0].institution}
                  </span>
                  {education[0].affiliation && (
                    <>
                      <span className="text-zinc-600">•</span>
                      <span className="text-[#E97DA6]/90 font-mono text-xs">{education[0].affiliation}</span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                  {education[0].details}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Verification: Verified Academic Record</span>
                <span className="text-[#E97DA6]/85 font-semibold">01</span>
              </div>
            </div>
          </BlurText>
        )}

        {/* Secondary & Higher Secondary Cards - Equal Size 2-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {education.slice(1).map((edu, idx) => (
            <BlurText
              key={edu.id}
              delay={210 + idx * 70}
              blur={10}
              distance={30}
              className="h-full flex flex-col"
            >
              <div className="p-7 sm:p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden h-full bg-[#090b0a] border border-white/5 hover:border-white/15">
                <div className="flex-1 flex flex-col">
                  {/* Level & Period Pill */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-3 py-1 rounded-full border bg-white/[0.04] text-zinc-300 border-white/10">
                        {edu.level}
                      </span>
                      {edu.period && (
                        <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {edu.period}
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-mono font-bold text-[#FFC9B9] bg-[#B94273]/20 px-3 py-1 rounded-full border border-[#B94273]/35">
                      {edu.score}
                    </div>
                  </div>

                  {/* Degree with uniform min-height so both headings align symmetrically */}
                  <h3 className="font-bold text-white mb-2 text-lg sm:text-xl min-h-[3.25rem] flex items-center">
                    {edu.degree}
                  </h3>

                  {/* Institution */}
                  <div className="text-xs sm:text-sm text-zinc-400 font-medium mb-4 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{edu.institution}</span>
                  </div>

                  {/* Details with flex-1 */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6 flex-1">
                    {edu.details}
                  </p>
                </div>

                {/* Bottom Tag */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Verification: Verified Academic Record</span>
                  <span className="text-[#E97DA6]/85 font-semibold">0{idx + 2}</span>
                </div>
              </div>
            </BlurText>
          ))}
        </div>
      </div>
    </section>
  );
}
