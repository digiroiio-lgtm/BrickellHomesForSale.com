/* eslint-disable @typescript-eslint/no-require-imports */
// The committed manifest binds editorial dates to the text for each page.
// A content edit fails the build until its revision date and fingerprint are reviewed.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  if (name.startsWith('@/')) name = path.join(root, 'src', name.slice(2));
  return originalResolve.call(this, name, ...args);
};
require.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  module._compile(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
};
const { guides } = require('../src/lib/content.ts');
const { buildings } = require('../src/lib/buildings.ts');
const { propertyTypeContent } = require('../src/lib/property-type-content.ts');
const { buyerGuideContent } = require('../src/lib/buyer-guide-content.ts');
const { residentialDetail, additionalDetails } = require('../src/lib/residential-content.ts');
const { matrices } = require('../src/lib/decision-matrices.ts');
const { trust } = require('../src/lib/trust-content.ts');
const manifestPath = path.join(root, 'src/lib/content-revisions.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const sha = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const pages = Object.fromEntries([
  ['/', sha([fs.readFileSync(path.join(root, 'src/app/page.tsx'), 'utf8'), guides.map(g => [g.slug, g.title]), buildings.map(b => [b.slug, b.name])])],
  ['/buildings/', sha([fs.readFileSync(path.join(root, 'src/app/buildings/page.tsx'), 'utf8'), buildings.map(b => [b.slug, b.name, b.summary])])],
  ['/buyer-guides/', sha([fs.readFileSync(path.join(root, 'src/app/buyer-guides/page.tsx'), 'utf8'), guides.map(g => [g.slug, g.title, g.description])])],
  ...Object.entries(trust).map(([slug, value]) => [`/${slug}/`, sha(value)]),
  ['/privacy/', sha(fs.readFileSync(path.join(root, 'src/app/privacy/page.tsx'), 'utf8'))],
  ...guides.map(g => [`/${g.slug}/`, sha([g, propertyTypeContent[g.slug], buyerGuideContent[g.slug], residentialDetail[g.slug], additionalDetails[g.slug], matrices[g.slug]])]),
  ...buildings.map(b => [`/buildings/${b.slug}/`, sha(b)])
]);
let invalid = false;
for (const [url, hash] of Object.entries(pages)) {
  const entry = manifest[url];
  if (!entry || entry.hash !== hash || !/^\d{4}-\d\d-\d\d$/.test(entry.date)) {
    console.error(`Content revision needs review: ${url}`);
    invalid = true;
  }
}
for (const url of Object.keys(manifest)) if (!pages[url]) { console.error(`Stale content revision: ${url}`); invalid = true; }
if (process.argv.includes('--snapshot')) {
  // Only run deliberately after checking which URLs changed and assigning the actual editorial dates.
  const date = process.argv.find(arg => /^--date=\d{4}-\d\d-\d\d$/.test(arg))?.slice(7);
  if (!date) throw new Error('Provide --date=YYYY-MM-DD (actual editorial revision date)');
  const next = Object.fromEntries(Object.entries(pages).map(([url, hash]) => [url, { date: manifest[url]?.hash === hash ? manifest[url].date : date, hash }]));
  fs.writeFileSync(manifestPath, JSON.stringify(next, null, 2) + '\n');
} else if (invalid) process.exitCode = 1;
