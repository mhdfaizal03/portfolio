import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, X } from 'lucide-react';
import cvFile from '../../assets/Muhammed_Faizal_CV.pdf';

export default function ResumeModal({ showResume, setShowResume, setIsHovering }) {
  if (!showResume) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-slate-50/90 dark:bg-[#04060b]/90 backdrop-blur-md flex justify-center items-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="border rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl z-10 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800"
        >
          {/* Header */}
          <div className="p-6 border-b flex justify-between items-center border-slate-300 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-950">
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-accent" />
              <span className="font-bold font-heading text-zinc-900 dark:text-white">Muhammed Faizal M - CV</span>
            </div>
            <div className="flex items-center space-x-2">
              <a
                href={cvFile}
                download="Muhammed_Faizal_CV.pdf"
                className="p-2 border hover:border-slate-300 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer flex items-center space-x-1 text-xs border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400"
                onMouseEnter={() => setIsHovering && setIsHovering(true)}
                onMouseLeave={() => setIsHovering && setIsHovering(false)}
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={() => setShowResume(false)}
                className="p-2 border hover:border-slate-300 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-slate-500 dark:text-slate-400"
                onMouseEnter={() => setIsHovering && setIsHovering(true)}
                onMouseLeave={() => setIsHovering && setIsHovering(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Document Content */}
          <div className="p-8 max-h-[70vh] overflow-y-auto text-left space-y-6 text-sm leading-relaxed font-sans scrollbar-thin text-slate-500 dark:text-slate-400">
            {/* Header */}
            <div className="text-center space-y-2 pb-6 border-b border-slate-300/80 dark:border-zinc-800/80">
              <h1 className="text-3xl font-black font-heading tracking-tight leading-none text-zinc-900 dark:text-white">
                Muhammed Faizal M
              </h1>
              <h3 className="text-accent text-sm font-semibold uppercase tracking-wider font-mono">
                Flutter Developer
              </h3>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>+91 8075374600</span>
                <span>•</span>
                <span>mhdfaizalofficial@gmail.com</span>
                <span>•</span>
                <span>github.com/mhdfaizal03</span>
              </div>
            </div>

            {/* Profile statement */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest font-mono font-bold text-zinc-900 dark:text-white">Summary</h4>
              <p className="text-[13px]">
                Results-driven Flutter Developer with experience in building scalable, high-performance cross-platform mobile applications using Flutter and Dart. Strong expertise in Firebase Integration, REST API Development, Clean Architecture, and State Management (GetX, Provider, BLoC).
              </p>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-mono font-bold border-b pb-1 text-zinc-900 dark:text-white border-slate-300 dark:border-zinc-800">
                Experience
              </h4>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-xs font-bold font-mono">
                  <span className="text-slate-800 dark:text-slate-200">Software Developer (Flutter) @ Softroniics Technologies</span>
                  <span className="text-slate-550 dark:text-slate-400 font-semibold">September 2024 – Present</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Developed scalable Flutter applications using clean architecture designs.</li>
                  <li>Implemented state management using GetX, Provider, and Bloc.</li>
                  <li>Integrated Firebase Authentication, Firestore, Cloud Messaging, and Storage.</li>
                  <li>Built secure REST APIs, improving overall app response profiles.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-baseline text-xs font-bold font-mono">
                  <span className="text-slate-800 dark:text-slate-200">Flutter Developer Intern @ Mentorow Technologies, Kochi</span>
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Feb 2024 – Jul 2024</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Built Flutter applications, creating reusable UI elements.</li>
                  <li>Integrated Firebase systems and worked with REST API integrations.</li>
                </ul>
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-mono font-bold border-b pb-1 text-zinc-900 dark:text-white border-slate-300 dark:border-zinc-800">
                Skills
              </h4>
              <div className="grid grid-cols-2 gap-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Languages:</span>
                  <span className="ml-2 font-mono">Dart, Java, C, JavaScript</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Frameworks:</span>
                  <span className="ml-2 font-mono">Flutter, HTML, CSS</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">State Management:</span>
                  <span className="ml-2 font-mono">GetX, Provider, BLoC</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Databases:</span>
                  <span className="ml-2 font-mono">Firestore, Realtime DB, SQLite, Hive</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Architectures:</span>
                  <span className="ml-2 font-mono">Clean Architecture, OOP, MVC Pattern</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Tools:</span>
                  <span className="ml-2 font-mono">Git, GitHub, Postman, Android Studio, Figma</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-3">
              <h4 className="text-xs uppercase tracking-widest font-mono font-bold border-b pb-1 text-zinc-900 dark:text-white border-slate-300 dark:border-zinc-800">
                Education
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-mono">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Flutter Development Program @ Brototype, Trivandrum</span>
                  <span className="text-slate-500 dark:text-slate-400">Mar 2023 – Dec 2023</span>
                </div>
                <div className="flex justify-between font-mono">
                  <span className="font-bold text-slate-800 dark:text-slate-200">Bachelor’s Degree @ Travancore College, Trivandrum</span>
                  <span className="text-slate-500 dark:text-slate-400">2018 – 2021</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
