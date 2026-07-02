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

const cspHeader = [
  "default-src 'self'",
  "script-src 'self' https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://portal.onvver.com https://*.supabase.co wss://*.supabase.co",
  "object-src 'none'",
  "base-uri 'self'",
  "frame-ancestors 'self'"
].join('; ');

const company = {
  name: 'ONV Verbund',
  address: 'Schönebecker Str. 33',
  postalCity: '42283 Wuppertal',
  country: 'Deutschland',
  representative: 'Diana Rasina',
  registry: 'Amtsgericht Wuppertal, HRB 32086',
  email: 'info@onvver.com',
  phone: '+49 1520 8498 39'
};

const legalPages = {
  '/impressum': {
    title: 'Impressum',
    subtitle: 'Angaben gemäß § 5 TMG',
    sections: [
      {
        heading: 'Anbieter',
        body: [
          company.name,
          company.address,
          company.postalCity,
          company.country,
          `Vertreten durch: ${company.representative}`,
          company.registry
        ]
      },
      {
        heading: 'Kontakt',
        body: [`E-Mail: ${company.email}`, `Telefon: ${company.phone}`]
      },
      {
        heading: 'Haftung für Inhalte',
        body: [
          'Die Inhalte dieser Website werden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte übernehmen wir jedoch keine Gewähr.',
          'Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.'
        ]
      },
      {
        heading: 'Haftung für Links',
        body: [
          'Diese Website kann Links zu externen Websites Dritter enthalten. Auf deren Inhalte haben wir keinen Einfluss. Für diese fremden Inhalte übernehmen wir keine Gewähr.'
        ]
      }
    ]
  },
  '/datenschutz': {
    title: 'Datenschutz',
    subtitle: 'Informationen zur Verarbeitung personenbezogener Daten',
    sections: [
      {
        heading: 'Verantwortlicher',
        body: [
          `${company.name}, ${company.address}, ${company.postalCity}, ${company.country}`,
          `Kontakt: ${company.email}`
        ]
      },
      {
        heading: 'Verarbeitete Daten',
        body: [
          'Wir verarbeiten technische Zugriffsdaten, Kontaktangaben, Bewerbungsdaten und Kommunikationsdaten nur soweit dies zur Bereitstellung der Website, zur Bearbeitung von Anfragen oder zur Durchführung von Bewerbungsprozessen erforderlich ist.'
        ]
      },
      {
        heading: 'Zwecke und Rechtsgrundlagen',
        body: [
          'Die Verarbeitung erfolgt zur Vertragserfüllung, zur Durchführung vorvertraglicher Maßnahmen, zur Erfüllung gesetzlicher Pflichten sowie auf Grundlage berechtigter Interessen an einem sicheren und stabilen Betrieb der Website.',
          'Soweit eine Einwilligung erforderlich ist, erfolgt die Verarbeitung ausschließlich auf Grundlage dieser Einwilligung.'
        ]
      },
      {
        heading: 'Speicherdauer',
        body: [
          'Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.'
        ]
      },
      {
        heading: 'Ihre Rechte',
        body: [
          'Sie haben im Rahmen der gesetzlichen Voraussetzungen Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.',
          `Anfragen richten Sie bitte an ${company.email}.`
        ]
      }
    ]
  },
  '/agb': {
    title: 'Allgemeine Geschäftsbedingungen',
    subtitle: 'Nutzungsbedingungen für die Leistungen von ONV Verbund',
    sections: [
      {
        heading: 'Geltungsbereich',
        body: [
          'Diese Allgemeinen Geschäftsbedingungen gelten für die Nutzung der digitalen Angebote und Leistungen von ONV Verbund, soweit keine abweichenden schriftlichen Vereinbarungen getroffen wurden.'
        ]
      },
      {
        heading: 'Leistungsgegenstand',
        body: [
          'ONV Verbund unterstützt bei Analyse, Prüfung und Optimierung digitaler Prozesse. Umfang, Zeitplan und konkrete Ergebnisse richten sich nach der jeweiligen Vereinbarung.'
        ]
      },
      {
        heading: 'Mitwirkungspflichten',
        body: [
          'Kunden stellen die für die Leistungserbringung erforderlichen Informationen, Zugänge und Ansprechpartner rechtzeitig bereit. Verzögerungen durch fehlende Mitwirkung können Auswirkungen auf Termine und Ergebnisse haben.'
        ]
      },
      {
        heading: 'Vertraulichkeit und Datenschutz',
        body: [
          'Vertrauliche Informationen werden geschützt und nur für die vereinbarten Zwecke verwendet. Personenbezogene Daten werden nach den geltenden Datenschutzvorschriften verarbeitet.'
        ]
      },
      {
        heading: 'Haftung',
        body: [
          'Die Haftung richtet sich nach den gesetzlichen Vorschriften. Für einfache Fahrlässigkeit haften wir nur bei Verletzung wesentlicher Vertragspflichten und begrenzt auf den vorhersehbaren, vertragstypischen Schaden.'
        ]
      }
    ]
  },
  '/cookies': {
    title: 'Cookies',
    subtitle: 'Hinweise zum Einsatz von Cookies und ähnlichen Technologien',
    sections: [
      {
        heading: 'Was sind Cookies?',
        body: [
          'Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Sie helfen dabei, Websites technisch bereitzustellen, Einstellungen zu speichern oder bestimmte Funktionen zu ermöglichen.'
        ]
      },
      {
        heading: 'Technisch notwendige Cookies',
        body: [
          'Wir verwenden notwendige Cookies, um die Website sicher und funktionsfähig bereitzustellen, zum Beispiel für Sitzungen, Formularschutz und Sicherheitseinstellungen.'
        ]
      },
      {
        heading: 'Optionale Cookies',
        body: [
          'Optionale Analyse- oder Marketing-Cookies werden nur eingesetzt, wenn hierfür eine wirksame Einwilligung vorliegt.'
        ]
      },
      {
        heading: 'Verwaltung',
        body: [
          'Sie können Cookies über Ihre Browsereinstellungen löschen oder blockieren. Die Deaktivierung notwendiger Cookies kann die Funktionalität der Website einschränken.'
        ]
      }
    ]
  }
};

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function sendLegalPage(res, page) {
  const sections = page.sections
    .map((section) => `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n')}
      </section>`)
    .join('\n');

  const html = `<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(page.title)} | ONV Verbund</title>
    <style>
      :root { --blue: #3255ef; --navy: #111547; --text: #111827; --muted: #5f6876; }
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Poppins, Arial, sans-serif; color: var(--text); background: #fff; }
      .hero { background: radial-gradient(circle at 62% 0%, rgba(50,85,239,.42), transparent 34%), var(--navy); color: #fff; padding: 34px 20px 68px; text-align: center; }
      .nav { max-width: 1280px; height: 70px; margin: 0 auto 62px; border-radius: 999px; background: #fff; display: flex; align-items: center; justify-content: space-between; padding: 0 18px 0 30px; color: var(--text); box-shadow: 0 20px 50px rgba(0,0,0,.16); }
      .brand { color: var(--blue); font-size: 24px; font-weight: 700; letter-spacing: -.04em; text-decoration: none; }
      .button { display: inline-flex; align-items: center; justify-content: center; min-width: 144px; height: 48px; border-radius: 999px; background: var(--blue); color: #fff; font-size: 14px; font-weight: 700; text-decoration: none; }
      .hero h1 { margin: 0 0 12px; font-size: clamp(38px, 5vw, 58px); line-height: 1.05; letter-spacing: -.04em; }
      .hero p { margin: 0; font-size: 18px; opacity: .9; }
      main { max-width: 1280px; margin: 0 auto; padding: 56px 20px 84px; }
      section { padding: 24px 0; border-bottom: 1px solid #e8ebf0; }
      h2 { margin: 0 0 12px; font-size: 24px; line-height: 1.2; color: var(--blue); }
      p { margin: 0 0 10px; max-width: 900px; color: var(--muted); font-size: 17px; line-height: 1.75; }
      footer { background: #130f35; color: #fff; }
      .footer-inner { max-width: 1280px; margin: 0 auto; padding: 28px 20px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
      .footer-links { display: flex; gap: 36px; }
      .footer-links a, footer span { color: rgba(255,255,255,.74); text-decoration: none; font-size: 15px; }
      @media (max-width: 720px) {
        .nav { height: 58px; padding: 0 10px 0 18px; margin-bottom: 44px; }
        .brand { font-size: 20px; }
        .button { min-width: 118px; height: 40px; font-size: 13px; }
        .hero { padding-top: 22px; }
        main { padding-top: 38px; }
        .footer-inner { flex-direction: column; align-items: flex-start; }
      }
    </style>
  </head>
  <body>
    <header class="hero">
      <nav class="nav">
        <a class="brand" href="/">ONV Verbund</a>
        <a class="button" href="/Bewerbung">Jetzt starten</a>
      </nav>
      <h1>${escapeHtml(page.title)}</h1>
      <p>${escapeHtml(page.subtitle)}</p>
    </header>
    <main>${sections}</main>
    <footer>
      <div class="footer-inner">
        <strong>ONV Verbund</strong>
        <div class="footer-links">
          <a href="/impressum">Impressum</a>
          <a href="/datenschutz">Datenschutz</a>
          <a href="/cookies">Cookies</a>
        </div>
        <span>© 2026 ONV Verbund. Alle Rechte vorbehalten.</span>
      </div>
    </footer>
  </body>
</html>`;

  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-cache',
    'Content-Security-Policy': cspHeader
  });
  res.end(html);
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': 'no-cache',
    'Content-Security-Policy': cspHeader
  });
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

  const legalPath = pathname.toLowerCase();
  if (legalPages[legalPath]) {
    return sendLegalPage(res, legalPages[legalPath]);
  }

  let filePath = path.join(root, pathname.replace(/^\//, ''));

  if (pathname === '/') filePath = path.join(root, 'index.html');

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return sendFile(res, filePath);
  }

  // SPA fallback for frontend routes
  const fallback = path.join(root, 'index.html');
  if (fs.existsSync(fallback)) {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Content-Security-Policy': cspHeader
    });
    return fs.createReadStream(fallback).pipe(res);
  }

  res.writeHead(404, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Security-Policy': cspHeader
  });
  res.end('Not found');
}).listen(port, '0.0.0.0', () => {
  console.log(`magicvics mirror server running on 0.0.0.0:${port}`);
});
