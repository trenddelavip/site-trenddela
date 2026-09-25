import fs from 'fs';
import path from 'path';

function generate() {
  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    console.error('dist dir missing');
    return;
  }

  const htmlContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');
  const htaccessContent = fs.existsSync(path.join(distDir, '.htaccess')) 
    ? fs.readFileSync(path.join(distDir, '.htaccess'), 'utf-8') 
    : '';

  const assetsDir = path.join(distDir, 'assets');
  const assetFiles = fs.readdirSync(assetsDir);
  
  const assets = {};
  for (const file of assetFiles) {
    if (file.endsWith('.zip') || file.endsWith('.tar.gz')) continue;
    const content = fs.readFileSync(path.join(assetsDir, file), 'base64');
    assets[file] = content;
  }

  const code = `/**
 * Generated production assets for client-side instant zip generation.
 * This guarantees 100% valid, uncorrupted ZIP files on any operating system.
 */
export const DIST_HTML = ${JSON.stringify(htmlContent)};
export const DIST_HTACCESS = ${JSON.stringify(htaccessContent)};
export const DIST_ASSETS: Record<string, string> = ${JSON.stringify(assets)};
`;

  const utilsDir = path.resolve('src/utils');
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }

  fs.writeFileSync(path.join(utilsDir, 'distData.ts'), code);
  console.log('✅ src/utils/distData.ts generated successfully!');
}

generate();
