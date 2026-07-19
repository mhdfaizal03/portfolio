import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, FileText, LayoutGrid, X } from 'lucide-react';
import { THEMES, NAV_ITEMS } from '../../constants/data';

export default function Navbar({
  activeNav,
  setActiveNav,
  accent,
  setAccent,
  isDarkMode,
  setIsDarkMode,
  cursorTheme,
  setCursorTheme,
  showSettings,
  setShowSettings,
  mobileMenuOpen,
  setMobileMenuOpen,
  setShowResume,
  setIsHovering
}) {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b transition-all duration-300 bg-slate-50/75 dark:bg-[#09090b]/75 border-slate-300/80 dark:border-zinc-900/80">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl font-black bg-gradient-to-r from-accent to-violet-400 bg-clip-text text-transparent tracking-tight font-heading flex items-center space-x-1.5"
          onMouseEnter={() => setIsHovering && setIsHovering(true)}
          onMouseLeave={() => setIsHovering && setIsHovering(false)}
        >
          <span>FM</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8 text-xs font-semibold tracking-widest uppercase">
          {NAV_ITEMS.map(section => (
            <a
              key={section}
              href={`#${section.toLowerCase()}`}
              className={`transition-colors duration-300 py-1 border-b-2 hover:text-zinc-900 dark:text-white ${
                activeNav === section.toLowerCase()
                  ? 'border-accent text-zinc-900 dark:text-white'
                  : 'border-transparent text-slate-600 dark:text-slate-400'
              }`}
              onClick={() => setActiveNav(section.toLowerCase())}
              onMouseEnter={() => setIsHovering && setIsHovering(true)}
              onMouseLeave={() => setIsHovering && setIsHovering(false)}
            >
              {section}
            </a>
          ))}
        </div>

        {/* Accent Settings & Menu Controls */}
        <div className="flex items-center space-x-4">
          {/* Theme Accent Settings Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 border hover:border-slate-300 rounded-lg hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer border-slate-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-slate-500 dark:text-slate-400"
              onMouseEnter={() => setIsHovering && setIsHovering(true)}
              onMouseLeave={() => setIsHovering && setIsHovering(false)}
              title="Theme Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <AnimatePresence>
              {showSettings && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 border rounded-xl p-4 shadow-2xl z-50 space-y-4 bg-slate-100 dark:bg-zinc-950 border-slate-300 dark:border-zinc-800"
                >
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase block mb-2 font-mono text-slate-500 dark:text-slate-400">
                      00.1 // PALETTE
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      {THEMES.map(theme => (
                        <button
                          key={theme.name}
                          onClick={() => setAccent(theme.name)}
                          className={`w-6 h-6 rounded-full cursor-pointer transition-all border ${
                            accent === theme.name
                              ? 'scale-125 border-slate-500 dark:border-zinc-400 shadow-lg'
                              : 'border-slate-300 dark:border-zinc-800 hover:scale-115'
                          } ${theme.class}`}
                          title={theme.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-3 border-slate-300 dark:border-zinc-850">
                    <label className="flex items-center space-x-2.5 cursor-pointer text-[10px] font-bold tracking-wider uppercase font-mono text-slate-500 dark:text-slate-400">
                      <input
                        type="checkbox"
                        checked={isDarkMode}
                        onChange={(e) => setIsDarkMode(e.target.checked)}
                        className="rounded text-accent focus:ring-accent w-3.5 h-3.5 border-slate-300 dark:border-zinc-800 bg-slate-100 dark:bg-slate-950"
                      />
                      <span>00.2 // DARK MODE</span>
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-wider uppercase font-mono text-slate-500 dark:text-slate-400">
                        00.3 // CURSOR THEME
                      </span>
                      <select
                        value={cursorTheme}
                        onChange={(e) => setCursorTheme(e.target.value)}
                        className="bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-zinc-800 text-slate-700 dark:text-slate-300 text-[9px] font-mono p-1 rounded cursor-pointer outline-none focus:border-accent appearance-none pr-4"
                        style={{
                          backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2371717a%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.3rem top 50%',
                          backgroundSize: '0.45rem auto'
                        }}
                      >
                        <option value="default">DEFAULT</option>
                        <option value="developer">DEVELOPER</option>
                        <option value="aura">AURA GLOW</option>
                        <option value="crosshair">CROSSHAIR</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resume Button */}
          <button
            onClick={() => setShowResume(true)}
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 border border-accent/30 hover:border-accent text-accent hover:bg-accent/10 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer"
            onMouseEnter={() => setIsHovering && setIsHovering(true)}
            onMouseLeave={() => setIsHovering && setIsHovering(false)}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <LayoutGrid className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t backdrop-blur-lg px-6 py-4 space-y-3 border-slate-300 dark:border-zinc-800 bg-slate-50/95 dark:bg-[#09090b]/95"
          >
            {NAV_ITEMS.map(section => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                onClick={() => {
                  setActiveNav(section.toLowerCase());
                  setMobileMenuOpen(false);
                }}
                className={`block font-medium text-sm py-1.5 transition-colors duration-200 ${
                  activeNav === section.toLowerCase()
                    ? 'text-accent dark:text-accent font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {section}
              </a>
            ))}
            <button
              onClick={() => {
                setShowResume(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full justify-center py-2.5 border border-accent/30 text-accent rounded-lg font-bold text-xs"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Preview Resume</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
