import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

export default function TerminalDrawer({
  terminalOpen,
  setTerminalOpen,
  terminalHistory,
  terminalInput,
  setTerminalInput,
  handleTerminalSubmit,
  terminalBottomRef,
  setIsHovering
}) {
  return (
    <div className="fixed bottom-4 right-4 z-40 font-mono text-xs select-text">
      <AnimatePresence>
        {terminalOpen ? (
          /* Opened Terminal CLI Window */
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="w-[calc(100vw-2rem)] max-w-sm sm:w-96 border rounded-2xl shadow-2xl overflow-hidden bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800"
          >
            {/* Window Header */}
            <div className="px-4 py-2.5 border-b flex items-center justify-between select-none relative bg-white dark:bg-zinc-900 border-slate-300 dark:border-zinc-800">
              <div className="flex items-center space-x-1.5 absolute left-4">
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="w-2.5 h-2.5 rounded-full bg-rose-500 hover:bg-rose-400 cursor-pointer"
                />
                <button
                  onClick={() => setTerminalOpen(false)}
                  className="w-2.5 h-2.5 rounded-full bg-amber-500 hover:bg-amber-400 cursor-pointer"
                />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center space-x-2 w-full justify-center">
                <TerminalIcon className="w-3.5 h-3.5 text-accent animate-pulse" />
                <span className="text-[10px] font-bold font-mono text-zinc-700 dark:text-zinc-400">
                  faizal-portfolio-cli.sh
                </span>
              </div>
            </div>

            {/* Terminal Logs Body */}
            <div className="p-4 h-56 overflow-y-auto scrollbar-thin text-left space-y-2 select-text bg-slate-100 dark:bg-zinc-950">
              {terminalHistory.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed text-[11px] ${
                    log.type === 'input'
                      ? 'text-zinc-900 dark:text-white font-semibold'
                      : log.type === 'error'
                      ? 'text-rose-400'
                      : log.type === 'info'
                      ? 'text-slate-500 dark:text-slate-400'
                      : 'text-emerald-450'
                  }`}
                >
                  {log.type === 'output' ? (
                    <pre className="font-mono whitespace-pre">{log.text}</pre>
                  ) : (
                    log.text
                  )}
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Terminal Input Form */}
            <form
              onSubmit={handleTerminalSubmit}
              className="border-t p-2 flex items-center select-text border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900"
            >
              <span className="text-accent font-bold mr-1.5 text-[11px]">visitor@faizal-cli:~$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="Type 'help'..."
                className="bg-transparent border-none focus:outline-none text-[11px] flex-1 font-mono select-text text-zinc-900 dark:text-white"
              />
            </form>
          </motion.div>
        ) : (
          /* Closed Floating Badge button */
          <motion.button
            layoutId="terminal-toggle"
            onClick={() => setTerminalOpen(true)}
            className="p-3 border rounded-full cursor-pointer shadow-2xl flex items-center justify-center select-none bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800 text-zinc-900 dark:text-white hover:text-accent dark:hover:text-accent"
            whileHover={{ scale: 1.1 }}
            onMouseEnter={() => setIsHovering && setIsHovering(true)}
            onMouseLeave={() => setIsHovering && setIsHovering(false)}
            title="Open Terminal Shell"
          >
            <TerminalIcon className="w-5 h-5 text-accent" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
