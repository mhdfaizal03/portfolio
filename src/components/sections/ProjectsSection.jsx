import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code2, Award } from 'lucide-react';
import { PROJECTS_DATA, MINI_PROJECTS } from '../../constants/data';
import SectionHeading from '../ui/SectionHeading';
import PhoneScreen from '../ui/PhoneScreen';

export default function ProjectsSection({
  projectFilter,
  setProjectFilter,
  projectPlatforms,
  togglePlatform,
  setSelectedProject,
  setIsHovering
}) {
  return (
    <section id="projects" className="py-24 border-t relative bg-slate-50/40 dark:bg-[#09090b]/40 border-slate-300 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="space-y-2">
            <h4 className="text-accent font-mono font-bold tracking-widest text-xs uppercase">04 // PRODUCTION</h4>
            <h2 className="text-3xl sm:text-4xl font-black font-heading text-zinc-900 dark:text-white">Featured Projects</h2>
          </div>

          {/* Dynamic Filter Buttons */}
          <div className="flex flex-wrap gap-1.5 mt-4 md:mt-0 p-1 border rounded-xl text-xs font-semibold bg-slate-100 dark:bg-zinc-950 border-slate-300/80 dark:border-zinc-800/80 text-slate-500 dark:text-slate-400">
            {['All', ...new Set(PROJECTS_DATA.map(p => p.category))].map(filter => (
              <button
                key={filter}
                onClick={() => setProjectFilter(filter)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  projectFilter === filter
                    ? 'bg-accent text-slate-50 dark:text-slate-950 font-bold'
                    : 'hover:text-slate-800 dark:text-slate-200'
                }`}
                onMouseEnter={() => setIsHovering && setIsHovering(true)}
                onMouseLeave={() => setIsHovering && setIsHovering(false)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS_DATA
            .filter(p => projectFilter === 'All' || p.category === projectFilter)
            .map((proj) => {
              const availablePlatforms = proj.platforms || ['iOS', 'Android'];
              const currentPlatform = projectPlatforms[proj.id] || availablePlatforms[0];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  key={proj.id}
                  className="group premium-card rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 cursor-pointer"
                  onClick={() => setSelectedProject(proj)}
                  onMouseEnter={() => setIsHovering && setIsHovering(true)}
                  onMouseLeave={() => setIsHovering && setIsHovering(false)}
                >
                  {/* Left Specs */}
                  <div className="flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold font-mono tracking-wider text-accent uppercase">{proj.category}</span>
                        <div className="flex items-center space-x-2" onClick={(e) => e.stopPropagation()}>
                          {/* Device platform switcher buttons */}
                          {availablePlatforms.map(plat => (
                            <button
                              key={plat}
                              onClick={() => togglePlatform(proj.id)}
                              className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${
                                currentPlatform === plat
                                  ? 'bg-accent/10 text-accent border border-accent/20'
                                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 border border-transparent'
                              }`}
                            >
                              {plat}
                            </button>
                          ))}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold group-hover:text-accent transition-colors font-heading leading-tight text-zinc-900 dark:text-white">
                        {proj.title}
                      </h3>
                      <p className="text-xs leading-relaxed line-clamp-3">{proj.desc}</p>
                    </div>

                    <div className="space-y-4">
                      {/* Specs badges */}
                      <div className="flex flex-wrap gap-1.5">
                        {proj.tech.slice(0, 3).map(t => (
                          <span key={t} className="text-[9px] font-bold font-mono px-2 py-0.5 rounded text-accent border bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-850">
                            {t}
                          </span>
                        ))}
                        {proj.tech.length > 3 && (
                          <span className="text-[9px] font-bold font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-950 text-slate-500 dark:text-slate-400">
                            +{proj.tech.length - 3} more
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] text-accent font-bold font-mono inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform">
                        <span>Details & Architecture</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Right CSS Phone/Web Mockup (Adaptive Platform Bezels) */}
                  <div className="flex-shrink-0 flex justify-center items-center">
                    {currentPlatform === 'Web' ? (
                      /* Web Desktop Browser Mockup Frame */
                      <div className="border-[3.5px] border-slate-300 dark:border-zinc-800 rounded-[18px] h-[205px] w-[140px] bg-slate-50 dark:bg-[#09090b] shadow-2xl overflow-hidden group-hover:border-accent/30 transition-all duration-350 flex flex-col">
                        <div className="bg-slate-200 dark:bg-zinc-850 px-2 py-1.5 flex items-center space-x-1 border-b border-slate-300 dark:border-zinc-800 flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span className="ml-1 text-[5.5px] font-mono text-zinc-500 truncate">{proj.live || 'https://behold.co.in'}</span>
                        </div>
                        <div className="flex-1 overflow-hidden">
                          <PhoneScreen type={proj.mockupType} platform={currentPlatform} />
                        </div>
                      </div>
                    ) : (
                      /* Mobile Phone Mockup Frame */
                      <div
                        className={`relative bg-slate-50 dark:bg-[#09090b] shadow-2xl overflow-hidden group-hover:border-accent/30 transition-all duration-350 ${
                          currentPlatform === 'iOS'
                            ? 'border-[5px] border-slate-300 dark:border-zinc-800 rounded-[24px] h-[205px] w-[115px]'
                            : 'border-[3px] border-slate-300 dark:border-zinc-800 rounded-[18px] h-[205px] w-[115px]'
                        }`}
                      >
                        {/* Camera Notch/Island depends on platform */}
                        {currentPlatform === 'iOS' ? (
                          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 h-[7px] w-[35px] rounded-full z-25 flex justify-center items-center bg-slate-200 dark:bg-zinc-850">
                            <div className="w-1.5 h-1.5 rounded-full mr-1 bg-slate-100 dark:bg-zinc-950" />
                            <div className="w-0.5 h-0.5 rounded-full bg-slate-100 dark:bg-zinc-950" />
                          </div>
                        ) : (
                          <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full z-25 bg-slate-200 dark:bg-zinc-800" />
                        )}

                        {/* Status bar */}
                        <div className="px-2 pt-2 pb-0.5 flex justify-between items-center text-[5.5px] font-mono select-none text-zinc-600 dark:text-zinc-500">
                          <span>9:41</span>
                          <div className="flex items-center space-x-0.5">
                            <span>LTE</span>
                            <div className="w-2.5 h-1.5 border rounded-[1.5px] border-slate-400 dark:border-zinc-650" />
                          </div>
                        </div>

                        {/* Render custom screen preview contents */}
                        <div className="h-[178px] overflow-hidden">
                          <PhoneScreen type={proj.mockupType} platform={currentPlatform} />
                        </div>

                        {/* Bottom Bar indicators */}
                        {currentPlatform === 'iOS' ? (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] w-[35px] rounded-full z-25 bg-slate-200 dark:bg-zinc-800" />
                        ) : (
                          <div className="absolute bottom-0 left-0 w-full h-[6px] border-t flex justify-around items-center px-4 z-25 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-900">
                            <div className="w-1 h-1 border-l border-t transform -rotate-45 border-slate-300 dark:border-zinc-700" />
                            <div className="w-1.5 h-1.5 border rounded-full border-slate-300 dark:border-zinc-700" />
                            <div className="w-1.5 h-1.5 border rounded-[1.5px] border-slate-300 dark:border-zinc-700" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Mini Projects Grid */}
        <div className="mt-20 pt-16 border-t border-slate-300 dark:border-zinc-850">
          <h3 className="text-xl font-bold font-heading mb-8 flex items-center space-x-2 text-zinc-900 dark:text-white">
            <Code2 className="w-5 h-5 text-accent" />
            <span>Mini Utility Projects</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {MINI_PROJECTS.map((mini, index) => (
              <div
                key={index}
                className="p-5 premium-card rounded-3xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
                onMouseEnter={() => setIsHovering && setIsHovering(true)}
                onMouseLeave={() => setIsHovering && setIsHovering(false)}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono text-accent font-semibold">{mini.tech}</span>
                    <Award className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  </div>
                  <h4 className="text-sm font-bold mb-1.5 text-zinc-900 dark:text-white">{mini.name}</h4>
                  <p className="text-xs leading-normal text-slate-500 dark:text-slate-400">{mini.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
