import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

export default function Toast({ showToast }) {
  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-55 max-w-sm border border-emerald-500/35 rounded-2xl p-4 shadow-2xl flex items-start space-x-3 bg-slate-100 dark:bg-zinc-950"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <Check className="w-4.5 h-4.5" />
          </div>
          <div className="space-y-1">
            <span className="font-bold text-xs block text-zinc-900 dark:text-white">Transmission Completed</span>
            <p className="text-[11px] leading-normal text-slate-500 dark:text-slate-400">
              Thank you! Your message was simulated successfully. I will get back to you soon.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
