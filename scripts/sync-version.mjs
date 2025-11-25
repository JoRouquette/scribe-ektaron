import fs from 'node:fs';
import path from 'node:path';

const next = process.env.RELEASE_VERSION;
if (!next) throw new Error('RELEASE_VERSION manquant');

const pkgFiles = ['package.json'];
const lockFiles = ['package-lock.json'];
const versionFiles = ['apps/site/src/version.ts', 'apps/node/src/version.ts'];

const updateJson = (filepath, updater) => {
  if (!fs.existsSync(filepath)) return false;
  const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  const updated = updater(data);
  fs.writeFileSync(filepath, JSON.stringify(updated, null, 2) + '\n');
  console.log(`updated ${filepath} -> ${next}`);
  return true;
};

for (const file of pkgFiles) {
  updateJson(file, (json) => ({ ...json, version: next }));
}

for (const file of lockFiles) {
  updateJson(file, (json) => {
    const updated = { ...json, version: next };
    if (updated.packages?.['']) {
      updated.packages[''] = { ...updated.packages[''], version: next };
    }
    return updated;
  });
}

const writeVersionFile = (p) => {
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, `export const APP_VERSION='${next}';\n`);
  console.log(`updated ${p} -> ${next}`);
};

versionFiles.forEach(writeVersionFile);
