import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { Send, FileText, Sparkles, CheckCircle2, Phone, Mail } from 'lucide-react';
import meImg from '../../assets/me.png';
import { STATS_DATA } from '../../constants/data';

export default function HeroAboutSection({
  aboutTab,
  setAboutTab,
  isPortraitLoaded,
  setIsPortraitLoaded,
  setShowResume,
  setIsHovering
}) {
  return (
    <section id="about" className="relative pt-36 pb-20 px-6 z-10 overflow-hidden min-h-[90dvh] flex items-center">
      {/* Background Image with Opacity */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={meImg}
          alt="Hero Background"
          className="w-full h-full object-cover object-top origin-top scale-[1.15] opacity-30 dark:opacity-15 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-slate-50 dark:via-[#09090b]/80 dark:to-[#09090b]" />
      </div>

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start space-y-6 order-last lg:order-first">
          {/* Profile Label */}
          <div className="space-y-1">
            <span className="text-accent font-mono font-bold tracking-widest text-xs uppercase block">
              01 // PROFILE
            </span>
          </div>

          {/* Hiring Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-450 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-450 animate-pulse" />
            <span>Status: Active for Hire</span>
          </motion.div>

          {/* Title & Introduction */}
          <div className="space-y-2">
            <h4 className="font-mono font-bold tracking-widest text-sm uppercase text-slate-500 dark:text-slate-400">
              Muhammed Faizal M
            </h4>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight font-heading text-zinc-900 dark:text-white">
              Building fluid <br />
              <span className="bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent">
                Mobile Experiences
              </span>
            </h1>

            <h3 className="text-xl sm:text-2xl font-bold font-heading min-h-[60px] sm:min-h-[40px] flex items-center justify-center lg:justify-start text-slate-500 dark:text-slate-400">
              Specializing in{' '}
              <span className="text-accent ml-2">
                <Typewriter
                  words={[
                    'Flutter Applications',
                    'Clean Architecture Design',
                    'Responsive UI/UX solutions'
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  cursorColor="var(--accent-color)"
                />
              </span>
            </h3>
          </div>

          {/* Description Bio */}
          <p className="text-base leading-relaxed max-w-xl mx-auto lg:mx-0 text-slate-500 dark:text-slate-400">
            Results-driven <strong className="text-zinc-900 dark:text-white">Flutter Developer</strong> with experience in building scalable, high-performance cross-platform mobile applications using Flutter and Dart. Strong expertise in Clean Architecture, reactive state management (GetX, Provider, BLoC), and Firebase ecosystem integration.
          </p>

          {/* Actions Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
            <a
              href="#contact"
              className="px-6 py-3 bg-accent hover:bg-accent-hover font-bold rounded-xl flex items-center space-x-2 transition-all hover:scale-103 shadow-lg cursor-pointer text-slate-50 dark:text-slate-950"
              onMouseEnter={() => setIsHovering && setIsHovering(true)}
              onMouseLeave={() => setIsHovering && setIsHovering(false)}
            >
              <span>Hire Me</span>
              <Send className="w-4 h-4" />
            </a>
            <button
              onClick={() => setShowResume(true)}
              className="px-6 py-3 border hover:border-accent hover:text-zinc-900 dark:hover:text-white rounded-xl font-bold flex items-center space-x-2 transition-all cursor-pointer border-slate-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 bg-white/60 dark:bg-zinc-900/40"
              onMouseEnter={() => setIsHovering && setIsHovering(true)}
              onMouseLeave={() => setIsHovering && setIsHovering(false)}
            >
              <FileText className="w-4 h-4" />
              <span>Explore CV</span>
            </button>
          </div>

          {/* Live Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-300/80 dark:border-zinc-800/80 w-full">
            {STATS_DATA.map((stat, i) => (
              <div key={i} className="space-y-1 text-center lg:text-left">
                <span className="text-2xl sm:text-3xl font-black font-heading tracking-tight block text-zinc-900 dark:text-white">
                  {stat.value}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Interactive Luxury Portrait Module */}
        <div className="lg:col-span-5 relative z-10 flex flex-col items-center order-first lg:order-last w-full mt-4 lg:mt-0">
          {/* The Cinematic Luxury Portrait Component */}
          <div className="w-full max-w-[360px] aspect-square rounded-3xl overflow-hidden border border-slate-300 dark:border-zinc-850 bg-zinc-950 relative shadow-2xl group mb-6">
            {!isPortraitLoaded && (
              <div className="absolute inset-0 bg-slate-200 dark:bg-zinc-900 animate-pulse flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border-2 border-accent border-t-transparent animate-spin" />
              </div>
            )}
            <motion.img
              src={meImg}
              alt="Muhammed Faizal M Cinematic Luxury Portrait"
              className="w-full h-full object-cover object-top origin-top scale-[1.15] transition-transform duration-700 group-hover:scale-[1.25]"
              onLoad={() => setIsPortraitLoaded(true)}
              initial={{ opacity: 0 }}
              animate={{ opacity: isPortraitLoaded ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000";
                setIsPortraitLoaded(true);
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-zinc-900/70 backdrop-blur-md p-3 rounded-xl border border-zinc-800/80">
              <div>
                <span className="text-[10px] font-mono text-accent font-bold block">PORTRAIT // ID</span>
                <span className="text-white text-xs font-bold">Faizal M.</span>
              </div>
              <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            </div>
          </div>

          {/* Info Card Tabs Container */}
          <div className="w-full premium-card rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl shadow-slate-200/50 dark:shadow-none border-white/40 dark:border-white/10">
            {/* Card Tabs */}
            <div className="flex border-b pb-3 mb-4 space-x-4 text-xs font-bold uppercase tracking-wider border-slate-300 dark:border-zinc-800 text-slate-500 dark:text-slate-400">
              {['story', 'education', 'principles'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setAboutTab(tab)}
                  className={`transition-colors cursor-pointer pb-1 border-b-2 ${
                    aboutTab === tab
                      ? 'text-accent border-accent'
                      : 'border-transparent hover:text-slate-800 dark:text-slate-200'
                  }`}
                  onMouseEnter={() => setIsHovering && setIsHovering(true)}
                  onMouseLeave={() => setIsHovering && setIsHovering(false)}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="min-h-[160px] text-sm leading-relaxed font-sans text-slate-500 dark:text-slate-400">
              {aboutTab === 'story' && (
                <div className="space-y-3">
                  <p>
                    Hello, I am Muhammed Faizal M. I build production-ready applications with an emphasis on performance optimization, secure database operations, and maintainable cross-platform codebases.
                  </p>
                  <p>
                    I have structured commercial mobile layouts at <strong className="text-zinc-900 dark:text-white">Softroniics Technologies</strong> and delivered UI flows as an intern at <strong className="text-zinc-900 dark:text-white">Mentorow Technologies</strong>.
                  </p>
                </div>
              )}

              {aboutTab === 'education' && (
                <div className="space-y-4">
                  <div className="border-l-2 border-accent pl-3">
                    <h4 className="font-bold text-[13px] text-zinc-900 dark:text-white">Flutter Development Program</h4>
                    <p className="text-xs font-mono">Brototype, Trivandrum | Mar 2023 – Dec 2023</p>
                  </div>
                  <div className="border-l-2 pl-3 border-slate-300 dark:border-zinc-700">
                    <h4 className="font-bold text-[13px] text-slate-700 dark:text-slate-300">Bachelor’s Degree</h4>
                    <p className="text-xs font-mono">Travancore College, Trivandrum | 2018 – 2021</p>
                  </div>
                </div>
              )}

              {aboutTab === 'principles' && (
                <div className="grid grid-cols-2 gap-3 text-xs">
                  {[
                    { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "Clean Architecture" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "SOLID Coding Rules" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "JSON Parsers" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "BLoC / GetX States" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "Agile Scrums" },
                    { icon: <CheckCircle2 className="w-4 h-4 text-accent" />, title: "Performance Tuning" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 p-2 rounded-lg border bg-white/60 dark:bg-zinc-900/40 border-slate-300/80 dark:border-zinc-850/80"
                    >
                      {item.icon}
                      <span className="font-medium text-slate-600 dark:text-slate-350">{item.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Contact Link */}
            <div className="mt-6 pt-4 border-t flex flex-col sm:flex-row justify-between sm:items-center text-xs gap-2 border-slate-300/80 dark:border-zinc-800/80 text-slate-500 dark:text-slate-400">
              <span className="flex items-center space-x-1.5">
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono text-slate-500 dark:text-slate-400">+91 8075374600</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <Mail className="w-3.5 h-3.5 text-accent" />
                <span className="font-mono text-slate-500 dark:text-slate-400">mhdfaizalofficial@gmail.com</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
