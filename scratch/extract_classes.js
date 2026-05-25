const fs = require('fs');
const content = fs.readFileSync('src/App.jsx', 'utf8');
const regex = /className="([^"]+)"/g;
let match;
const classes = new Set();
while ((match = regex.exec(content)) !== null) {
    const classList = match[1].split(/\s+/);
    for (const c of classList) {
        if (c && (c.includes('bg-') || c.includes('text-') || c.includes('border-'))) {
            classes.add(c);
        }
    }
}
fs.writeFileSync('scratch/classes.txt', Array.from(classes).sort().join('\n'));
