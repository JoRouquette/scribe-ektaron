import fs from 'node:fs';
import path from 'node:path';

const next = process.env.RELEASE_VERSION;
if (!next) throw new Error('RELEASE_VERSION manquant');

const files = ['package.json', 'apps/frontend/package.json', 'apps/backend/package.json'];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  j.version = next;
  fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  console.log(`updated ${f} -> ${next}`);
}

const write = (p) => fs.writeFileSync(p, `export const APP_VERSION='${next}';\n`);
fs.mkdirSync(path.dirname('apps/frontend/src/version.ts'), { recursive: true });
fs.mkdirSync(path.dirname('apps/backend/src/version.ts'), { recursive: true });
write('apps/frontend/src/version.ts');
write('apps/backend/src/version.ts');
