/* eslint-disable @typescript-eslint/no-require-imports */
// Static SEO hygiene check over guide and building metadata. Fails on duplicates and over-long titles.
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  if (name.startsWith('@/')) name = path.join(root, 'src', name.slice(2));
  return originalResolve.call(this, name, ...args);
};
require.extensions['.ts'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
require.extensions['.tsx'] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText, filename);
const { guides } = require('../src/lib/content.ts');
const { buildings } = require('../src/lib/buildings.ts');
const { fullTitle, richDescription, buildingTitle } = require('../src/lib/seo.tsx');
const problems = [];
const seenTitles = new Map();
const seenDescriptions = new Map();
const check = (label, title, description) => {
  const t = fullTitle(title);
  if (t.length > 60) problems.push(`${label}: title is ${t.length} chars (max 60): ${t}`);
  if (description.length > 160) problems.push(`${label}: description is ${description.length} chars (max 160)`);
  if (description.length < 70) problems.push(`${label}: description is ${description.length} chars (min 70)`);
  if (/current (availability|inventory)/i.test(`${title} ${description}`)) problems.push(`${label}: implies live availability`);
  if (seenTitles.has(t)) problems.push(`${label}: duplicate title with ${seenTitles.get(t)}`);
  if (seenDescriptions.has(description)) problems.push(`${label}: duplicate description with ${seenDescriptions.get(description)}`);
  seenTitles.set(t, label); seenDescriptions.set(description, label);
};
for (const g of guides) check(`/${g.slug}/`, g.title, richDescription(g.description, ['Independent Brickell buyer guide; no MLS listings or prices shown.', 'Independent Brickell buyer guide; no MLS listings.', 'No MLS listings or prices shown.']));
for (const b of buildings) check(`/buildings/${b.slug}/`, buildingTitle(b.name), richDescription(b.summary, ['Source-linked facts and buyer questions; no listings or prices shown.', 'Source-linked facts and buyer questions; no listings.', 'No listings or prices shown.']));
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; } else console.log(`SEO metadata OK for ${guides.length} guides and ${buildings.length} buildings.`);
