'use strict';
// Format check for decisions/ and raids/. Runs on every pull request.
// Usage: node .github/scripts/check.js [repo root]. Exit 1 lists every problem.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(process.argv[2] || path.join(__dirname, '..', '..'));
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const STATUSES = ['open', 'decided', 'superseded'];
const problems = [];

function frontMatter(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!m) return null;
  const fields = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) continue;
    let value = kv[2].replace(/\s+#.*$/, '').replace(/^#.*$/, '').trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    }
    fields[kv[1]] = value;
  }
  return fields;
}

function entries(dir, pattern, check) {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return;
  for (const name of fs.readdirSync(full).filter((n) => n.endsWith('.md')).sort()) {
    const rel = `${dir}/${name}`;
    const say = (msg) => problems.push(`${rel}: ${msg}`);
    if (!pattern.test(name)) say(`filename must look like ${dir === 'raids' ? 'YYYY-MM-DD-raid-name.md' : 'YYYY-MM-DD-slug.md'} (lowercase, hyphens)`);
    const f = frontMatter(path.join(full, name));
    if (!f) { say('front matter missing: start the file with the template\'s --- block'); continue; }
    check(f, say, name);
  }
}

const NAME = /^\d{4}-\d{2}-\d{2}-[a-z0-9]+(-[a-z0-9]+)*\.md$/;

entries('decisions', NAME, (f, say, name) => {
  if (!f.title) say('title is empty');
  if (!STATUSES.includes(f.status)) say(`status must be one of ${STATUSES.join(', ')} (got "${f.status || ''}")`);
  if (!DATE.test(f.date || '')) say('date must be YYYY-MM-DD');
  else if (!name.startsWith(f.date)) say(`filename must start with the date (${f.date})`);
  if (!f.source) say('source is empty: name where it was said or decided');
  if (['decided', 'superseded'].includes(f.status) && !f.decided_by) say('decided_by is empty for a decided decision');
  if (f.supersedes) {
    const target = path.join(root, 'decisions', f.supersedes);
    if (!fs.existsSync(target)) say(`supersedes names ${f.supersedes}, which is not in decisions/`);
    else if ((frontMatter(target) || {}).status !== 'superseded') say(`${f.supersedes} must be set to status: superseded in the same pull request`);
  }
  for (const page of Array.isArray(f.affects) ? f.affects : []) {
    if (!fs.existsSync(path.join(root, page))) say(`affects names ${page}, which does not exist`);
  }
});

entries('raids', NAME, (f, say, name) => {
  for (const key of ['raid', 'leader']) if (!f[key]) say(`${key} is empty`);
  if (!DATE.test(f.date || '')) say('date must be YYYY-MM-DD');
  else if (!name.startsWith(f.date)) say(`filename must start with the date (${f.date})`);
  for (const key of ['kills', 'wipes']) if (!/^\d+$/.test(f[key] || '')) say(`${key} must be a whole number`);
});

if (problems.length) {
  console.error(`${problems.length} problem(s):\n${problems.map((p) => `- ${p}`).join('\n')}`);
  process.exit(1);
}
console.log('decisions/ and raids/ are well formed');
