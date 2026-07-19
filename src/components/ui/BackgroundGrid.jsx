import React from 'react';

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Structural Vertical/Horizontal Grid Lines for Blueprint Aesthetic */}
      <div className="absolute inset-0">
        {/* Left vertical border for main container */}
        <div className="absolute left-[calc(50%-36rem)] top-0 w-[1px] h-full hidden xl:block bg-white/40 dark:bg-zinc-900/30" />
        {/* Right vertical border for main container */}
        <div className="absolute right-[calc(50%-36rem)] top-0 w-[1px] h-full hidden xl:block bg-white/40 dark:bg-zinc-900/30" />
        {/* Subtle horizontal dividing line */}
        <div className="absolute top-[80px] left-0 w-full h-[1px] bg-white/40 dark:bg-zinc-900/30" />
      </div>

      {/* Top & Bottom Floating Glow Lights */}
      <div className="absolute top-[-10%] left-[20%] w-[45vw] h-[45vh] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[10%] w-[35vw] h-[35vh] bg-accent/5 rounded-full blur-[100px]" />
    </div>
  );
}
