import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, X, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import BlurText from './BlurText';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = portfolioData.projects;

  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t border-white/5 scroll-mt-6">
      <div id="work" className="absolute -top-10" />
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <BlurText delay={0} blur={8} distance={20}>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Featured Portfolio
            </div>
          </BlurText>
          <BlurText
            as="h2"
            text="Projects & Case Studies"
            blur={10}
            distance={35}
            delay={60}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white"
          />
        </div>

        {/* Filter Pills (Black, White, Grey) */}
        <BlurText delay={120} blur={8} distance={20}>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </BlurText>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.05 }}
            className="group relative rounded-3xl p-7 sm:p-9 bg-[#0b0c0b] border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/70 overflow-hidden"
          >
            {/* Top metadata */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-6">
                <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/5 text-zinc-300">
                  {project.category}
                </span>
                <span className="text-zinc-500">{project.year}</span>
              </div>

              {/* Title & Tagline */}
              <h3 
                onClick={() => setSelectedProject(project)}
                className="text-2xl sm:text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {project.title}
              </h3>
              <p className="text-sm font-medium text-zinc-300 mb-4">
                {project.headline}
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6">
                {project.description}
              </p>
            </div>

            {/* Bottom Section */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/[0.03] text-zinc-400 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action row with direct Links & Details */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-emerald-500 hover:text-black text-zinc-300 font-medium transition-all active:scale-95"
                      title="Open Live Preview"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.12] text-zinc-300 hover:text-white font-medium transition-all active:scale-95"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 font-medium text-emerald-400 hover:underline cursor-pointer"
                >
                  <span>Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Subtle glow highlight on hover in premium dark green */}
            <div
              className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity pointer-events-none bg-emerald-500"
            />
          </motion.div>
        ))}
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0a0c0b] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                <span>{selectedProject.category}</span>
                <span>•</span>
                <span className="text-zinc-500">{selectedProject.year}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                {selectedProject.title}
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 font-medium mb-6">
                {selectedProject.headline}
              </p>

              {/* Direct Project Links inside Modal */}
              <div className="flex flex-wrap gap-3 mb-8">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all active:scale-95 shadow-md"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] text-white font-medium text-xs sm:text-sm transition-all active:scale-95"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>View Source on GitHub</span>
                  </a>
                )}
              </div>

              {/* Metrics Highlights */}
              {selectedProject.stats && (
                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5 mb-8">
                  {selectedProject.stats.map((stat, i) => (
                    <div key={i} className="text-center sm:text-left">
                      <span className="block text-[11px] font-mono text-zinc-500 uppercase">
                        {stat.label}
                      </span>
                      <span className="text-base sm:text-xl font-bold text-white">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Overview & Highlights */}
              <div className="space-y-6 text-sm text-zinc-300 leading-relaxed mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">
                    Executive Summary
                  </h4>
                  <p>{selectedProject.description}</p>
                </div>

                {selectedProject.highlights && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
                      Technical & Design Highlights
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedProject.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.05] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-xs hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
