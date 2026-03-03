import http from 'http';
import https from 'https';
import fs from 'fs';
import path from 'path';
import url from 'url';

const apiTarget = process.env.API_TARGET || 'http://localhost:4000';

const root = path.resolve('.');
const port = process.env.PORT ? Number(process.env.PORT) : 4173;

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json; charset=utf-8'
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': type, 'Cache-Control': 'no-cache' });
  fs.createReadStream(filePath).pipe(res);
}

function proxyApi(req, res) {
  const target = new URL(req.url || '/', apiTarget);
  const requestLib = target.protocol === 'https:' ? https : http;
  const headers = { ...req.headers, host: target.host };

  const upstreamReq = requestLib.request(
    target,
    {
      method: req.method,
      headers
    },
    (upstreamRes) => {
      res.writeHead(upstreamRes.statusCode || 502, upstreamRes.headers);
      upstreamRes.pipe(res);
    }
  );

  upstreamReq.on('error', (err) => {
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ success: false, message: 'API proxy error', error: String(err) }));
  });

  req.pipe(upstreamReq);
}

http.createServer((req, res) => {
  const parsed = url.parse(req.url || '/');
  const pathname = decodeURIComponent(parsed.pathname || '/');

  if (pathname.startsWith('/api/')) {
    return proxyApi(req, res);
  }

  let filePath = path.join(root, pathname.replace(/^\//, ''));

  if (pathname === '/') filePath = path.join(root, 'index.html');

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return sendFile(res, filePath);
  }

  // SPA fallback for frontend routes
  const fallback = path.join(root, 'index.html');
  if (fs.existsSync(fallback)) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    return fs.createReadStream(fallback).pipe(res);
  }

  res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Not found');
}).listen(port, '0.0.0.0', () => {
  console.log(`magicvics mirror server running on 0.0.0.0:${port}`);
});
