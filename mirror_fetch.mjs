import fs from 'fs';
import path from 'path';

const base = 'https://magicvics.lockigesbrusthaar.cloud';
const out = 'C:/Users/adminMJ/.openclaw/workspace/magicvics-mirror';

const ensureDir = p => fs.mkdirSync(path.dirname(p), { recursive: true });
const seen = new Set();
const queue = [
  '/',
  '/assets/index-CKZAQd6b.js',
  '/assets/index-UPhXffZa.css',
  '/fonts/Balothine.woff2',
  '/fonts/DanielaParadise.woff2',
  '/fonts/Richykid.woff2',
  '/fonts/Tremors-Regular.woff2'
];

const assetRegex = /(?:(?:src|href|url)\s*[:=]\s*|url\()\s*['\"]?([^'\")\s]+)|([/][A-Za-z0-9_\-./]+\.(?:js|css|png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot|map))/g;

async function fetchBuf(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(String(res.status));
  const ab = await res.arrayBuffer();
  return { buf: Buffer.from(ab), ctype: res.headers.get('content-type') || '' };
}

function localPathFromRoute(route) {
  if (route === '/') return path.join(out, 'index.html');
  return path.join(out, route.replace(/^\//, ''));
}

while (queue.length) {
  const p = queue.shift();
  if (seen.has(p)) continue;
  seen.add(p);
  const url = new URL(p, base).toString();
  try {
    const { buf, ctype } = await fetchBuf(url);
    const lp = localPathFromRoute(p);
    ensureDir(lp);
    fs.writeFileSync(lp, buf);
    console.log('OK', p, ctype);

    const textLike = /javascript|text|json|css|svg/.test(ctype) || /\.(js|css|html|svg|map)$/.test(lp);
    if (textLike) {
      const text = buf.toString('utf8');
      for (const m of text.matchAll(assetRegex)) {
        const cand = (m[1] || m[2] || '').trim();
        if (!cand || cand.startsWith('data:') || cand.startsWith('http://') || cand.startsWith('https://') || cand.startsWith('//')) continue;
        const rp = new URL(cand, new URL(p, base)).pathname;
        if (seen.has(rp)) continue;
        if (rp.startsWith('/assets/') || rp.startsWith('/fonts/') || /\.(png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot|css|js|map)$/.test(rp)) {
          queue.push(rp);
        }
      }
    }
  } catch (e) {
    console.log('MISS', p, String(e.message || e));
  }
}

// Fetch Google fonts CSS and referenced gstatic files
const googleCssUrl = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
try {
  const { buf } = await fetchBuf(googleCssUrl);
  const css = buf.toString('utf8');
  const cssPath = path.join(out, 'external', 'fonts.googleapis.com', 'css2_family_Inter.css');
  ensureDir(cssPath);
  fs.writeFileSync(cssPath, css, 'utf8');
  console.log('OK', googleCssUrl);

  const urls = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g)].map(m => m[1].replace(/^['\"]|['\"]$/g, ''));
  for (const wu of urls) {
    try {
      const { buf: fbuf } = await fetchBuf(wu);
      const u = new URL(wu);
      const fp = path.join(out, 'external', 'fonts.gstatic.com', u.pathname.replace(/^\//, ''));
      ensureDir(fp);
      fs.writeFileSync(fp, fbuf);
      console.log('OK', wu);
    } catch (e) {
      console.log('MISS', wu, String(e.message || e));
    }
  }
} catch (e) {
  console.log('google err', String(e.message || e));
}

console.log('done', seen.size, 'routes seen');
