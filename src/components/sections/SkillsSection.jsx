import React from 'react';
import { Code2, Database, Layers } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 border-y relative border-slate-300 dark:border-zinc-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <SectionHeading
            subtitle="02 // EXPERTISE"
            title="Technical Arsenal"
            description="Categorized skills representing core concepts, databases, frameworks and tooling."
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Languages & Core Cards */}
          <div className="p-8 premium-card rounded-3xl relative overflow-hidden group backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-300">
              <Code2 className="w-28 h-28 text-zinc-900 dark:text-white" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
              <Code2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Core & Languages</h3>
            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Dart Programming</span>
                <span className="text-xs text-accent font-mono">Expert</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Java / C Language</span>
                <span className="text-xs text-accent font-mono">Proficient</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Clean Architecture / OOP</span>
                <span className="text-xs text-accent font-mono">Expert</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">MVC Pattern</span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Proficient</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200">JSON Parsing & APIs</span>
                <span className="text-xs text-accent font-mono">Advanced</span>
              </div>
            </div>
          </div>

          {/* Frameworks & Database */}
          <div className="p-8 premium-card rounded-3xl relative overflow-hidden group backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-300">
              <Database className="w-28 h-28 text-zinc-900 dark:text-white" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
              <Database className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">Frameworks & Database</h3>
            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Flutter Framework</span>
                <span className="text-xs text-accent font-mono">Expert</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Firebase Firestore / DB</span>
                <span className="text-xs text-accent font-mono">Advanced</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">SQLite & Hive Local DB</span>
                <span className="text-xs text-accent font-mono">Expert</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">SharedPreferences</span>
                <span className="text-xs text-accent font-mono">Advanced</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200">MySQL Database</span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">Intermediate</span>
              </div>
            </div>
          </div>

          {/* States & Environments */}
          <div className="p-8 premium-card rounded-3xl relative overflow-hidden group backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.06] transition-all duration-300">
              <Layers className="w-28 h-28 text-zinc-900 dark:text-white" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">State Management & Tools</h3>
            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">GetX State</span>
                <span className="text-xs text-accent font-mono">Expert</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Provider & BLoC</span>
                <span className="text-xs text-accent font-mono">Expert</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Git / GitHub / Postman</span>
                <span className="text-xs text-accent font-mono">Advanced</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-300 dark:border-zinc-900">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Android Studio / VS Code</span>
                <span className="text-xs text-accent font-mono">Expert</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Figma Collaboration</span>
                <span className="text-xs text-accent font-mono">Proficient</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
