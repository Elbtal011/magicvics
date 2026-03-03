(() => {
  const DEMO_MODE = true; // DEMO-ONLY: always enabled in this mirror build.
  if (!DEMO_MODE) return;

  const DEMO_FLAG_KEY = 'MV_DEMO_AUTH';
  localStorage.setItem(DEMO_FLAG_KEY, '1');
  sessionStorage.setItem('isAdminUser', 'true');
  sessionStorage.setItem('userDashboardRole', 'admin');

  // Login flow restored: no forced redirect to admin dashboard.

  // Brand tweak requested by Jay: remove icon + rename to "MagicVics 2".
  function applyBrandPatch() {
    let patched = false;

    const headings = Array.from(document.querySelectorAll('h1'));
    headings.forEach((heading) => {
      const txt = (heading.textContent || '').trim();
      if (/^magicvics(\s+demo)?$/i.test(txt) || /magicvics/i.test(txt)) {
        if (heading.textContent !== 'MagicVics 2') {
          heading.textContent = 'MagicVics 2';
        }
        patched = true;
      }
    });

    // Remove/hide logo icon near sidebar brand title.
    const sidebar = document.querySelector('aside, nav');
    if (sidebar) {
      const brandTextEl = Array.from(sidebar.querySelectorAll('h1, .font-bold, .font-semibold')).find((el) =>
        /magicvics/i.test((el.textContent || '').trim())
      );
      if (brandTextEl) {
        const logo = brandTextEl.parentElement?.querySelector('img, svg');
        if (logo) {
          logo.remove();
          patched = true;
        }
      }
    }

    return patched;
  }

  // CSS fallback: hide first logo in sidebar header row even after rerenders.
  const brandStyle = document.createElement('style');
  brandStyle.textContent = `
    aside h1{letter-spacing:0}
    aside h1::before{content:''}
    aside h1{font-variant-ligatures:none}
    aside div:has(> h1) > img,
    aside div:has(> h1) > svg,
    nav div:has(> h1) > img,
    nav div:has(> h1) > svg{display:none !important}
  `;
  document.head.appendChild(brandStyle);

  // Keep enforcing because React rerenders can restore original text/icon.
  const enforceBrand = () => applyBrandPatch();

  // Top "?" help icon should always open /admin/support.
  function patchSupportHelpIcon() {
    const candidates = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    let patched = false;

    for (const el of candidates) {
      const txt = (el.textContent || '').trim();
      const title = (el.getAttribute('title') || '').toLowerCase();
      const aria = (el.getAttribute('aria-label') || '').toLowerCase();
      const looksLikeHelp =
        txt === '?' ||
        /\b(help|hilfe|support)\b/.test(title) ||
        /\b(help|hilfe|support)\b/.test(aria);

      if (!looksLikeHelp) continue;

      // Prefer patching top navigation/header controls only.
      const inTopBar = !!el.closest('header, [class*="top"], [class*="navbar"], [class*="nav"]');
      if (!inTopBar) continue;

      const targetPath = '/admin/support';

      if (el.tagName === 'A') {
        const a = el;
        if (a.getAttribute('href') !== targetPath) {
          a.setAttribute('href', targetPath);
          patched = true;
        }
      }

      if (!el.dataset.mvSupportPatched) {
        el.addEventListener(
          'click',
          (ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            if (location.pathname !== targetPath) {
              history.pushState({}, '', targetPath);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }
          },
          true
        );
        el.dataset.mvSupportPatched = '1';
        patched = true;
      }
    }

    return patched;
  }

  const jobUiCache = { at: 0, rows: null };

  async function patchAppliedJobDisplay() {
    const m = location.pathname.match(/^\/admin\/job-applications\/([^/?#]+)/i);
    if (!m) return false;
    const appId = decodeURIComponent(m[1]);

    try {
      const nowMs = Date.now();
      if (!jobUiCache.rows || nowMs - jobUiCache.at > 15000) {
        const resp = await fetch('/api/admin/job-applications');
        const payload = await resp.json().catch(() => ({}));
        jobUiCache.rows = Array.isArray(payload?.data) ? payload.data : [];
        jobUiCache.at = nowMs;
      }

      const row = (jobUiCache.rows || []).find((x) => String(x.id) === String(appId));
      if (!row) return false;

      const appliedTitle =
        (row.job_listing && row.job_listing.title) ||
        row.position_applied ||
        row.job_title ||
        row.application_type ||
        'Initiativbewerbung';

      // Replace "Art der Bewerbung" value text (fallback for stale compiled UI logic).
      const labels = Array.from(document.querySelectorAll('p,span,div')).filter((el) =>
        (el.textContent || '').trim().toLowerCase() === 'art der bewerbung'
      );
      labels.forEach((labelEl) => {
        const container = labelEl.closest('div');
        if (!container) return;
        const candidates = Array.from(container.querySelectorAll('p,span,div')).filter((el) => el !== labelEl);
        const valueEl = candidates.find((el) => {
          const txt = (el.textContent || '').trim();
          return txt && txt.toLowerCase() === 'initiativbewerbung';
        }) || candidates.find((el) => (el.textContent || '').trim().length > 0);

        if (valueEl && valueEl.textContent !== appliedTitle) {
          valueEl.textContent = appliedTitle;
        }
      });

      return true;
    } catch {
      return false;
    }
  }

  const enforceUiPatches = () => {
    enforceBrand();
    patchSupportHelpIcon();
    patchAppliedJobDisplay();
  };

  const run = () => {
    enforceUiPatches();
    setTimeout(enforceUiPatches, 100);
    setTimeout(enforceUiPatches, 500);
    setTimeout(enforceUiPatches, 1500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  const brandObserver = new MutationObserver(() => enforceUiPatches());
  brandObserver.observe(document.documentElement, { childList: true, subtree: true });

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 86400;
  const isoNow = () => new Date().toISOString();
  const randomId = (p = 'demo') => `${p}-${Math.random().toString(36).slice(2, 10)}`;

  const DEMO_LOGIN = {
    email: 'demo-admin@local.test',
    password: 'MagicVicsDemo!2026'
  };

  const fakeUser = {
    id: '00000000-0000-4000-8000-000000000001',
    aud: 'authenticated',
    role: 'authenticated',
    email: DEMO_LOGIN.email,
    user_metadata: { role: 'admin', first_name: 'Demo', last_name: 'Admin' }
  };

  const fakeSession = {
    access_token: 'demo-access-token',
    refresh_token: 'demo-refresh-token',
    token_type: 'bearer',
    expires_in: 86400,
    expires_at: exp,
    user: fakeUser
  };

  const storageKey = 'supabase.auth.token.' + btoa(location.origin).slice(0, 8);

  const getStoredSession = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  const setStoredSession = (session) => {
    localStorage.setItem(storageKey, JSON.stringify(session));
    localStorage.setItem(storageKey + '-user', JSON.stringify({ user: fakeUser }));
  };

  const clearStoredSession = () => {
    localStorage.removeItem(storageKey);
    localStorage.removeItem(storageKey + '-user');
  };

  // One-time migration: clear old auto-login session so login page is restored.
  if (localStorage.getItem('MV_LOGIN_RESTORED_V1') !== '1') {
    clearStoredSession();
    localStorage.setItem('MV_LOGIN_RESTORED_V1', '1');
  }

  const seed = {
    profiles: [
      {
        id: fakeUser.id,
        role: 'admin',
        first_name: 'Demo',
        last_name: 'Admin',
        email: fakeUser.email,
        phone: '+49170000000',
        kyc_status: 'approved',
        is_main_admin: true,
        main_admin: true,
        // keep null so UI does not treat this user as sub-admin-limited
        admin_permissions: null,
        updated_at: isoNow(),
        created_at: isoNow()
      },
      {
        id: 'emp-1',
        role: 'user',
        first_name: 'Lina',
        last_name: 'Schmidt',
        email: 'lina@magicvics.test',
        phone: '+491701111111',
        kyc_status: 'in_review',
        admin_notes: 'Demo user for employee detail page.',
        created_at: isoNow(),
        updated_at: isoNow()
      },
      {
        id: 'emp-2',
        role: 'user',
        first_name: 'Noah',
        last_name: 'Weber',
        email: 'noah@magicvics.test',
        phone: '+491702222222',
        kyc_status: 'pending',
        admin_notes: '',
        created_at: isoNow(),
        updated_at: isoNow()
      }
    ],

    // Core modules requested
    employees: [
      { id: 'emp-1', first_name: 'Lina', last_name: 'Schmidt', email: 'lina@magicvics.test', role: 'caller', status: 'active', created_at: isoNow(), updated_at: isoNow() },
      { id: 'emp-2', first_name: 'Noah', last_name: 'Weber', email: 'noah@magicvics.test', role: 'support', status: 'inactive', created_at: isoNow(), updated_at: isoNow() }
    ],
    job_applications: [
      { id: 'ja-1', status: 'pending', created_at: isoNow(), first_name: 'Max', last_name: 'Mustermann', email: 'max@example.com', phone: '+49123456789' },
      { id: 'ja-2', status: 'in_review', created_at: isoNow(), first_name: 'Anna', last_name: 'Beispiel', email: 'anna@example.com', phone: '+49111222333' }
    ],
    kyc_submissions: [
      { id: 'kyc-1', status: 'pending', first_name: 'Mia', last_name: 'Braun', created_at: isoNow() },
      { id: 'kyc-2', status: 'in_review', first_name: 'Jonas', last_name: 'Keller', created_at: isoNow() }
    ],
    task_submissions: [
      {
        id: 'sub-1',
        status: 'pending',
        created_at: isoNow(),
        user_id: fakeUser.id,
        profiles: { id: fakeUser.id, first_name: 'Demo', last_name: 'Admin', email: fakeUser.email }
      },
      {
        id: 'sub-2',
        status: 'approved',
        created_at: isoNow(),
        user_id: fakeUser.id,
        profiles: { id: 'emp-1', first_name: 'Lina', last_name: 'Schmidt', email: 'lina@magicvics.test' }
      }
    ],
    tasks: [
      { id: 'task-1', title: 'Onboarding Call', status: 'open', priority: 'high', created_at: isoNow() },
      { id: 'task-2', title: 'KYC Follow-up', status: 'in_progress', priority: 'medium', created_at: isoNow() }
    ],
    task_templates: [
      {
        id: 'tt-1',
        title: 'Telefonleitfaden prüfen',
        description: 'Starter-Aufgabe zur Prüfung des Telefonleitfadens.',
        type: 'standard',
        priority: 'medium',
        estimated_hours: 2,
        is_starter_job: true,
        order_number: 1,
        created_at: isoNow(),
        updated_at: isoNow()
      },
      {
        id: 'tt-2',
        title: 'Dokumentation QA',
        description: 'Qualitätssicherung und Dokumentation der Ergebnisse.',
        type: 'standard',
        priority: 'high',
        estimated_hours: 3,
        is_starter_job: false,
        order_number: 2,
        created_at: isoNow(),
        updated_at: isoNow()
      },
      {
        id: 'tt-3',
        title: 'KYC-Verifizierung',
        description: 'Prüfung von KYC-Unterlagen inkl. Plausibilitätscheck.',
        type: 'standard',
        priority: 'low',
        estimated_hours: 1,
        is_starter_job: false,
        order_number: 3,
        created_at: isoNow(),
        updated_at: isoNow()
      }
    ],
    task_assignments: [
      {
        id: 'ta-1',
        status: 'pending',
        submitted_at: null,
        assignee_id: fakeUser.id,
        task_template_id: 'tt-1',
        created_at: isoNow(),
        profiles: { id: fakeUser.id, first_name: 'Demo', last_name: 'Admin', email: fakeUser.email },
        task_templates: { id: 'tt-1', title: 'Telefonleitfaden prüfen', type: 'standard' },
        task_template: { id: 'tt-1', title: 'Telefonleitfaden prüfen', type: 'standard' }
      },
      {
        id: 'ta-2',
        status: 'submitted',
        submitted_at: isoNow(),
        assignee_id: 'emp-1',
        task_template_id: 'tt-2',
        created_at: isoNow(),
        profiles: { id: 'emp-1', first_name: 'Lina', last_name: 'Schmidt', email: 'lina@magicvics.test' },
        task_templates: { id: 'tt-2', title: 'Dokumentation QA', type: 'standard' },
        task_template: { id: 'tt-2', title: 'Dokumentation QA', type: 'standard' }
      },
      {
        id: 'ta-3',
        status: 'submitted',
        submitted_at: isoNow(),
        assignee_id: 'emp-2',
        task_template_id: 'tt-3',
        created_at: isoNow(),
        profiles: { id: 'emp-2', first_name: 'Noah', last_name: 'Weber', email: 'noah@magicvics.test' },
        task_templates: { id: 'tt-3', title: 'KYC-Verifizierung', type: 'standard' },
        task_template: { id: 'tt-3', title: 'KYC-Verifizierung', type: 'standard' }
      }
    ],
    ident_requests: [
      { id: 'ident-1', status: 'pending', created_at: isoNow() },
      { id: 'ident-2', status: 'reviewed', created_at: isoNow() }
    ],
    task_ratings: [
      {
        id: 'rate-1',
        rating: 5,
        comment: 'Sehr gut erledigt',
        created_at: isoNow(),
        profiles: { id: fakeUser.id, first_name: 'Demo', last_name: 'Admin', email: fakeUser.email },
        task_submission: {
          id: 'sub-1',
          status: 'submitted',
          profiles: { id: fakeUser.id, first_name: 'Demo', last_name: 'Admin', email: fakeUser.email }
        },
        task_submissions: {
          id: 'sub-1',
          status: 'submitted',
          profiles: { id: fakeUser.id, first_name: 'Demo', last_name: 'Admin', email: fakeUser.email }
        },
        task_assignments: {
          id: 'ta-1',
          status: 'pending',
          profiles: { id: fakeUser.id, first_name: 'Demo', last_name: 'Admin', email: fakeUser.email },
          task_templates: { id: 'tt-1', title: 'Telefonleitfaden prüfen', type: 'standard' }
        }
      },
      {
        id: 'rate-2',
        rating: 4,
        comment: 'Gute Ausführung',
        created_at: isoNow(),
        profiles: { id: 'emp-1', first_name: 'Lina', last_name: 'Schmidt', email: 'lina@magicvics.test' },
        task_submission: {
          id: 'sub-2',
          status: 'approved',
          profiles: { id: 'emp-1', first_name: 'Lina', last_name: 'Schmidt', email: 'lina@magicvics.test' }
        },
        task_submissions: {
          id: 'sub-2',
          status: 'approved',
          profiles: { id: 'emp-1', first_name: 'Lina', last_name: 'Schmidt', email: 'lina@magicvics.test' }
        },
        task_assignments: {
          id: 'ta-2',
          status: 'submitted',
          profiles: { id: 'emp-1', first_name: 'Lina', last_name: 'Schmidt', email: 'lina@magicvics.test' },
          task_templates: { id: 'tt-2', title: 'Dokumentation QA', type: 'standard' }
        }
      },
      {
        id: 'rate-3',
        rating: 3,
        comment: 'In Ordnung',
        created_at: isoNow(),
        profiles: { id: 'emp-2', first_name: 'Noah', last_name: 'Weber', email: 'noah@magicvics.test' },
        task_submission: {
          id: 'sub-3',
          status: 'submitted',
          profiles: { id: 'emp-2', first_name: 'Noah', last_name: 'Weber', email: 'noah@magicvics.test' }
        },
        task_submissions: {
          id: 'sub-3',
          status: 'submitted',
          profiles: { id: 'emp-2', first_name: 'Noah', last_name: 'Weber', email: 'noah@magicvics.test' }
        },
        task_assignments: {
          id: 'ta-3',
          status: 'submitted',
          profiles: { id: 'emp-2', first_name: 'Noah', last_name: 'Weber', email: 'noah@magicvics.test' },
          task_templates: { id: 'tt-3', title: 'KYC-Verifizierung', type: 'standard' }
        }
      }
    ],
    contracts: [{ id: 'c-1', is_template: true, is_active: true, title: 'Demo Vertrag', created_at: isoNow() }],
    job_listings: [{ id: 'jl-1', title: 'Caller (m/w/d)', status: 'active', created_at: isoNow() }],
    callers: [{ id: 'caller-1', first_name: 'Murat', last_name: 'Demir', created_at: isoNow() }],
    phone_numbers: [
      {
        id: 'ph-1',
        rent_id: 'rent-1',
        number: '+49170000001',
        phone_number: '+49170000001',
        service: 'go',
        country: '98',
        assignee_id: 'emp-1',
        status: 'active',
        provider: 'anosim',
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: isoNow(),
        updated_at: isoNow()
      },
      {
        id: 'ph-2',
        rent_id: 'rent-2',
        number: '+49170000002',
        phone_number: '+49170000002',
        service: 'wa',
        country: '286',
        assignee_id: null,
        status: 'active',
        provider: 'gogetsms',
        end_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        created_at: isoNow(),
        updated_at: isoNow()
      }
    ],
    worker_tags: [
      { id: 'tag-1', name: 'Top Performer', color: '#10b981', description: 'Consistently high quality', created_at: isoNow() },
      { id: 'tag-2', name: 'Needs Follow-up', color: '#f59e0b', description: 'Requires reminder contact', created_at: isoNow() }
    ],
    worker_tag_assignments: [
      {
        id: 'wta-1',
        worker_id: 'emp-1',
        tag_id: 'tag-1',
        tag: { id: 'tag-1', name: 'Top Performer', color: '#10b981', description: 'Consistently high quality' },
        created_at: isoNow()
      },
      {
        id: 'wta-2',
        worker_id: 'emp-2',
        tag_id: 'tag-2',
        tag: { id: 'tag-2', name: 'Needs Follow-up', color: '#f59e0b', description: 'Requires reminder contact' },
        created_at: isoNow()
      }
    ],
    bankdrops: [{ id: 'b-1', status: 'active', created_at: isoNow() }],
    chats: [{ id: 'chat-1', subject: 'Demo Chat Thread', status: 'open', created_at: isoNow() }],
    chat_monitoring: [{ id: 'cm-1', channel: 'demo', status: 'active', created_at: isoNow() }],
    chat_conversations: [
      {
        id: 'conv-demo-1',
        title: 'Onboarding Hilfe',
        created_at: isoNow(),
        updated_at: isoNow(),
        archived_at: null,
        deleted_at: null,
        conversation_type: 'support',
        created_by: 'emp-1',
        user_profile: {
          id: 'emp-1',
          first_name: 'Lina',
          last_name: 'Schmidt',
          email: 'lina@magicvics.test',
          role: 'user',
          kyc_status: 'pending'
        }
      },
      {
        id: 'conv-demo-2',
        title: 'Allgemeine Frage',
        created_at: isoNow(),
        updated_at: isoNow(),
        archived_at: null,
        deleted_at: null,
        conversation_type: 'general',
        created_by: 'emp-2',
        user_profile: {
          id: 'emp-2',
          first_name: 'Noah',
          last_name: 'Weber',
          email: 'noah@magicvics.test',
          role: 'user',
          kyc_status: 'approved'
        }
      }
    ],
    chat_messages: [
      {
        id: 'msg-demo-1',
        conversation_id: 'conv-demo-1',
        sender_id: 'emp-1',
        sender_type: 'user',
        message_type: 'text',
        content: 'Hi, ich finde meine Starter-Aufgabe nicht.',
        attachments: [],
        metadata: {},
        created_at: isoNow(),
        updated_at: isoNow(),
        edited_at: null,
        deleted_at: null
      },
      {
        id: 'msg-demo-2',
        conversation_id: 'conv-demo-1',
        sender_id: null,
        sender_type: 'ai',
        message_type: 'text',
        content: 'Kein Problem — öffne bitte den Bereich Aufgaben und wähle die erste Starter-Aufgabe.',
        attachments: [],
        metadata: { auto_reply: true },
        created_at: isoNow(),
        updated_at: isoNow(),
        edited_at: null,
        deleted_at: null
      },
      {
        id: 'msg-demo-3',
        conversation_id: 'conv-demo-2',
        sender_id: 'emp-2',
        sender_type: 'user',
        message_type: 'text',
        content: 'Wann wird meine Auszahlung verarbeitet?',
        attachments: [],
        metadata: {},
        created_at: isoNow(),
        updated_at: isoNow(),
        edited_at: null,
        deleted_at: null
      },
      {
        id: 'msg-demo-4',
        conversation_id: 'conv-demo-2',
        sender_id: null,
        sender_type: 'ai',
        message_type: 'text',
        content: 'Sobald ein Admin freigibt, dauert es üblicherweise 1-3 Werktage.',
        attachments: [],
        metadata: { auto_reply: true },
        created_at: isoNow(),
        updated_at: isoNow(),
        edited_at: null,
        deleted_at: null
      }
    ],
    emails: [{ id: 'mail-1', subject: 'Willkommen bei MagicVics', status: 'sent', created_at: isoNow() }],
    email_history: [{ id: 'eh-1', subject: 'Demo History Entry', status: 'delivered', created_at: isoNow() }],
    email_providers: [{ id: 'ep-1', name: 'Demo SMTP', is_active: true, created_at: isoNow() }],

    // AI knowledge base demo data for /admin/ai-knowledge panels
    knowledge_base_categories: [
      { id: 'kbc-1', name: 'Onboarding', description: 'Häufige Fragen zum Einstieg', created_at: isoNow(), updated_at: isoNow() },
      { id: 'kbc-2', name: 'KYC', description: 'Identität und Verifizierungsprozess', created_at: isoNow(), updated_at: isoNow() },
      { id: 'kbc-3', name: 'Zahlungen', description: 'Auszahlung, Vergütung und Abrechnung', created_at: isoNow(), updated_at: isoNow() }
    ],
    knowledge_base_articles: [
      {
        id: 'kba-1',
        category_id: 'kbc-1',
        title: 'Erster Arbeitstag: Ablauf',
        summary: 'Schritte vom Login bis zur ersten abgeschlossenen Aufgabe.',
        content: '1) Einloggen\n2) Profil prüfen\n3) Starter-Aufgabe öffnen\n4) Nach Abschluss Status kontrollieren.',
        is_published: true,
        ai_training_enabled: true,
        context_priority: 9,
        response_template: 'Danke für deine Frage zum Einstieg. Hier ist der Ablauf: {{steps}}',
        ai_effectiveness_score: 8.6,
        ai_usage_count: 42,
        helpful_votes: 18,
        unhelpful_votes: 1,
        view_count: 123,
        last_ai_usage: isoNow(),
        created_by: fakeUser.id,
        created_at: isoNow(),
        updated_at: isoNow(),
        category: { id: 'kbc-1', name: 'Onboarding' },
        knowledge_base_categories: { id: 'kbc-1', name: 'Onboarding' }
      },
      {
        id: 'kba-2',
        category_id: 'kbc-2',
        title: 'KYC: Dokumente und häufige Fehler',
        summary: 'Welche Dokumente akzeptiert werden und was oft zu Ablehnungen führt.',
        content: 'Akzeptiert: Ausweis, Wohnsitznachweis. Häufige Fehler: unscharfe Fotos, abgeschnittene Ränder.',
        is_published: true,
        ai_training_enabled: true,
        context_priority: 8,
        response_template: 'Für KYC brauchst du folgende Unterlagen: {{documents}}',
        ai_effectiveness_score: 7.9,
        ai_usage_count: 31,
        helpful_votes: 12,
        unhelpful_votes: 2,
        view_count: 88,
        last_ai_usage: isoNow(),
        created_by: fakeUser.id,
        created_at: isoNow(),
        updated_at: isoNow(),
        category: { id: 'kbc-2', name: 'KYC' },
        knowledge_base_categories: { id: 'kbc-2', name: 'KYC' }
      },
      {
        id: 'kba-3',
        category_id: 'kbc-3',
        title: 'Auszahlung: Status und Fristen',
        summary: 'Wann Auszahlungen genehmigt werden und wie lange die Bearbeitung dauert.',
        content: 'Auszahlungen werden nach Admin-Freigabe verarbeitet. Übliche Dauer: 1-3 Werktage.',
        is_published: true,
        ai_training_enabled: false,
        context_priority: 5,
        response_template: null,
        ai_effectiveness_score: 6.8,
        ai_usage_count: 9,
        helpful_votes: 6,
        unhelpful_votes: 0,
        view_count: 45,
        last_ai_usage: isoNow(),
        created_by: fakeUser.id,
        created_at: isoNow(),
        updated_at: isoNow(),
        category: { id: 'kbc-3', name: 'Zahlungen' },
        knowledge_base_categories: { id: 'kbc-3', name: 'Zahlungen' }
      }
    ],
    ai_training_examples: [
      {
        id: 'ate-1',
        article_id: 'kba-1',
        is_active: true,
        question: 'Wie starte ich meine erste Aufgabe?',
        answer: 'Öffne den Bereich Aufgaben und beginne mit der Starter-Aufgabe.',
        created_by: fakeUser.id,
        created_at: isoNow(),
        updated_at: isoNow()
      }
    ],
    ai_knowledge_metrics: [],

    html_injections: [],

    notifications: [
      { id: 'n-1', title: 'Neue Bewerbung', type: 'job_application_received', is_critical: true, read_at: null, created_at: isoNow() },
      { id: 'n-2', title: 'Aufgabe eingereicht', type: 'task_submitted', is_critical: false, read_at: null, created_at: isoNow() }
    ],
    settings: [{
      id: 'settings-1',
      website_name: 'MagicVics 2',
      kyc_required_for_tasks: false,
      // Match live dashboard layout: hide payment cards by using contract-based mode.
      payment_mode: 'vertragsbasis',
      primary_color: '#ee1d3c',
      accent_color: '#231f20',
      html_injections_enabled: false,
      updated_at: isoNow()
    }],

    // common aux tables used by UI actions
    worker_balances: [
      { id: 'wb-1', worker_id: fakeUser.id, current_balance: 0, total_earned: 0, total_paid_out: 0, created_at: isoNow() },
      { id: 'wb-2', worker_id: 'emp-1', current_balance: 214.5, total_earned: 540.0, total_paid_out: 325.5, created_at: isoNow() },
      { id: 'wb-3', worker_id: 'emp-2', current_balance: 78.0, total_earned: 180.0, total_paid_out: 102.0, created_at: isoNow() }
    ],
    time_entries: [
      { id: 'te-1', employee_id: 'emp-1', hours: 7.5, status: 'approved', created_at: isoNow() },
      { id: 'te-2', employee_id: 'emp-1', hours: 6.0, status: 'approved', created_at: isoNow() },
      { id: 'te-3', employee_id: 'emp-2', hours: 3.5, status: 'approved', created_at: isoNow() }
    ],
    task_attachments: [],
    contract_assignments: [],
    payouts: []
  };

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
  const store = new Map(Object.entries(deepClone(seed)));

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const params = new URLSearchParams(location.search);

  // Backend is now default.
  // - Force demo mode with ?backend=0 or MV_USE_REAL_API=0
  // - Force backend mode with ?backend=1 (overrides stale localStorage demo flag)
  const backendParam = params.get('backend');
  const lsRealApi = localStorage.getItem('MV_USE_REAL_API');
  const useRealApi = backendParam === '1' ? true : backendParam === '0' ? false : lsRealApi === '0' ? false : true;

  const demoDelayMs = Number(localStorage.getItem('MV_DEMO_DELAY_MS') || params.get('demoDelayMs') || 120);

  const asHeaders = (h) => {
    if (!h) return new Headers();
    if (h instanceof Headers) return h;
    return new Headers(h);
  };

  const getPrefer = (headers) => (asHeaders(headers).get('prefer') || '').toLowerCase();

  const parseSelect = (select) => {
    if (!select || select === '*') return null;
    return String(select)
      .split(',')
      .map((token) => token.trim())
      .filter(Boolean)
      .map((token) => token.split(':')[0].replace(/\(.*\)/, '').trim())
      .filter(Boolean);
  };

  const pickFields = (row, select) => {
    const fields = parseSelect(select);
    if (!fields) return row;
    const picked = {};
    fields.forEach((field) => {
      if (field in row) {
        picked[field] = row[field];
      } else if (field === 'profiles' || field === 'profile') {
        picked[field] = {
          id: fakeUser.id,
          first_name: 'Demo',
          last_name: 'Admin',
          email: fakeUser.email
        };
      } else if (field === 'task_submission' || field === 'task_submissions') {
        picked[field] = {
          id: 'sub-rel-1',
          status: 'submitted',
          profiles: {
            id: fakeUser.id,
            first_name: 'Demo',
            last_name: 'Admin',
            email: fakeUser.email
          }
        };
      } else if (field === 'task_assignments' || field === 'task_assignment') {
        picked[field] = {
          id: 'ta-rel-1',
          status: 'submitted',
          profiles: {
            id: fakeUser.id,
            first_name: 'Demo',
            last_name: 'Admin',
            email: fakeUser.email
          },
          task_templates: {
            id: 'tt-1',
            title: 'Telefonleitfaden prüfen',
            type: 'standard'
          }
        };
      }
    });
    return Object.keys(picked).length ? picked : row;
  };

  const parseValue = (v) => {
    if (v === 'null') return null;
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (!Number.isNaN(Number(v)) && String(Number(v)) === v) return Number(v);
    return decodeURIComponent(v);
  };

  const matches = (row, field, op, raw) => {
    const value = row[field];
    const compare = parseValue(raw);
    if (op === 'eq') return value === compare;
    if (op === 'neq') return value !== compare;
    if (op === 'is') return String(value) === String(compare);
    if (op === 'gt') return value > compare;
    if (op === 'gte') return value >= compare;
    if (op === 'lt') return value < compare;
    if (op === 'lte') return value <= compare;
    if (op === 'like' || op === 'ilike') {
      const needle = String(raw).replaceAll('%', '').toLowerCase();
      return String(value ?? '').toLowerCase().includes(needle);
    }
    if (op === 'in') {
      const cleaned = String(raw).replace(/^\(/, '').replace(/\)$/, '');
      const arr = cleaned.split(',').map((x) => parseValue(x.trim().replace(/^"|"$/g, '')));
      return arr.includes(value);
    }
    return true;
  };

  const applyQuery = (rows, searchParams) => {
    let out = [...rows];

    for (const [key, val] of searchParams.entries()) {
      if (['select', 'order', 'limit', 'offset'].includes(key) || key.endsWith('.order') || key.endsWith('.limit') || key.endsWith('.offset')) continue;
      if (typeof val !== 'string' || !val.includes('.')) continue;
      const firstDot = val.indexOf('.');
      const op = val.slice(0, firstDot);
      const raw = val.slice(firstDot + 1);
      out = out.filter((r) => matches(r, key, op, raw));
    }

    const order = searchParams.get('order');
    if (order) {
      const [field, direction] = order.split('.');
      out.sort((a, b) => {
        if (a[field] === b[field]) return 0;
        const cmp = a[field] > b[field] ? 1 : -1;
        return direction === 'desc' ? -cmp : cmp;
      });
    }

    const offset = Number(searchParams.get('offset') || 0);
    const limit = Number(searchParams.get('limit') || out.length || 0);
    if (!Number.isNaN(offset) && !Number.isNaN(limit) && (offset || limit !== out.length)) {
      out = out.slice(offset, offset + limit);
    }

    return out;
  };

  const json = (payload, status = 200, extraHeaders = {}) => new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json', ...extraHeaders }
  });

  const noContent = (status = 204, extraHeaders = {}) => {
    // 204/205/304 must not include a response body.
    const nullBodyStatuses = new Set([204, 205, 304]);
    return new Response(nullBodyStatuses.has(status) ? null : '', { status, headers: extraHeaders });
  };

  const shouldForceError = (url, init) => {
    if (params.get('demoError') === '1') return true;
    const h = asHeaders(init?.headers);
    return h.get('x-demo-error') === '1';
  };

  const normalizeBody = (body) => {
    if (!body) return {};
    if (typeof body === 'string') {
      try { return JSON.parse(body); } catch { return {}; }
    }
    return body;
  };

  const handleTable = async (table, method, urlObj, init) => {
    // Bridge selected legacy Supabase table calls into real backend endpoints.
    if (useRealApi && table === 'job_listings') {
      const toPublic = '/api/public/job-listings';
      const toAdmin = '/api/admin/job-listings';

      if (method === 'GET' || method === 'HEAD') {
        const resp = await originalFetch(toAdmin, { method: 'GET', headers: init?.headers });
        if (!resp.ok) return json({ message: 'Failed to fetch job listings' }, 502);
        const payload = await resp.json().catch(() => ({}));
        const rows = Array.isArray(payload?.data) ? payload.data : [];
        const filteredRows = applyQuery(rows, urlObj.searchParams);

        if (method === 'HEAD') {
          const totalCount = filteredRows.length;
          return new Response('', {
            status: 200,
            headers: { 'content-range': `0-${Math.max(0, totalCount - 1)}/${totalCount}` }
          });
        }

        const accept = (asHeaders(init?.headers).get('accept') || '').toLowerCase();
        const wantsSingle = accept.includes('vnd.pgrst.object+json');
        if (wantsSingle) return filteredRows[0] ? json(filteredRows[0]) : json({ message: 'No rows' }, 406);
        const totalCount = filteredRows.length;
        return json(filteredRows, 200, { 'content-range': `0-${Math.max(0, totalCount - 1)}/${totalCount}` });
      }

      if (method === 'POST') {
        const body = normalizeBody(init?.body);
        const entries = Array.isArray(body) ? body : [body];
        const resp = await originalFetch(toAdmin, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(entries)
        });
        if (!resp.ok) return json({ message: 'Failed to create job listing' }, 502);
        const payload = await resp.json().catch(() => ({}));
        const created = Array.isArray(payload?.data) ? payload.data : [];
        return getPrefer(init?.headers).includes('return=representation') ? json(created) : noContent(201);
      }

      if (method === 'PATCH' || method === 'PUT') {
        const body = normalizeBody(init?.body);
        const idFilter = (urlObj.searchParams.get('id') || '').toString();
        const id = idFilter.startsWith('eq.') ? decodeURIComponent(idFilter.slice(3)) : null;
        if (!id) return json({ message: 'Missing id filter for update' }, 400);
        const resp = await originalFetch(`${toAdmin}/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (!resp.ok) return json({ message: 'Failed to update job listing' }, 502);
        const payload = await resp.json().catch(() => ({}));
        const updated = payload?.data ? [payload.data] : [];
        return getPrefer(init?.headers).includes('return=representation') ? json(updated) : noContent();
      }

      if (method === 'DELETE') {
        const idFilter = (urlObj.searchParams.get('id') || '').toString();
        const id = idFilter.startsWith('eq.') ? decodeURIComponent(idFilter.slice(3)) : null;
        if (!id) return json({ message: 'Missing id filter for delete' }, 400);
        const resp = await originalFetch(`${toAdmin}/${encodeURIComponent(id)}`, { method: 'DELETE' });
        if (!resp.ok) return json({ message: 'Failed to delete job listing' }, 502);
        return noContent();
      }

      return json({ message: `Unsupported method ${method} for bridged table ${table}` }, 405);
    }

    if (useRealApi && table === 'job_applications') {
      const toPublic = '/api/public/job-applications';
      const toAdmin = '/api/admin/job-applications';

      if (method === 'GET' || method === 'HEAD') {
        const resp = await originalFetch(toAdmin, { method: 'GET', headers: init?.headers });
        if (!resp.ok) return json({ message: 'Failed to fetch job applications' }, 502);
        const payload = await resp.json().catch(() => ({}));
        const rows = Array.isArray(payload?.data) ? payload.data : [];
        const filteredRows = applyQuery(rows, urlObj.searchParams);

        if (method === 'HEAD') {
          const totalCount = filteredRows.length;
          return new Response('', {
            status: 200,
            headers: { 'content-range': `0-${Math.max(0, totalCount - 1)}/${totalCount}` }
          });
        }

        const accept = (asHeaders(init?.headers).get('accept') || '').toLowerCase();
        const wantsSingle = accept.includes('vnd.pgrst.object+json');
        if (wantsSingle) return filteredRows[0] ? json(filteredRows[0]) : json({ message: 'No rows' }, 406);
        const totalCount = filteredRows.length;
        return json(filteredRows, 200, { 'content-range': `0-${Math.max(0, totalCount - 1)}/${totalCount}` });
      }

      if (method === 'POST') {
        const body = normalizeBody(init?.body);
        const one = Array.isArray(body) ? body[0] : body;
        const resp = await originalFetch(toPublic, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(one)
        });
        if (!resp.ok) return json({ message: 'Failed to create job application' }, 502);
        const payload = await resp.json().catch(() => ({}));
        const created = payload?.data ? [payload.data] : [];
        return getPrefer(init?.headers).includes('return=representation') ? json(created) : noContent(201);
      }

      if (method === 'PATCH' || method === 'PUT') {
        const body = normalizeBody(init?.body);
        const idFilter = (urlObj.searchParams.get('id') || '').toString();
        const id = idFilter.startsWith('eq.') ? decodeURIComponent(idFilter.slice(3)) : null;
        if (!id) return json({ message: 'Missing id filter for update' }, 400);
        const resp = await originalFetch(`${toAdmin}/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (!resp.ok) return json({ message: 'Failed to update job application' }, 502);
        const payload = await resp.json().catch(() => ({}));
        const updated = payload?.data ? [payload.data] : [];
        return getPrefer(init?.headers).includes('return=representation') ? json(updated) : noContent();
      }

      if (method === 'DELETE') {
        const idFilter = (urlObj.searchParams.get('id') || '').toString();
        const id = idFilter.startsWith('eq.') ? decodeURIComponent(idFilter.slice(3)) : null;
        if (!id) return json({ message: 'Missing id filter for delete' }, 400);
        const resp = await originalFetch(`${toAdmin}/${encodeURIComponent(id)}`, { method: 'DELETE' });
        if (!resp.ok) return json({ message: 'Failed to delete job application' }, 502);
        return noContent();
      }

      return json({ message: `Unsupported method ${method} for bridged table ${table}` }, 405);
    }

    const rows = store.get(table) || [];
    const select = urlObj.searchParams.get('select');
    const filtered = applyQuery(rows, urlObj.searchParams);
    const totalCount = filtered.length;

    if (method === 'HEAD') {
      return new Response('', {
        status: 200,
        headers: { 'content-range': `0-${Math.max(0, totalCount - 1)}/${totalCount}` }
      });
    }

    if (method === 'GET') {
      const hasNestedSelect = typeof select === 'string' && (select.includes('(') || select.includes('!inner'));
      let shaped = hasNestedSelect ? filtered : filtered.map((r) => pickFields(r, select));
      const accept = (asHeaders(init?.headers).get('accept') || '').toLowerCase();
      const wantsSingle = accept.includes('vnd.pgrst.object+json');
      if (wantsSingle) {
        let one = shaped[0] || null;

        // Backend-mode compatibility: if a profile is requested by id and not present
        // in local shim store, hydrate it from backend /api/employees/:id.
        if (!one && table === 'profiles') {
          const idFilter = (urlObj.searchParams.get('id') || '').toString();
          const requestedId = idFilter.startsWith('eq.') ? decodeURIComponent(idFilter.slice(3)) : null;
          if (requestedId) {
            try {
              let emp = null;

              // First try direct employee lookup.
              const resp = await originalFetch(`/api/employees/${requestedId}`, init);
              if (resp.ok) {
                const payload = await resp.json().catch(() => ({}));
                emp = payload?.data || null;
              }

              // Fallback: list endpoint then match by id/profile_id.
              if (!emp) {
                const listResp = await originalFetch('/api/employees', init);
                if (listResp.ok) {
                  const listPayload = await listResp.json().catch(() => ({}));
                  const rows = Array.isArray(listPayload?.data) ? listPayload.data : [];
                  emp = rows.find((r) => r.id === requestedId || r.profile_id === requestedId) || null;
                }
              }

              if (emp) {
                const profileLike = {
                  id: emp.profile_id || emp.id,
                  first_name: emp.first_name || null,
                  last_name: emp.last_name || null,
                  email: emp.email || null,
                  role: emp.role || 'user',
                  phone: emp.phone || null,
                  city: emp.city || null,
                  nationality: emp.nationality || null,
                  tax_number: emp.tax_number || null,
                  social_security_number: emp.social_security_number || null,
                  health_insurance: emp.health_insurance || null,
                  iban: emp.iban || null,
                  bic: emp.bic || null,
                  recipient_name: emp.recipient_name || null,
                  admin_notes: emp.admin_notes || null,
                  kyc_status: emp.kyc_status || 'pending',
                  created_at: emp.created_at || isoNow(),
                  updated_at: emp.updated_at || isoNow()
                };
                const existingRows = store.get('profiles') || [];
                if (!existingRows.find((r) => r.id === profileLike.id)) {
                  store.set('profiles', [...existingRows, profileLike]);
                }
                one = pickFields(profileLike, select);
              }
            } catch (err) {
              // Ignore and fall through to standard 406 response.
            }
          }
        }

        return one ? json(one) : json({ message: 'No rows' }, 406);
      }
      return json(shaped, 200, {
        'content-range': `0-${Math.max(0, totalCount - 1)}/${totalCount}`
      });
    }

    if (method === 'POST') {
      const body = normalizeBody(init?.body);
      const entries = Array.isArray(body) ? body : [body];
      const created = entries.map((entry) => ({
        id: entry.id || randomId(table.slice(0, 3)),
        created_at: entry.created_at || isoNow(),
        updated_at: isoNow(),
        ...entry
      }));
      store.set(table, [...rows, ...created]);
      return getPrefer(init?.headers).includes('return=representation') ? json(created) : noContent(201);
    }

    if (method === 'PATCH' || method === 'PUT') {
      const body = normalizeBody(init?.body);
      const updated = [];
      const next = rows.map((row) => {
        const hit = filtered.find((f) => f.id === row.id);
        if (!hit) return row;
        const merged = { ...row, ...body, updated_at: isoNow() };
        updated.push(merged);
        return merged;
      });
      store.set(table, next);
      return getPrefer(init?.headers).includes('return=representation') ? json(updated) : noContent();
    }

    if (method === 'DELETE') {
      const removeIds = new Set(filtered.map((r) => r.id));
      const remaining = rows.filter((row) => !removeIds.has(row.id));
      store.set(table, remaining);
      return getPrefer(init?.headers).includes('return=representation') ? json(filtered) : noContent();
    }

    return json({ message: `Unsupported method ${method} for table ${table}` }, 405);
  };

  const rpcHandlers = {
    get_public_settings: () => store.get('settings')[0],
    get_profiles_with_emails: () => {
      const profiles = store.get('profiles') || [];
      const employees = store.get('employees') || [];
      const merged = [...profiles, ...employees];
      const byId = new Map();
      merged.forEach((row) => {
        if (!row || !row.id) return;
        const existing = byId.get(row.id);
        if (!existing || (existing.role !== 'admin' && row.role)) byId.set(row.id, row);
      });
      return Array.from(byId.values());
    },
    get_profiles_with_emails_complete: () => {
      const profiles = store.get('profiles') || [];
      const employees = store.get('employees') || [];
      const merged = [...profiles, ...employees];
      const byId = new Map();
      merged.forEach((row) => {
        if (!row || !row.id) return;
        // Prefer richer profile records when duplicate ids exist.
        const existing = byId.get(row.id);
        if (!existing || (existing.role !== 'admin' && row.role)) byId.set(row.id, row);
      });
      return Array.from(byId.values());
    },
    get_profiles_with_emails_by_ids: (init) => {
      const body = normalizeBody(init?.body);
      const ids = body.profile_ids || body.ids || [];
      const profiles = store.get('profiles') || [];
      const employees = store.get('employees') || [];
      const combined = [...profiles, ...employees].map((p) => ({
        id: p.id,
        first_name: p.first_name || p.name || 'Demo',
        last_name: p.last_name || '',
        email: p.email || 'demo@local.test',
        role: p.role || 'user'
      }));
      if (!Array.isArray(ids) || ids.length === 0) return combined;
      return combined.filter((p) => ids.includes(p.id));
    },
    ping: () => ({ ok: true, mode: 'demo' }),
    create_task_assignment_safe: () => ([{ task_id: randomId('task'), assignment_id: randomId('asg'), message: 'Demo assignment created' }]),
    create_signed_contract_assignment: () => ({ ok: true, mode: 'demo', message: 'Demo contract assignment created' }),
    get_all_task_templates: () => (store.get('task_templates') || [])
  };

  const passthroughNoop = (endpoint, method) => {
    if (method === 'GET') return json({ ok: true, endpoint, mode: 'demo', items: [] });
    return json({ ok: true, endpoint, mode: 'demo', message: 'Demo no-op success' }, 200);
  };

  const originalFetch = window.fetch.bind(window);
  window.fetch = async (input, init = {}) => {
    const request = input instanceof Request ? input : null;
    const url = typeof input === 'string' ? input : input.url;
    const method = (init.method || request?.method || 'GET').toUpperCase();
    const mergedInit = {
      ...init,
      headers: init.headers || request?.headers,
      body: init.body ?? request?.body
    };

    if (demoDelayMs > 0) await wait(demoDelayMs);

    if (shouldForceError(url, mergedInit)) {
      return json({ message: 'Demo forced error', code: 'DEMO_ERROR' }, 500);
    }

    // Auth/session demo login flow (restored login screen behavior)
    if (url.includes('/auth/v1/user')) {
      const session = getStoredSession();
      if (!session) return json({ message: 'Not authenticated' }, 401);
      return json(fakeUser);
    }

    if (url.includes('/auth/v1/logout')) {
      clearStoredSession();
      return json({ success: true });
    }

    if (url.includes('/auth/v1/token?grant_type=refresh_token')) {
      const session = getStoredSession();
      if (!session) return json({ message: 'Invalid refresh token' }, 401);
      return json(session);
    }

    if (url.includes('/auth/v1/token?grant_type=password')) {
      const body = normalizeBody(mergedInit.body);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      if (email !== DEMO_LOGIN.email || password !== DEMO_LOGIN.password) {
        return json({ error: 'Invalid login credentials' }, 400);
      }
      setStoredSession(fakeSession);
      return json(fakeSession);
    }

    if (url.includes('/auth/v1/signup')) {
      return json({ error: 'Signup disabled in demo. Use provided demo credentials.' }, 400);
    }

    // Supabase RPC no-op handling
    if (url.includes('/rest/v1/rpc/')) {
      const u = new URL(url, location.origin);
      const rpc = u.pathname.split('/rest/v1/rpc/')[1];
      const handler = rpcHandlers[rpc];
      if (handler) return json(handler(mergedInit));
      return json({ ok: true, rpc, mode: 'demo', message: 'No-op demo RPC success' });
    }

    // Supabase REST table mock CRUD
    if (url.includes('/rest/v1/')) {
      const u = new URL(url, location.origin);
      const table = u.pathname.split('/rest/v1/')[1];
      return handleTable(table, method, u, mergedInit);
    }

    // Common non-table endpoints used by panels / forms
    if (url.includes('/functions/v1/')) {
      const u = new URL(url, location.origin);
      const fn = u.pathname.split('/functions/v1/')[1];
      return passthroughNoop(`functions/${fn}`, method);
    }

    if (url.includes('/storage/v1/')) {
      const u = new URL(url, location.origin);
      const path = u.pathname;

      // Supabase storage list API: returns array of files.
      if (path.includes('/storage/v1/object/list/')) {
        return json([]);
      }

      // Supabase signed URL API: returns object with signedURL.
      if (path.includes('/storage/v1/object/sign/')) {
        return json({ signedURL: '/assets/demo-upload-placeholder.png' });
      }

      // Public URL / generic storage fallbacks.
      if (path.includes('/storage/v1/object/public/')) {
        return json({ publicURL: `${location.origin}/assets/demo-upload-placeholder.png` });
      }

      return json({
        id: randomId('file'),
        key: path,
        publicUrl: `${location.origin}/assets/demo-upload-placeholder.png`,
        mode: 'demo',
        message: 'Demo storage no-op'
      });
    }

    if (url.includes('/api/')) {
      if (useRealApi) {
        return originalFetch(input, init);
      }

      const u = new URL(url, location.origin);
      const path = u.pathname;

      // Chat monitoring endpoints used by /admin/chat-monitoring
      const paginate = (items, page = 1, limit = 20) => {
        const total = items.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const safePage = Math.min(Math.max(1, page), totalPages);
        const start = (safePage - 1) * limit;
        const end = start + limit;
        return {
          items: items.slice(start, end),
          pagination: { page: safePage, limit, total, totalPages }
        };
      };

      const listConversations = () => {
        const conversations = (store.get('chat_conversations') || []).filter((c) => !c.deleted_at && !c.archived_at);
        const messages = store.get('chat_messages') || [];
        return conversations
          .map((conv) => {
            const convMsgs = messages.filter((m) => m.conversation_id === conv.id && !m.deleted_at);
            const last = convMsgs[convMsgs.length - 1] || null;
            return {
              ...conv,
              message_count: convMsgs.length,
              last_message: last
                ? {
                    id: last.id,
                    content: last.content,
                    sender_type: last.sender_type,
                    created_at: last.created_at,
                    updated_at: last.updated_at,
                    metadata: last.metadata || {},
                    message_type: last.message_type || 'text',
                    conversation_id: last.conversation_id,
                    sender_id: last.sender_id,
                    deleted_at: last.deleted_at || null,
                    edited_at: last.edited_at || null
                  }
                : null
            };
          })
          .sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime());
      };

      if (path === '/api/admin/chat/conversations' && method === 'GET') {
        const page = Number(u.searchParams.get('page') || '1');
        const limit = Number(u.searchParams.get('limit') || '20');
        const search = (u.searchParams.get('search') || '').trim().toLowerCase();
        const conversationType = (u.searchParams.get('conversationType') || '').trim();

        let rows = listConversations();
        if (conversationType) rows = rows.filter((c) => c.conversation_type === conversationType);
        if (search) {
          rows = rows.filter((c) => {
            const user = c.user_profile || {};
            const haystack = [
              c.title || '',
              user.first_name || '',
              user.last_name || '',
              user.email || '',
              c.last_message?.content || ''
            ]
              .join(' ')
              .toLowerCase();
            return haystack.includes(search);
          });
        }

        const out = paginate(rows, page, limit);
        return json({ success: true, conversations: out.items, pagination: out.pagination });
      }

      const convMessagesMatch = path.match(/^\/api\/admin\/chat\/conversations\/([^/]+)\/messages$/);
      if (convMessagesMatch && method === 'GET') {
        const conversationId = convMessagesMatch[1];
        const page = Number(u.searchParams.get('page') || '1');
        const limit = Number(u.searchParams.get('limit') || '2500');
        const all = (store.get('chat_messages') || [])
          .filter((m) => m.conversation_id === conversationId && !m.deleted_at)
          .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        const out = paginate(all, page, limit);
        return json({ success: true, messages: out.items, pagination: out.pagination });
      }

      if (path === '/api/admin/chat/analytics' && method === 'GET') {
        const conversations = listConversations();
        const messages = (store.get('chat_messages') || []).filter((m) => !m.deleted_at);
        return json({
          success: true,
          analytics: {
            conversations: { total: conversations.length },
            messages: { total: messages.length },
            performance: { average_response_time: 420 }
          }
        });
      }

      const archiveConversationMatch = path.match(/^\/api\/admin\/chat\/conversations\/([^/]+)$/);
      if (archiveConversationMatch && method === 'DELETE') {
        const conversationId = archiveConversationMatch[1];
        const body = normalizeBody(init?.body);
        const permanent = !!body.permanent;
        const conversations = store.get('chat_conversations') || [];
        const updated = conversations.map((c) =>
          c.id === conversationId
            ? {
                ...c,
                updated_at: isoNow(),
                archived_at: permanent ? c.archived_at : isoNow(),
                deleted_at: permanent ? isoNow() : c.deleted_at
              }
            : c
        );
        store.set('chat_conversations', updated);
        return json({ success: true, archived: !permanent, deleted: permanent });
      }

      const interveneMatch = path.match(/^\/api\/admin\/chat\/conversations\/([^/]+)\/intervene$/);
      if (interveneMatch && method === 'POST') {
        const conversationId = interveneMatch[1];
        const body = normalizeBody(init?.body);
        const msg = {
          id: randomId('msg-admin'),
          conversation_id: conversationId,
          sender_id: fakeUser.id,
          sender_type: 'admin',
          message_type: 'text',
          content: body.content || '',
          attachments: [],
          metadata: { admin_intervention: true },
          created_at: isoNow(),
          updated_at: isoNow(),
          edited_at: null,
          deleted_at: null
        };
        const messages = store.get('chat_messages') || [];
        store.set('chat_messages', [...messages, msg]);
        const conversations = store.get('chat_conversations') || [];
        store.set(
          'chat_conversations',
          conversations.map((c) => (c.id === conversationId ? { ...c, updated_at: isoNow() } : c))
        );
        return json({ success: true, message: msg });
      }

      const messageModifyMatch = path.match(/^\/api\/admin\/chat\/messages\/([^/]+)$/);
      if (messageModifyMatch && method === 'PUT') {
        const messageId = messageModifyMatch[1];
        const body = normalizeBody(init?.body);
        const messages = store.get('chat_messages') || [];
        let updatedMsg = null;
        const updated = messages.map((m) => {
          if (m.id !== messageId) return m;
          updatedMsg = { ...m, content: body.content || m.content, edited_at: isoNow(), updated_at: isoNow() };
          return updatedMsg;
        });
        store.set('chat_messages', updated);
        return json({ success: true, message: updatedMsg });
      }

      if (messageModifyMatch && method === 'DELETE') {
        const messageId = messageModifyMatch[1];
        const body = normalizeBody(init?.body);
        const permanent = !!body.permanent;
        const messages = store.get('chat_messages') || [];
        const updated = permanent
          ? messages.filter((m) => m.id !== messageId)
          : messages.map((m) => (m.id === messageId ? { ...m, deleted_at: isoNow(), updated_at: isoNow() } : m));
        store.set('chat_messages', updated);
        return json({ success: true, deleted: true, permanent });
      }

      // Phone-number provider endpoints used by /admin/phone-numbers
      if (path === '/api/phone/providers' && method === 'GET') {
        return json({
          status: 'success',
          data: {
            providers: {
              smspva: { available: true, name: 'SMSPVA', description: 'Russian SMS service' },
              anosim: { available: true, name: 'Anosim', description: 'German SMS service' },
              gogetsms: { available: true, name: 'GoGetSMS', description: 'International SMS service' },
              juicysms: { available: true, name: 'JuicySMS', description: 'USA/UK/NL SMS verification service' },
              receive_sms_online: { available: true, name: 'Receive SMS Online', description: 'Manual SMS collection' },
              sms_receive_net: { available: true, name: 'SMS-Receive.net', description: 'High-quality banking SMS codes' }
            },
            availableCount: 6,
            totalCount: 6
          }
        });
      }

      if (path === '/api/phone/services' && method === 'GET') {
        const provider = u.searchParams.get('provider') || 'anosim';
        const mode = u.searchParams.get('mode') || 'rental';
        const baseServices = {
          go: { name: 'Google, YouTube, Gmail', cost: 0.8 },
          wa: { name: 'WhatsApp', cost: 0.9 },
          tg: { name: 'Telegram', cost: 0.7 },
          full_germany: { name: 'Deutschland - Vollmiete (alle Dienste)', cost: 10.85 },
          full: { name: 'Beste Vollmiete (automatische Auswahl)', cost: 10.85 },
          ot: { name: 'OTHER', cost: 0.6 }
        };
        const baseCountries = {
          '98': { name: 'Deutschland' },
          '286': { name: 'Vereinigtes Königreich' },
          '67': { name: 'Tschechische Republik' },
          '165': { name: 'Litauen' },
          '196': { name: 'Niederlande' }
        };
        return json({
          status: 'success',
          data: {
            provider,
            mode,
            services: baseServices,
            countries: baseCountries
          }
        });
      }

      if (path === '/api/phone/anosim-share/preview' && method === 'POST') {
        return json({
          success: true,
          phoneInfo: {
            number: '+49170000001',
            country: 'Germany',
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          },
          messages: [
            { sender: 'Bank', message: 'Ihr Code ist 123456', received_at: isoNow() }
          ]
        });
      }

      if ((path === '/api/phone/receive-sms/preview' || path === '/api/phone/sms-receive-net/preview') && method === 'POST') {
        return json({
          success: true,
          messages: [
            { sender: 'Service', message: 'Demo code: 654321', received_at: isoNow() }
          ]
        });
      }

      if (path === '/api/phone/rent' && method === 'POST') {
        const body = normalizeBody(init?.body);
        return json({
          status: 'success',
          data: {
            id: randomId('ph'),
            rent_id: randomId('rent'),
            phone_number: '+4917' + Math.floor(1000000 + Math.random() * 8999999),
            service: body.service || 'go',
            country: body.country || '98',
            provider: body.provider || 'anosim',
            status: 'active',
            end_date: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
          }
        });
      }

      if (path === '/api/phone/list' && method === 'GET') {
        return json({ status: 'success', data: store.get('phone_numbers') || [] });
      }

      if (path.match(/^\/api\/phone\/status\//) && method === 'GET') {
        return json({ status: 'success', data: [] });
      }

      if ((path.match(/^\/api\/phone\/cancel\//) || path.match(/^\/api\/phone\/extend\//)) && method === 'POST') {
        return json({ status: 'success', data: { ok: true } });
      }

      // Starter task tracking endpoints used by /admin/employees?tab=starter-tasks
      const starterTaskWorkers = [
        {
          id: 'emp-1',
          first_name: 'Lina',
          last_name: 'Schmidt',
          email: 'lina@magicvics.test',
          phone: '+491701111111',
          task_status: 'not_started',
          completed_starter_tasks: 0,
          total_starter_tasks: 1,
          days_since_signup: 3,
          last_activity_at: isoNow(),
          last_contact_at: null,
          reminder_count: 0
        },
        {
          id: 'emp-2',
          first_name: 'Noah',
          last_name: 'Weber',
          email: 'noah@magicvics.test',
          phone: '+491702222222',
          task_status: 'in_progress',
          completed_starter_tasks: 0,
          total_starter_tasks: 1,
          days_since_signup: 2,
          last_activity_at: isoNow(),
          last_contact_at: isoNow(),
          reminder_count: 1
        }
      ];

      if ((path === '/api/admin/starter-task-tracking' || path === '/api/starter-tasks/workers') && method === 'GET') {
        return json({ success: true, data: starterTaskWorkers, count: starterTaskWorkers.length });
      }

      if ((path === '/api/admin/starter-task-tracking/stats' || path === '/api/starter-tasks/stats') && method === 'GET') {
        return json({
          success: true,
          data: {
            totalWorkers: starterTaskWorkers.length,
            notStartedCount: starterTaskWorkers.filter((w) => w.task_status === 'not_started').length,
            inProgressCount: starterTaskWorkers.filter((w) => w.task_status === 'in_progress').length,
            completedCount: starterTaskWorkers.filter((w) => w.task_status === 'completed').length,
            workersWithOpenStarterTasks: starterTaskWorkers.filter((w) => w.task_status !== 'completed').length
          }
        });
      }

      if ((path === '/api/admin/starter-task-tracking/refresh' || path === '/api/starter-tasks/refresh') && method === 'POST') {
        return json({ success: true, message: 'Demo starter-task refresh complete' });
      }

      const sendReminderMatch = path.match(/^\/api\/admin\/starter-task-tracking\/([^/]+)\/send-reminder$/);
      if (sendReminderMatch && method === 'POST') {
        return json({
          success: true,
          message: 'Reminder sent (demo)',
          data: { emailSent: true, smsSent: true, errors: [] }
        });
      }

      const contactLogMatch = path.match(/^\/api\/admin\/starter-task-tracking\/([^/]+)\/contact-log$/);
      if (contactLogMatch && method === 'POST') {
        return json({ success: true, message: 'Contact logged (demo)' });
      }

      const contactHistoryMatch = path.match(/^\/api\/admin\/starter-task-tracking\/([^/]+)\/contact-history$/);
      if (contactHistoryMatch && method === 'GET') {
        return json({
          success: true,
          data: [
            {
              id: 'contact-1',
              contactType: 'email',
              reminderReason: 'incomplete_starter_task',
              notes: 'Demo reminder',
              adminId: fakeUser.id,
              createdAt: isoNow()
            }
          ]
        });
      }

      return passthroughNoop(`api${u.pathname}`, method);
    }

    try {
      return await originalFetch(input, init);
    } catch (err) {
      // Graceful no-crash fallback for unknown failing API calls in demo mode.
      console.warn('[demo-auth-shim] fetch fallback no-op:', url, err);
      return json({ ok: true, mode: 'demo', message: 'Fallback no-op response (network suppressed)' });
    }
  };

  window.__MV_DEMO__ = {
    enabled: true,
    mode: useRealApi ? 'backend-default' : 'demo-forced',
    store,
    setDelay(ms) { localStorage.setItem('MV_DEMO_DELAY_MS', String(ms)); },
    useBackendByDefault() { localStorage.setItem('MV_USE_REAL_API', '1'); },
    forceDemoMode() { localStorage.setItem('MV_USE_REAL_API', '0'); },
    reset() {
      const restored = deepClone(seed);
      Object.entries(restored).forEach(([k, v]) => store.set(k, v));
    }
  };

  console.info(`[demo-auth-shim] enabled (${useRealApi ? 'backend-default' : 'demo-forced'})`);
})();
