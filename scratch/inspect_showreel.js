import https from 'https';
import fs from 'fs';

async function download(url) {
  return new Promise((resolve, reject) => {
    https.get('https://humaan.com' + url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

// Download chunk1 (which had showreel and homepage template)
const js = await download('/_next/static/chunks/2gjkjai1o0r1q.js');
const idx = js.indexOf('homepage__showreel');
console.log('--- showreel in 2gjkjai1o0r1q.js ---');
console.log(js.substring(Math.max(0, idx - 400), idx + 800));

// Search for showreel component definition
const sIdx = js.indexOf('showreel');
let count = 0;
let pos = sIdx;
while (pos !== -1 && count < 5) {
  console.log(`\nMatch ${count} at ${pos}:`);
  console.log(js.substring(pos - 100, pos + 300));
  pos = js.indexOf('showreel', pos + 1);
  count++;
}
