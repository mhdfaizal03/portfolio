import React from 'react';

export default function PhoneScreen({ type, platform }) {
  const isIOS = platform === 'iOS';

  switch (type) {
    case 'blessing':
      return (
        <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
          {/* Custom App Bar */}
          <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
            <span className="font-bold text-[8.5px] tracking-wide text-accent">Blessing Companion</span>
          </div>

          <div className="border border-accent/20 rounded-lg p-1.5 mb-2 shadow-sm text-center bg-white/80 dark:bg-zinc-900/60">
            <span className="text-[6.5px] block text-slate-500 dark:text-slate-400">Fast Tracker</span>
            <span className="font-bold text-[9px] text-accent">Ramadan Day 18</span>
            <div className="w-full h-1 rounded-full mt-1 overflow-hidden bg-slate-200 dark:bg-zinc-800">
              <div className="bg-accent h-full w-[70%]" />
            </div>
          </div>

          <div className="space-y-1 overflow-y-auto scrollbar-none flex-1">
            <div className="border rounded p-1 flex justify-between items-center bg-white/60 dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-900">
              <span className="text-[6.5px] font-semibold text-slate-500 dark:text-slate-400">Fajr</span>
              <span className="text-[6.5px] text-accent font-mono">04:45 AM</span>
            </div>
            <div className="bg-accent/10 border border-accent/30 rounded p-1 flex justify-between items-center">
              <span className="text-[6.5px] font-semibold text-slate-800 dark:text-slate-200">Dhuhr</span>
              <span className="text-[6.5px] text-accent font-mono">12:20 PM</span>
            </div>
            <div className="border rounded p-1 flex justify-between items-center bg-white/60 dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-900">
              <span className="text-[6.5px] font-semibold text-slate-500 dark:text-slate-400">Asr</span>
              <span className="text-[6.5px] text-accent font-mono">03:32 PM</span>
            </div>
          </div>

          {/* Custom Platform Switch Widget inside mockup */}
          <div className="mt-2 flex items-center justify-between p-1 rounded border bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
            <span className="text-[5.5px] text-slate-500 dark:text-slate-400">Silent Mode</span>
            {isIOS ? (
              // Cupertino Toggle
              <div className="w-5 h-3 bg-accent rounded-full p-0.5 flex justify-end cursor-pointer">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            ) : (
              // Material Toggle
              <div className="w-5 h-2 bg-accent/20 rounded-full relative flex items-center cursor-pointer">
                <div className="w-2.5 h-2.5 bg-accent rounded-full absolute right-0" />
              </div>
            )}
          </div>
        </div>
      );
    case 'ncc':
      return (
        <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
          {/* Custom App Bar */}
          <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
            <span className="font-bold text-[8.5px] tracking-wide text-accent">NCC Cadets</span>
          </div>

          <div className="flex space-x-1 mb-2">
            <div className={`border p-1 flex-1 text-center ${isIOS ? 'bg-white dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-900 rounded-lg' : 'bg-transparent border-accent/20 rounded'}`}>
              <span className="text-[6px] block text-slate-500 dark:text-slate-400">Cadets</span>
              <span className="font-bold text-[9px] text-accent">542</span>
            </div>
            <div className={`border p-1 flex-1 text-center ${isIOS ? 'bg-white dark:bg-zinc-900/40 border-slate-300 dark:border-zinc-900 rounded-lg' : 'bg-transparent border-slate-300 dark:border-zinc-800 rounded'}`}>
              <span className="text-[6px] block text-slate-500 dark:text-slate-400">Roster</span>
              <span className="font-bold text-[9px] text-accent">92%</span>
            </div>
          </div>

          <div className="space-y-1.5 flex-1 overflow-y-auto scrollbar-none">
            <span className="text-[5.5px] text-accent font-mono block">RECENT NOTICES</span>
            <div className="bg-white dark:bg-zinc-900 border-l-2 p-1 border-accent rounded-r-lg">
              <span className="text-[7px] font-bold block text-zinc-900 dark:text-white">Morning Parade</span>
              <p className="text-[5.5px] text-slate-500 dark:text-slate-400">Parade scheduled for 06:00 AM.</p>
            </div>
          </div>

          {/* Custom Platform Button */}
          <button className={`w-full py-1 text-center text-[7px] font-bold mt-2 ${
            isIOS
              ? 'bg-accent/10 border border-accent/30 text-accent rounded-lg'
              : 'bg-accent text-slate-50 dark:text-zinc-950 rounded'
          }`}>
            Open Roster Board
          </button>
        </div>
      );
    case 'expenxo':
      return (
        <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
          {/* Custom App Bar */}
          <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
            <span className="font-bold text-[8.5px] tracking-wide text-accent font-heading">Expenxo Cash</span>
          </div>

          <div className="text-center py-2 border rounded-lg mb-2 bg-white/80 dark:bg-zinc-900/60 border-slate-300 dark:border-zinc-900">
            <span className="text-[5.5px] block font-mono text-slate-500 dark:text-slate-400">Week Budget Status</span>
            <span className="font-bold text-xs font-mono text-zinc-900 dark:text-white">$142.50</span>
          </div>

          {/* Charts */}
          <div className="flex items-center space-x-1.5 p-1.5 rounded-lg border mb-2 flex-1 bg-white/40 dark:bg-zinc-900/30 border-slate-300 dark:border-zinc-900">
            <svg viewBox="0 0 36 36" className="w-8 h-8 flex-shrink-0 animate-spin-slow">
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeDasharray="70, 30" />
              <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeDasharray="30, 70" strokeDashoffset="70" className="opacity-30" />
            </svg>
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-center text-[5.5px]">
                <span className="font-medium text-slate-500 dark:text-slate-400">Food split</span>
                <span className="font-bold font-mono text-accent">$85.50</span>
              </div>
              <div className="flex justify-between items-center text-[5.5px]">
                <span className="font-medium text-slate-500 dark:text-slate-400">Travel split</span>
                <span className="font-bold font-mono text-accent/85">$37.00</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isIOS ? (
            <div className="flex justify-between items-center p-1 rounded-lg border bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
              <span className="text-[6px] text-slate-500 dark:text-slate-400">Insert Entry</span>
              <span className="text-[9px] text-accent font-bold leading-none cursor-pointer">+</span>
            </div>
          ) : (
            // Android Floating Action Button (FAB) simulator
            <div className="flex justify-end pr-1 pb-1">
              <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center font-bold text-xs shadow-lg leading-none cursor-pointer text-slate-50 dark:text-zinc-950">
                +
              </div>
            </div>
          )}
        </div>
      );
    case 'chatifly':
      return (
        <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
          {/* Custom App Bar */}
          <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
            <span className="font-bold text-[8.5px] tracking-wide text-accent">Chatifly Channel</span>
          </div>

          <div className="space-y-2 flex-1 overflow-y-auto scrollbar-none flex flex-col justify-end">
            <div className={`text-slate-600 dark:text-slate-350 p-1.5 text-[6.5px] max-w-[80%] self-start border ${
              isIOS
                ? 'bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800 rounded-2xl rounded-bl-sm'
                : 'bg-white dark:bg-zinc-900/50 border-slate-300 dark:border-zinc-800 rounded rounded-bl-none'
            }`}>
              Hey! Is Chatifly scalable?
            </div>
            <div className={`font-medium p-1.5 text-[6.5px] max-w-[80%] self-end ${
              isIOS
                ? 'bg-accent text-slate-50 dark:text-zinc-950 rounded-2xl rounded-br-sm'
                : 'bg-accent/90 text-slate-50 dark:text-zinc-950 rounded rounded-br-none'
            }`}>
              Yes, built on FCM. Syncs sub-100ms!
            </div>
          </div>

          <div className="mt-2 border rounded-lg p-1 flex items-center justify-between bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
            <span className="text-[5.5px] text-slate-500 dark:text-slate-400">Channels list</span>
          </div>
        </div>
      );
    case 'autoresq':
      return (
        <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
          {/* Custom App Bar */}
          <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-2 ${isIOS ? 'justify-center' : 'justify-start'}`}>
            <span className="font-bold text-[8.5px] tracking-wide text-accent font-heading">AutoResQ SOS</span>
          </div>

          {/* Custom Google Maps Vector mockup */}
          <div className="border rounded-lg relative h-[100px] w-full overflow-hidden bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-400 dark:text-slate-700">
              <line x1="10" y1="0" x2="10" y2="100" stroke="#27272a" strokeWidth="2" />
              <line x1="50" y1="0" x2="50" y2="100" stroke="#27272a" strokeWidth="2" />
              <line x1="0" y1="30" x2="100" y2="30" stroke="#27272a" strokeWidth="2" />
              {/* Route */}
              <path d="M10,70 L50,70 L50,30 L80,30" fill="none" stroke="var(--accent-color)" strokeWidth="3" strokeLinecap="round" />
              {/* User point */}
              <circle cx="10" cy="70" r="3.5" fill="var(--accent-color)" />
              {/* Mechanic point */}
              <circle cx="80" cy="30" r="3.5" fill="var(--accent-color)" className="opacity-60" />
            </svg>
          </div>

          {/* SOS Button */}
          <div className="mt-2 text-center">
            {isIOS ? (
              <button className="w-full py-1 bg-accent rounded-2xl text-[6.5px] font-bold border border-accent/20 shadow-md text-slate-50 dark:text-zinc-950">
                TRIGGER EMERGENCY
              </button>
            ) : (
              <button className="w-full py-1 bg-accent rounded text-[6.5px] font-bold shadow-lg text-slate-50 dark:text-zinc-950">
                SOS ROADSIDE
              </button>
            )}
          </div>
        </div>
      );
    case 'behold':
      return (
        <div className="flex flex-col h-full justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200 overflow-hidden">
          {/* Mini Web/App Navigation Bar */}
          <div className="p-1.5 border-b border-slate-300 dark:border-zinc-900 bg-white/90 dark:bg-zinc-900/90 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-extrabold text-[7.5px] tracking-tight font-heading text-zinc-900 dark:text-white">BEHOLD.CO.IN</span>
            </div>
            <span className="text-[5px] font-mono border px-1 rounded text-accent bg-accent/10 border-accent/20">v2.4</span>
          </div>

          {/* Hero Banner inside mockup */}
          <div className="p-2 flex-1 flex flex-col justify-center items-center text-center space-y-1.5 bg-gradient-to-b from-accent/10 to-transparent">
            <span className="text-[5.5px] uppercase font-mono tracking-widest text-accent font-bold">DIGITAL BRAND SOLUTIONS</span>
            <span className="font-black text-[9px] leading-tight text-zinc-900 dark:text-white">Next-Gen Web Architecture</span>
            <div className="w-full h-px bg-slate-300 dark:bg-zinc-800 my-1" />
            <div className="grid grid-cols-2 gap-1 w-full text-[5.5px]">
              <div className="bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 rounded p-1">
                <span className="font-mono text-accent block font-bold">99.8%</span>
                <span className="text-slate-500 dark:text-slate-400">PageSpeed</span>
              </div>
              <div className="bg-white dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 rounded p-1">
                <span className="font-mono text-emerald-400 block font-bold">&lt;0.5s</span>
                <span className="text-slate-500 dark:text-slate-400">Load Time</span>
              </div>
            </div>
          </div>

          {/* Bottom CTA Mockup button */}
          <div className="p-1.5 border-t border-slate-300 dark:border-zinc-900 bg-white dark:bg-zinc-900">
            <button className="w-full py-1 bg-accent hover:bg-accent-hover text-slate-50 dark:text-zinc-950 font-extrabold text-[6.5px] rounded transition-all">
              EXPLORE BEHOLD &rarr;
            </button>
          </div>
        </div>
      );
    case 'lms':
      return (
        <div className="flex flex-col h-full p-2 justify-between font-sans bg-slate-100 dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
          {/* Custom App Bar */}
          <div className={`flex items-center border-b border-slate-300 dark:border-zinc-900 pb-1.5 mb-1.5 ${isIOS ? 'justify-center' : 'justify-between'}`}>
            <span className="font-bold text-[8px] tracking-wide text-accent">Softroniics LMS</span>
            {!isIOS && <span className="text-[5.5px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1 rounded font-mono">LIVE</span>}
          </div>

          {/* Student Progress Banner */}
          <div className="border rounded-lg p-1.5 mb-1.5 bg-white/80 dark:bg-zinc-900/60 border-slate-300 dark:border-zinc-900">
            <div className="flex justify-between text-[6px] text-slate-500 dark:text-slate-400 mb-0.5">
              <span>Flutter Clean Arch</span>
              <span className="text-accent font-bold">84%</span>
            </div>
            <div className="w-full h-1 rounded-full overflow-hidden bg-slate-200 dark:bg-zinc-800">
              <div className="bg-accent h-full w-[84%]" />
            </div>
          </div>

          {/* Module List */}
          <div className="space-y-1 flex-1 overflow-y-auto scrollbar-none">
            <div className="border border-accent/30 bg-accent/10 rounded p-1 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[6.5px] font-bold text-zinc-900 dark:text-white">Mod 04: BLoC vs GetX</span>
                <span className="text-[5.5px] text-accent">Streaming Now • 45m</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-accent flex items-center justify-center text-[7px] text-slate-50 dark:text-zinc-950 font-bold">▶</div>
            </div>
            <div className="border border-slate-300 dark:border-zinc-900 bg-white/60 dark:bg-zinc-900/40 rounded p-1 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[6.5px] font-semibold text-slate-500 dark:text-slate-400">Mod 05: REST API Sync</span>
                <span className="text-[5.5px] text-slate-400 dark:text-slate-500">Assignment due Friday</span>
              </div>
              <span className="text-[6px] text-emerald-400 font-mono">✓ Done</span>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="mt-1.5 flex justify-between items-center p-1 border rounded bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
            <span className="text-[5.5px] text-slate-500 dark:text-slate-400">Next Live Class</span>
            <span className="text-[6.5px] font-bold font-mono text-accent">02:30 PM</span>
          </div>
        </div>
      );
    default:
      return null;
  }
}
