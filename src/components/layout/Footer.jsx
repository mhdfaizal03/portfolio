import React from 'react';

export default function Footer() {
  return (
    <footer className="py-12 border-t text-center space-y-3 z-10 relative border-slate-300 dark:border-zinc-900 bg-slate-50/80 dark:bg-[#09090b]/80">
      <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
        Engineered with React, TailwindCSS v4 & Framer Motion
      </p>
      <p className="text-accent/60 font-mono text-[9px]">
        © {new Date().getFullYear()} Muhammed Faizal M. All rights reserved.
      </p>
    </footer>
  );
}
