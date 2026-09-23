import fs from 'fs';

const js = fs.readFileSync('scratch/chunk1.js', 'utf8');

// Find where --progress or showreel is animated
const idx = js.indexOf('--progress');
console.log('--- --progress occurrence ---');
if (idx !== -1) {
  console.log(js.substring(Math.max(0, idx - 200), idx + 600));
} else {
  console.log('Not found in chunk1');
}

// Search for useScroll in all chunks
for (const f of fs.readdirSync('scratch')) {
  if (f.endsWith('.js')) {
    const content = fs.readFileSync(`scratch/${f}`, 'utf8');
    if (content.includes('useScroll') || content.includes('scrollYProgress')) {
      console.log('Found useScroll in:', f);
    }
  }
}
