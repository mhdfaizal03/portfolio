const fs = require('fs');

const originalClasses = new Set([
  'bg-[#09090b]', 'bg-zinc-950', 'bg-zinc-900', 'bg-zinc-850', 'bg-zinc-800', 'bg-zinc-200', 'bg-slate-950',
  'border-zinc-900', 'border-zinc-850', 'border-zinc-800', 'border-zinc-700', 'border-zinc-650', 'border-zinc-400',
  'text-slate-200', 'text-slate-300', 'text-slate-350', 'text-slate-400', 'text-slate-500', 'text-slate-650', 'text-slate-700',
  'text-white', 'text-slate-950', 'text-zinc-950', 'text-zinc-600', 'text-zinc-500', 'text-zinc-400'
]);

const lightArtifacts = new Set([
  'bg-slate-50', 'bg-slate-100', 'bg-white', 'bg-slate-200', 'bg-slate-600',
  'border-slate-200', 'border-slate-300', 'border-slate-400', 'border-slate-500',
  'text-slate-800', 'text-slate-700', 'text-slate-600', 'text-slate-500', 'text-slate-400', 'text-slate-50',
  'text-zinc-900', 'text-zinc-500', 'text-zinc-600', 'text-zinc-700'
]);

const opacities = ['/10', '/20', '/30', '/40', '/50', '/60', '/70', '/75', '/80', '/85', '/90', '/95'];

// Expand sets with opacities
const expandOpacities = (set) => {
  const expanded = new Set(set);
  for (const item of set) {
    for (const op of opacities) {
      expanded.add(item + op);
    }
  }
  return expanded;
};

const fullOriginalClasses = expandOpacities(originalClasses);
const fullLightArtifacts = expandOpacities(lightArtifacts);

const correctMappings = {
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
  'text-slate-400': 'text-slate-500 dark:text-slate-400',
  'text-slate-500': 'text-slate-600 dark:text-slate-500', // adjust for better contrast
  'text-slate-650': 'text-slate-400 dark:text-slate-650',
  'text-slate-700': 'text-slate-400 dark:text-slate-700',
  'text-white': 'text-zinc-900 dark:text-white',
  'text-slate-950': 'text-slate-50 dark:text-slate-950',
  'text-zinc-950': 'text-slate-50 dark:text-zinc-950',
  'text-zinc-600': 'text-zinc-500 dark:text-zinc-600',
  'text-zinc-500': 'text-zinc-600 dark:text-zinc-500',
  'text-zinc-400': 'text-zinc-700 dark:text-zinc-400',
};

// Expand mappings with opacities
const fullCorrectMappings = {};
for (const [key, val] of Object.entries(correctMappings)) {
  fullCorrectMappings[key] = val;
  for (const op of opacities) {
    const parts = val.split(' ');
    if (parts.length === 2) {
      fullCorrectMappings[key + op] = parts[0] + op + ' ' + parts[1] + op;
    }
  }
}

// Custom manual overrides
fullCorrectMappings['bg-zinc-900/40'] = 'bg-white/60 dark:bg-zinc-900/40';
fullCorrectMappings['bg-zinc-900/60'] = 'bg-white/80 dark:bg-zinc-900/60';
fullCorrectMappings['bg-zinc-900/50'] = 'bg-white/70 dark:bg-zinc-900/50';
fullCorrectMappings['bg-zinc-900/30'] = 'bg-white/40 dark:bg-zinc-900/30';
fullCorrectMappings['border-zinc-900/80'] = 'border-slate-300/80 dark:border-zinc-900/80';
fullCorrectMappings['bg-zinc-950/75'] = 'bg-slate-100/75 dark:bg-zinc-950/75';

// Additional fix: text-slate-404 etc from bad regex?
// Just remove them completely.
const badRegexArtifacts = new Set(['text-slate-404', 'text-slate-405', 'text-slate-505']);

let content = fs.readFileSync('src/App.jsx', 'utf8');

const regex = /className="([^"]+)"/g;

const newContent = content.replace(regex, (match, classString) => {
  const classes = classString.split(/\s+/).filter(c => c.length > 0);
  
  const originalSet = new Set();
  const keepSet = new Set();
  
  for (let c of classes) {
    if (badRegexArtifacts.has(c)) {
      continue;
    }
    
    // Check if it's a generated dark class, e.g. dark:bg-zinc-950
    let isDarkArtifact = false;
    let baseClass = c;
    if (c.startsWith('dark:')) {
      baseClass = c.replace('dark:', '');
      isDarkArtifact = true;
    }
    
    if (fullOriginalClasses.has(baseClass)) {
      originalSet.add(baseClass);
    } else if (fullLightArtifacts.has(baseClass) || fullLightArtifacts.has(c)) {
      // It's a generated light class, discard
    } else if (isDarkArtifact) {
      // dark:bg-slate-100 or something weird, discard
    } else {
      // Normal class (p-6, flex, etc)
      keepSet.add(c);
    }
  }
  
  // Now rebuild the class string
  const finalClasses = Array.from(keepSet);
  for (const orig of originalSet) {
    if (fullCorrectMappings[orig]) {
      finalClasses.push(fullCorrectMappings[orig]);
    } else {
      finalClasses.push(orig); // fallback just in case
    }
  }
  
  return `className="${finalClasses.join(' ')}"`;
});

fs.writeFileSync('src/App.jsx', newContent);
console.log('App.jsx fully healed!');
