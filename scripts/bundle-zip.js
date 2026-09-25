import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

async function buildZip() {
  const distDir = path.resolve('dist');
  if (!fs.existsSync(distDir)) {
    console.error('Pasta dist não encontrada! Execute npm run build primeiro.');
    process.exit(1);
  }

  const zip = new JSZip();

  function addDirToZip(currentDir, relativePath = '') {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      if (file.endsWith('.zip') || file.endsWith('.tar.gz')) continue;
      const fullPath = path.join(currentDir, file);
      const fileRelPath = relativePath ? `${relativePath}/${file}` : file;
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        addDirToZip(fullPath, fileRelPath);
      } else {
        const content = fs.readFileSync(fullPath);
        zip.file(fileRelPath, content);
      }
    }
  }

  addDirToZip(distDir);

  const content = await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' });

  // Salvar com nomes universais e limpos
  const fileNames = [
    'trenddela-site.zip',
    'trenddela-site-universal.zip',
    'site-trenddela-hostgator.zip'
  ];

  for (const name of fileNames) {
    fs.writeFileSync(name, content);
    fs.writeFileSync(path.join('public', name), content);
  }

  console.log('✅ Arquivos ZIP universais criados com sucesso em / e /public: trenddela-site.zip');
}

buildZip().catch(console.error);
