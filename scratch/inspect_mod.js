import fs from 'fs';
import https from 'https';

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

const js = await download('/_next/static/chunks/2gjkjai1o0r1q.js');
const idx = js.indexOf('835591');
console.log('--- module 835591 ---');
console.log(js.substring(idx - 100, idx + 3500));
