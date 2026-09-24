import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('.');
const out = resolve(root, 'dist');
const files = ['index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'sw.js'];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const file of files) {
  const source = resolve(root, file);
  if (!existsSync(source)) throw new Error(`Missing required file: ${file}`);
  await cp(source, resolve(out, file));
}

await writeFile(resolve(out, '.nojekyll'), '');
console.log(`Built ${files.length} files into dist/`);
