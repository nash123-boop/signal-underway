import fs from 'node:fs';
import path from 'node:path';

const dir = path.resolve('src/content/posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

let ok = true;

for (const f of files) {
  const p = path.join(dir, f);
  const raw = fs.readFileSync(p, 'utf-8');
  const m = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!m) {
    console.error(`❌ Missing frontmatter: ${f}`);
    ok = false;
    continue;
  }
  const fm = m[1];
  const required = ['title:', 'deck:', 'category:', 'publishDate:'];
  for (const r of required) {
    if (!fm.includes(r)) {
      console.error(`❌ ${f} missing "${r}"`);
      ok = false;
    }
  }
}
process.exit(ok ? 0 : 1);
