import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { ARCH_LAYERS } from '../../constants/data';
import PhoneScreen from './PhoneScreen';

const highlightDartCode = (code) => {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Highlight comments (greyish-green italic)
  html = html.replace(/(\/\/.*)/g, '<span class="text-slate-500/80 dark:text-zinc-500 italic font-sans">$1</span>');

  // Highlight decorators/annotations (like @override) (yellow/amber)
  html = html.replace(/(@\w+)/g, '<span class="text-amber-500 font-medium">$1</span>');

  // Highlight strings (amber/orange-like)
  html = html.replace(/(['"].*?['"])/g, '<span class="text-amber-300 font-mono">$1</span>');

  // Highlight keywords (sky blue)
  const keywords = ['class', 'final', 'abstract', 'implements', 'extends', 'async', 'await', 'return', 'required', 'get', 'set', 'const', 'import'];
  keywords.forEach(kw => {
    html = html.replace(new RegExp(`\\b${kw}\\b`, 'g'), `<span class="text-sky-400 font-bold">${kw}</span>`);
  });

  // Highlight types (emerald/green)
  const types = ['Bloc', 'UseCase', 'MapRepository', 'MapRepositoryImpl', 'FetchMechanicsUseCase', 'MapRemoteDataSource', 'NetworkInfo', 'Future', 'Either', 'Failure', 'List', 'Mechanic', 'LocationParams', 'ServerException', 'ServerFailure', 'CacheFailure'];
  types.forEach(ty => {
    html = html.replace(new RegExp(`\\b${ty}\\b`, 'g'), `<span class="text-emerald-400 font-semibold">${ty}</span>`);
  });

  return <code dangerouslySetInnerHTML={{ __html: html }} />;
};

export default function ProjectModal({
  selectedProject,
  setSelectedProject,
  modalTab,
  setModalTab,
  activeArchLayer,
  setActiveArchLayer,
  projectPlatforms,
  togglePlatform,
  setIsHovering
}) {
  if (!selectedProject) return null;

  const currentPlatform = projectPlatforms[selectedProject.id] || 'iOS';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-50/90 dark:bg-[#04060b]/92 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
        onClick={() => {
          setSelectedProject(null);
          setModalTab('overview');
        }}
      >
        <motion.div
          initial={{ scale: 0.95, y: 25 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 25 }}
          className="border rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative z-10 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Cover Graphic Banner */}
          <div className="h-4 bg-gradient-to-r from-accent via-violet-500 to-rose-400 w-full" />

          <div className="p-6 sm:p-8 space-y-6">
            {/* Header Row */}
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="text-[10px] font-bold font-mono tracking-wider text-accent uppercase leading-none">
                  {selectedProject.category}
                </span>
                <h2 className="text-2xl font-black font-heading leading-tight text-zinc-900 dark:text-white">
                  {selectedProject.title}
                </h2>
              </div>

              <div className="flex items-center space-x-2">
                {/* Sub Modal Tabs */}
                <div className="flex space-x-1 p-1 border rounded-xl text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800 text-slate-500 dark:text-slate-400">
                  <button
                    onClick={() => setModalTab('overview')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      modalTab === 'overview'
                        ? 'bg-accent text-slate-50 dark:text-slate-950'
                        : 'hover:text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setModalTab('architecture')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      modalTab === 'architecture'
                        ? 'bg-accent text-slate-50 dark:text-slate-950'
                        : 'hover:text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    Clean Architecture
                  </button>
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setModalTab('overview');
                  }}
                  className="p-2 border hover:border-slate-300 rounded-xl hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400"
                  onMouseEnter={() => setIsHovering && setIsHovering(true)}
                  onMouseLeave={() => setIsHovering && setIsHovering(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {modalTab === 'overview' ? (
                /* Modal Overview Tab */
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  {/* Left Info Columns */}
                  <div className="md:col-span-8 space-y-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest block">Project Overview</span>
                      <p className="text-[13px]">{selectedProject.detailDesc}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest block">My Role & Contribution</span>
                      <p className="text-[13px] text-slate-600 dark:text-slate-350">{selectedProject.role}</p>
                    </div>

                    {/* Impact Row */}
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs font-semibold flex items-center space-x-2">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{selectedProject.impact}</span>
                    </div>

                    {/* Tech badging */}
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-widest block">Core Technologies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tech.map(t => (
                          <span
                            key={t}
                            className="text-[10px] font-semibold font-mono border text-accent px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-850"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Mockup Showcase */}
                  <div className="md:col-span-4 flex flex-col items-center space-y-3">
                    <div className="flex items-center space-x-1.5 p-1 border rounded-xl bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-850">
                      <button
                        onClick={() => togglePlatform(selectedProject.id)}
                        className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${
                          currentPlatform === 'iOS'
                            ? 'bg-accent/10 text-accent border border-accent/20'
                            : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 border border-transparent'
                        }`}
                      >
                        iOS
                      </button>
                      <button
                        onClick={() => togglePlatform(selectedProject.id)}
                        className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase transition-all cursor-pointer ${
                          currentPlatform === 'Android'
                            ? 'bg-accent/10 text-accent border border-accent/20'
                            : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-500 border border-transparent'
                        }`}
                      >
                        Android
                      </button>
                    </div>

                    <div
                      className={`relative bg-slate-50 dark:bg-[#09090b] shadow-2xl overflow-hidden transition-all duration-350 ${
                        currentPlatform === 'iOS'
                          ? 'border-[4.5px] border-slate-300 dark:border-zinc-800 rounded-[28px] h-[205px] w-[115px]'
                          : 'border-[2.5px] border-slate-300 dark:border-zinc-800 rounded-[18px] h-[205px] w-[115px]'
                      }`}
                    >
                      {/* Camera Notch/Island */}
                      {currentPlatform === 'iOS' ? (
                        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 h-[7px] w-[35px] rounded-full z-25 flex justify-center items-center bg-white dark:bg-zinc-900">
                          <div className="w-1 h-1 rounded-full mr-1 bg-slate-50 dark:bg-[#09090b]" />
                          <div className="w-0.5 h-0.5 rounded-full bg-slate-50 dark:bg-[#09090b]" />
                        </div>
                      ) : (
                        <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full z-25 bg-slate-300 dark:bg-zinc-800" />
                      )}

                      {/* Status bar */}
                      <div className="px-2 pt-2 pb-0.5 flex justify-between items-center text-[5.5px] font-mono select-none text-zinc-600 dark:text-zinc-500">
                        <span>9:41</span>
                        <div className="flex items-center space-x-0.5">
                          <span>LTE</span>
                          <div className="w-2.5 h-1.5 border rounded-[1.5px] border-slate-400 dark:border-zinc-650" />
                        </div>
                      </div>

                      <div className="h-[178px] overflow-hidden">
                        <PhoneScreen type={selectedProject.mockupType} platform={currentPlatform} />
                      </div>

                      {/* Bottom Bar indicators */}
                      {currentPlatform === 'iOS' ? (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 h-[2px] w-[35px] rounded-full z-25 bg-slate-300 dark:bg-zinc-800" />
                      ) : (
                        <div className="absolute bottom-0 left-0 w-full h-[6px] border-t flex justify-around items-center px-4 z-25 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-900">
                          <div className="w-1 h-1 border-l border-t transform -rotate-45 border-slate-300 dark:border-zinc-700" />
                          <div className="w-1.5 h-1.5 border rounded-full border-slate-300 dark:border-zinc-700" />
                          <div className="w-1.5 h-1.5 border rounded-[1.5px] border-slate-300 dark:border-zinc-700" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Modal Architecture Tab */
                <motion.div
                  key="architecture"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-3 gap-2 border-b pb-4 border-slate-300 dark:border-zinc-800">
                    <button
                      onClick={() => setActiveArchLayer('presentation')}
                      className={`w-full py-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer z-10 ${
                        activeArchLayer === 'presentation'
                          ? 'border-accent bg-accent/5'
                          : 'border-slate-300 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-slate-100 dark:bg-zinc-950'
                      }`}
                    >
                      <span className="font-mono text-[9px] font-bold text-accent">LAYER 01</span>
                      <span className="font-bold text-xs mt-0.5 text-zinc-900 dark:text-white">Presentation</span>
                    </button>
                    <button
                      onClick={() => setActiveArchLayer('domain')}
                      className={`w-full py-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer z-10 ${
                        activeArchLayer === 'domain'
                          ? 'border-accent bg-accent/5'
                          : 'border-slate-300 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                      }`}
                    >
                      <span className="font-mono text-[9px] font-bold text-accent">CORE LAYER</span>
                      <span className="font-bold text-xs mt-0.5 text-zinc-900 dark:text-white">Domain</span>
                    </button>
                    <button
                      onClick={() => setActiveArchLayer('data')}
                      className={`w-full py-3 rounded-xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer z-10 ${
                        activeArchLayer === 'data'
                          ? 'border-accent bg-accent/5'
                          : 'border-slate-300 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 bg-slate-100 dark:bg-zinc-950'
                      }`}
                    >
                      <span className="font-mono text-[9px] font-bold text-accent">LAYER 03</span>
                      <span className="font-bold text-xs mt-0.5 text-zinc-900 dark:text-white">Data</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-bold font-heading text-zinc-900 dark:text-white">
                      {ARCH_LAYERS[activeArchLayer].title}
                    </h4>
                    <p className="leading-normal text-[12px] text-slate-500 dark:text-slate-400">
                      {ARCH_LAYERS[activeArchLayer].desc}
                    </p>
                  </div>

                  <div className="rounded-xl overflow-hidden border p-4 font-mono text-[11px] leading-relaxed relative bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800">
                    <div className="flex justify-between items-center mb-3 pb-2 border-b text-[10px] text-slate-500 dark:text-slate-400 border-slate-300 dark:border-zinc-800">
                      <span>{activeArchLayer.toUpperCase()}_LAYER.dart</span>
                      <span className="text-accent">Flutter // Clean Architecture</span>
                    </div>
                    <pre className="overflow-x-auto scrollbar-thin">
                      {highlightDartCode(ARCH_LAYERS[activeArchLayer].code)}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
