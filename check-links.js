const fs = require('fs');

const content = fs.readFileSync('src/lib/internships.ts', 'utf8');
const urls = [];
const regex = /careerUrl:\s*'([^']+)'/g;
let match;
while ((match = regex.exec(content)) !== null) {
  urls.push(match[1]);
}

console.log(`Checking ${urls.length} URLs...`);

async function check() {
  for (const url of urls) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(url, { 
        method: 'GET',
        headers: { 'User-Agent': 'Mozilla/5.0' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      if (!res.ok && res.status !== 403 && res.status !== 401 && res.status !== 999) {
        console.log(`❌ [${res.status}] ${url}`);
      } else if (res.status === 403 || res.status === 401 || res.status === 999) {
        // Some sites block automated requests but the link is probably fine if it returns 403/999
        // 999 is LinkedIn usually
      } else {
        // ok
      }
    } catch (e) {
      console.log(`❌ [Error] ${url} - ${e.message}`);
    }
  }
  console.log('Done.');
}
check();
