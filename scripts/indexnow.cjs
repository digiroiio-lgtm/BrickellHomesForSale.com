// Manual IndexNow submission for Bing, Yandex, Naver and others. Run after a production deploy:
//   INDEXNOW_KEY=<key> node scripts/indexnow.cjs [--all | url ...]
// The key file must be served at https://<host>/<key>.txt (commit public/<key>.txt containing only the key).
const origin = 'https://brickellhomesforsale.com';
const key = process.env.INDEXNOW_KEY;
if (!key) { console.log('INDEXNOW_KEY not set; nothing submitted.'); process.exit(0); }
(async () => {
  const args = process.argv.slice(2).filter(a => a !== '--all');
  let urls = args;
  if (!urls.length) {
    const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
    urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(origin).host, key, keyLocation: `${origin}/${key}.txt`, urlList: urls })
  });
  console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${res.status}`);
  if (!res.ok) process.exitCode = 1;
})();
