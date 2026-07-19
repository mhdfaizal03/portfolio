import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { EXPERIENCES_DATA } from '../../constants/data';
import SectionHeading from '../ui/SectionHeading';

export default function ExperienceSection({ activeExp, setActiveExp, setIsHovering }) {
  return (
    <section id="experience" className="py-24 max-w-4xl mx-auto px-6 z-10 relative">
      <SectionHeading
        subtitle="03 // CHRONICLE"
        title="Professional History"
        description="Practical development background compiling codebase and publishing apps to app stores."
        align="center"
      />

      {/* Dynamic Experience Timeline switcher */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Switcher Tabs */}
        <div className="md:col-span-4 flex md:flex-col space-x-2 md:space-x-0 md:space-y-2 overflow-x-auto pb-4 md:pb-0 scrollbar-none">
          {EXPERIENCES_DATA.map((exp, idx) => (
            <button
              key={idx}
              onClick={() => setActiveExp(idx)}
              className={`text-left px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-normal sm:whitespace-nowrap ${
                activeExp === idx
                  ? 'bg-accent/10 border-accent/30 text-accent font-black shadow-sm'
                  : 'bg-transparent border-slate-300 dark:border-zinc-800 text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white dark:hover:bg-zinc-900/30'
              }`}
              onMouseEnter={() => setIsHovering && setIsHovering(true)}
              onMouseLeave={() => setIsHovering && setIsHovering(false)}
            >
              {exp.company}
            </button>
          ))}
        </div>

        {/* Details Column */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="border rounded-2xl p-6 sm:p-8 hover:border-slate-300 transition-all bg-white/60 dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-800"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 mb-5 border-slate-300 dark:border-zinc-800">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold leading-tight text-zinc-900 dark:text-white">
                    {EXPERIENCES_DATA[activeExp].role}
                  </h3>
                  <p className="text-accent text-xs font-mono font-semibold mt-1">
                    {EXPERIENCES_DATA[activeExp].company}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right text-[11px] font-mono font-semibold text-slate-500 dark:text-slate-400">
                  <span className="block">{EXPERIENCES_DATA[activeExp].period}</span>
                  <span className="block text-slate-500 dark:text-slate-400">
                    {EXPERIENCES_DATA[activeExp].location}
                  </span>
                </div>
              </div>

              {/* Bullets */}
              <ul className="space-y-3.5 mb-6 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {EXPERIENCES_DATA[activeExp].bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Contribution Impact Alert */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl text-xs font-semibold mb-6 flex items-start space-x-2">
                <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-emerald-300">Key Impact Metric:</span>
                  <span>{EXPERIENCES_DATA[activeExp].impact}</span>
                </div>
              </div>

              {/* Technology Badges */}
              <div className="flex flex-wrap gap-1.5">
                {EXPERIENCES_DATA[activeExp].tech.map(t => (
                  <span
                    key={t}
                    className="text-[10px] font-semibold font-mono border px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-850 text-slate-500 dark:text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
