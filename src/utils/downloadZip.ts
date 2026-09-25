import JSZip from 'jszip';
import { DIST_HTML, DIST_HTACCESS, DIST_ASSETS } from './distData';

export async function downloadTrendDelaZip(filename: string = 'trenddela-site.zip') {
  const zip = new JSZip();

  // 1. Adicionar index.html
  zip.file('index.html', DIST_HTML);

  // 2. Adicionar .htaccess para HostGator / Apache
  if (DIST_HTACCESS) {
    zip.file('.htaccess', DIST_HTACCESS);
  }

  // 3. Adicionar pasta assets e seus arquivos compilados
  const assetsFolder = zip.folder('assets');
  if (assetsFolder) {
    for (const [assetName, base64Content] of Object.entries(DIST_ASSETS)) {
      assetsFolder.file(assetName, base64Content, { base64: true });
    }
  }

  // 4. Gerar o Blob binário real do ZIP no próprio navegador
  const blob = await zip.generateAsync({
    type: 'blob',
    mimeType: 'application/zip',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  // 5. Disparar o download direto e seguro
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Liberar memória
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

// Download individual do index.html se o usuário desejar
export function downloadIndexHtml() {
  const blob = new Blob([DIST_HTML], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}
