const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

const replacements = {
  'bg-[#09090b]': 'bg-slate-50 dark:bg-[#09090b]',
  'bg-zinc-950': 'bg-slate-100 dark:bg-zinc-950',
  'bg-zinc-900': 'bg-white dark:bg-zinc-900',
  'bg-zinc-850': 'bg-slate-200 dark:bg-zinc-850',
  'bg-zinc-800': 'bg-slate-200 dark:bg-zinc-800',
  'bg-zinc-200': 'bg-slate-600 dark:bg-zinc-200',
  'bg-slate-950': 'bg-slate-100 dark:bg-slate-950',
  'border-zinc-900': 'border-slate-300 dark:border-zinc-900',
  'border-zinc-850': 'border-slate-300 dark:border-zinc-850',
  'border-zinc-800': 'border-slate-300 dark:border-zinc-800',
  'border-zinc-700': 'border-slate-300 dark:border-zinc-700',
  'border-zinc-650': 'border-slate-400 dark:border-zinc-650',
  'border-zinc-400': 'border-slate-500 dark:border-zinc-400',
  'text-slate-200': 'text-slate-800 dark:text-slate-200',
  'text-slate-300': 'text-slate-700 dark:text-slate-300',
  'text-slate-350': 'text-slate-600 dark:text-slate-350',
  'text-slate-400': 'text-slate-600 dark:text-slate-400',
  'text-slate-500': 'text-slate-500 dark:text-slate-400',
  'text-slate-650': 'text-slate-500 dark:text-slate-650',
  'text-slate-700': 'text-slate-400 dark:text-slate-700',
  'text-white': 'text-zinc-900 dark:text-white',
  'text-slate-950': 'text-slate-50 dark:text-slate-950',
  'text-zinc-950': 'text-slate-50 dark:text-zinc-950',
  'text-zinc-600': 'text-zinc-500 dark:text-zinc-600',
  'text-zinc-500': 'text-zinc-600 dark:text-zinc-500',
  'text-zinc-400': 'text-zinc-700 dark:text-zinc-400',
};

const opacities = ['/10', '/20', '/30', '/40', '/50', '/60', '/70', '/80', '/90'];
let fullReplacements = { ...replacements };

for (const [key, val] of Object.entries(replacements)) {
  for (const op of opacities) {
    const parts = val.split(' ');
    if (parts.length === 2) {
      // correctly apply opacity to both light and dark classes
      fullReplacements[key + op] = parts[0] + op + ' ' + parts[1] + op;
    }
  }
}

// Custom opacity overwrites
fullReplacements['bg-zinc-900/40'] = 'bg-white/60 dark:bg-zinc-900/40';
fullReplacements['bg-zinc-900/60'] = 'bg-white/80 dark:bg-zinc-900/60';
fullReplacements['bg-zinc-900/50'] = 'bg-white/70 dark:bg-zinc-900/50';
fullReplacements['bg-zinc-900/30'] = 'bg-white/40 dark:bg-zinc-900/30';
fullReplacements['border-zinc-900/80'] = 'border-slate-300/80 dark:border-zinc-900/80';
fullReplacements['bg-zinc-950/75'] = 'bg-slate-100/75 dark:bg-zinc-950/75';

// Process all string replacements
for (const [key, val] of Object.entries(fullReplacements)) {
  const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp('(?<![\\w-])' + escapeRegExp(key) + '(?![\\w-])', 'g');
  content = content.replace(regex, val);
}

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx classes updated for light/dark mode!');
