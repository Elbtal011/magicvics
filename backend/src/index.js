import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT || 4000);

const allowedOrigins = String(process.env.FRONTEND_ORIGIN || '*')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes('*') || allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    }
  })
);
app.use(express.json());

const nowIso = () => new Date().toISOString();
const num = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const OPENAI_API_KEY = String(process.env.OPENAI_API_KEY || '').trim();
const OPENAI_MODEL = String(process.env.OPENAI_MODEL || 'gpt-4o-mini').trim();
const CHAT_BRAND_NAME = String(process.env.CHAT_BRAND_NAME || 'Headline Agentur').trim();

const defaultChatReply = (content) => `Danke fÃ¼r deine Nachricht: "${String(content || '').slice(0, 120)}". Ein Admin kann jederzeit eingreifen.`;

const DEFAULT_KNOWLEDGE_ARTICLES = [
  {
    id: 'kba-1',
    title: 'Erster Arbeitstag: Ablauf',
    content: 'Schritte vom Login bis zur ersten abgeschlossenen Aufgabe.'
  },
  {
    id: 'kba-2',
    title: 'KYC: Dokumente und hÃ¤ufige Fehler',
    content: 'Welche Dokumente akzeptiert werden und was oft zu Ablehnungen fÃ¼hrt.'
  },
  {
    id: 'kba-3',
    title: 'Auszahlung: Status und Fristen',
    content: 'Wann Auszahlungen genehmigt werden und wie lange die Bearbeitung dauert.'
  }
];

async function loadKnowledgeArticles() {
  const raw = await loadJsonSetting('ai:knowledge:articles', null);
  const rows = Array.isArray(raw?.articles) ? raw.articles : Array.isArray(raw) ? raw : [];
  const normalized = rows
    .map((x, idx) => ({
      id: x.id || `kba-${idx + 1}`,
      title: String(x.title || '').trim(),
      content: String(x.content || x.description || '').trim(),
      ai_training_enabled: x.ai_training_enabled !== false
    }))
    .filter((x) => x.title && x.content && x.ai_training_enabled);
  return normalized.length > 0 ? normalized : DEFAULT_KNOWLEDGE_ARTICLES;
}

function selectKnowledgeSnippets(content, articles, limit = 3) {
  const q = String(content || '').toLowerCase();
  const terms = q.split(/\s+/).filter((w) => w.length > 2);
  const scored = articles
    .map((a) => {
      const hay = `${a.title} ${a.content}`.toLowerCase();
      const score = terms.reduce((acc, w) => acc + (hay.includes(w) ? 1 : 0), 0);
      return { ...a, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((x) => x.score > 0 || terms.length === 0);
  return scored;
}

async function generateOpenAIReply({ content, history = [], snippets = [] }) {
  if (!OPENAI_API_KEY) return null;

  const kbBlock = snippets.length
    ? `\n\nWissensbasis (bevorzugt verwenden):\n${snippets
        .map((s, i) => `${i + 1}. ${s.title}: ${s.content}`)
        .join('\n')}`
    : '';

  const messages = [
    {
      role: 'system',
      content:
        `Du bist der Karriere- und Support-Assistent von ${CHAT_BRAND_NAME}. Antworte kurz, hilfreich und auf Deutsch. Wenn Informationen fehlen, stelle eine kurze RÃ¼ckfrage. Erfinde keine Fakten.` +
        kbBlock
    },
    ...history,
    { role: 'user', content: String(content || '') }
  ];

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      temperature: 0.4,
      messages
    })
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    throw new Error(`OpenAI error ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json();
  const out = data?.choices?.[0]?.message?.content;
  return String(out || '').trim() || null;
}

const profileNameFromInput = (body = {}) => {
  const first = (body.first_name || body.firstName || '').trim();
  const last = (body.last_name || body.lastName || '').trim();
  const fullName = (body.fullName || `${first} ${last}`).trim();
  return { first, last, fullName: fullName || 'Unnamed Employee' };
};

const serializeEmployee = (employee) => {
  const profile = employee.profile || {};
  const fullName = profile.fullName || `${profile.firstName || ''} ${profile.lastName || ''}`.trim();
  const tags = (employee.workerTagLinks || []).map((x) => x.tag).filter(Boolean);
  const balanceCents = (employee.balances || []).reduce((sum, b) => sum + (b.amountCents || 0), 0);

  return {
    id: employee.id,
    profile_id: employee.profileId,
    first_name: profile.firstName || fullName.split(' ')[0] || '',
    last_name: profile.lastName || fullName.split(' ').slice(1).join(' '),
    full_name: fullName,
    name: fullName,
    email: profile.email,
    role: profile.role,
    status: employee.status,
    banned_until: profile.bannedUntil,
    department: employee.department,
    salary_cents: employee.salaryCents,
    hired_at: employee.hiredAt,
    phone: profile.phone,
    date_of_birth: profile.dateOfBirth,
    city: profile.city,
    nationality: profile.nationality,
    tax_number: profile.taxNumber,
    social_security_number: profile.socialSecurityNumber,
    health_insurance: profile.healthInsurance,
    iban: profile.iban,
    bic: profile.bic,
    recipient_name: profile.recipientName,
    kyc_status: profile.kycStatus,
    admin_notes: profile.adminNotes,
    created_at: employee.createdAt,
    updated_at: employee.updatedAt,
    tags,
    worker_balance_cents: balanceCents,
    worker_balance_eur: Number((balanceCents / 100).toFixed(2)),
    phone_numbers: employee.phoneNumbers || [],
    assignments: employee.taskAssignments || [],
    time_entries: employee.timeEntries || []
  };
};

app.get('/api/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ ok: true, db: 'up', timestamp: nowIso() });
  } catch (error) {
    res.status(500).json({ ok: false, db: 'down', error: String(error) });
  }
});

app.get('/api/dashboard/summary', async (_req, res) => {
  const [employees, activeEmployees, phoneNumbers, activePhoneNumbers] = await Promise.all([
    prisma.employee.count(),
    prisma.employee.count({ where: { status: 'active' } }),
    prisma.phoneNumber.count(),
    prisma.phoneNumber.count({ where: { status: 'active' } })
  ]);

  res.json({
    success: true,
    data: { employees, activeEmployees, phoneNumbers, activePhoneNumbers }
  });
});

app.get('/api/employees/summary', async (_req, res) => {
  const employees = await prisma.employee.findMany({ include: { profile: true }, orderBy: { createdAt: 'desc' } });
  res.json({
    success: true,
    count: employees.length,
    data: employees.map((e) => ({
      id: e.id,
      profileId: e.profileId,
      first_name: e.profile.firstName || e.profile.fullName.split(' ')[0] || e.profile.fullName,
      last_name: e.profile.lastName || e.profile.fullName.split(' ').slice(1).join(' '),
      email: e.profile.email,
      status: e.status,
      department: e.department,
      role: e.profile.role
    }))
  });
});

app.get('/api/employees', async (req, res) => {
  try {
    const q = (req.query.q || '').toString().trim();
    const status = (req.query.status || '').toString().trim();
    const role = (req.query.role || '').toString().trim();

    const employees = await prisma.employee.findMany({
      include: {
        profile: true,
        workerTagLinks: { include: { tag: true } },
        balances: true,
        phoneNumbers: true
      },
      where: {
        ...(status ? { status } : {}),
        profile: {
          ...(role ? { role } : {}),
          ...(q
            ? {
                OR: [
                  { email: { contains: q, mode: 'insensitive' } },
                  { fullName: { contains: q, mode: 'insensitive' } },
                  { firstName: { contains: q, mode: 'insensitive' } },
                  { lastName: { contains: q, mode: 'insensitive' } }
                ]
              }
            : {})
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, count: employees.length, data: employees.map(serializeEmployee) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch employees', error: String(error) });
  }
});

async function findEmployeeByAnyId(id, include = undefined) {
  try {
    let employee = await prisma.employee.findUnique({ where: { id }, include });
    if (!employee) employee = await prisma.employee.findFirst({ where: { profileId: id }, include });
    return employee;
  } catch (_err) {
    // Keep callers resilient; return null instead of crashing request handlers.
    return null;
  }
}

app.get('/api/employees/:id', async (req, res) => {
  try {
    const employee = await findEmployeeByAnyId(req.params.id, {
      include: {
        profile: true,
        phoneNumbers: true,
        workerTagLinks: { include: { tag: true } },
        balances: { orderBy: { createdAt: 'desc' } },
        timeEntries: { orderBy: { createdAt: 'desc' } },
        taskAssignments: { orderBy: { createdAt: 'desc' } }
      }
    });

    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.json({ success: true, data: serializeEmployee(employee) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch employee', error: String(error) });
  }
});

app.post('/api/employees', async (req, res) => {
  const body = req.body || {};
  const { first, last, fullName } = profileNameFromInput(body);
  const email = (body.email || '').toString().trim().toLowerCase();

  if (!email) return res.status(400).json({ success: false, message: 'email is required' });

  try {
    const created = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: {
          email,
          fullName,
          firstName: first || null,
          lastName: last || null,
          role: body.role || 'user',
          phone: body.phone || null,
          city: body.city || null,
          nationality: body.nationality || null,
          taxNumber: body.tax_number || null,
          socialSecurityNumber: body.social_security_number || null,
          healthInsurance: body.health_insurance || null,
          iban: body.iban || null,
          bic: body.bic || null,
          recipientName: body.recipient_name || null,
          adminNotes: body.admin_notes || null,
          kycStatus: body.kyc_status || 'pending'
        }
      });

      const employee = await tx.employee.create({
        data: {
          profileId: profile.id,
          status: body.status || 'active',
          department: body.department || null,
          salaryCents: num(body.salary_cents, 0),
          hiredAt: body.hired_at ? new Date(body.hired_at) : new Date()
        },
        include: {
          profile: true,
          workerTagLinks: { include: { tag: true } },
          balances: true,
          phoneNumbers: true,
          timeEntries: true,
          taskAssignments: true
        }
      });

      return employee;
    });

    res.status(201).json({ success: true, data: serializeEmployee(created) });
  } catch (error) {
    if (String(error).includes('Unique constraint')) {
      return res.status(409).json({ success: false, message: 'email already exists' });
    }
    res.status(500).json({ success: false, message: 'Failed to create employee', error: String(error) });
  }
});

app.patch('/api/employees/:id', async (req, res) => {
  const body = req.body || {};
  const existing = await findEmployeeByAnyId(req.params.id, { profile: true });
  if (!existing) return res.status(404).json({ success: false, message: 'Employee not found' });

  const { first, last, fullName } = profileNameFromInput({
    first_name: body.first_name ?? existing.profile.firstName,
    last_name: body.last_name ?? existing.profile.lastName,
    fullName: body.full_name ?? existing.profile.fullName
  });

  const updated = await prisma.$transaction(async (tx) => {
    await tx.profile.update({
      where: { id: existing.profileId },
      data: {
        email: body.email ?? undefined,
        firstName: body.first_name !== undefined ? first || null : undefined,
        lastName: body.last_name !== undefined ? last || null : undefined,
        fullName: fullName || undefined,
        role: body.role ?? undefined,
        phone: body.phone !== undefined ? body.phone || null : undefined,
        city: body.city !== undefined ? body.city || null : undefined,
        nationality: body.nationality !== undefined ? body.nationality || null : undefined,
        taxNumber: body.tax_number !== undefined ? body.tax_number || null : undefined,
        socialSecurityNumber: body.social_security_number !== undefined ? body.social_security_number || null : undefined,
        healthInsurance: body.health_insurance !== undefined ? body.health_insurance || null : undefined,
        iban: body.iban !== undefined ? body.iban || null : undefined,
        bic: body.bic !== undefined ? body.bic || null : undefined,
        recipientName: body.recipient_name !== undefined ? body.recipient_name || null : undefined,
        adminNotes: body.admin_notes !== undefined ? body.admin_notes || null : undefined,
        kycStatus: body.kyc_status ?? undefined,
        bannedUntil: body.banned_until !== undefined ? (body.banned_until ? new Date(body.banned_until) : null) : undefined
      }
    });

    return tx.employee.update({
      where: { id: existing.id },
      data: {
        status: body.status ?? undefined,
        department: body.department !== undefined ? body.department || null : undefined,
        salaryCents: body.salary_cents !== undefined ? num(body.salary_cents, 0) : undefined,
        hiredAt: body.hired_at ? new Date(body.hired_at) : undefined
      },
      include: {
        profile: true,
        workerTagLinks: { include: { tag: true } },
        balances: true,
        phoneNumbers: true,
        timeEntries: true,
        taskAssignments: true
      }
    });
  });

  res.json({ success: true, data: serializeEmployee(updated) });
});

app.delete('/api/employees/:id', async (req, res) => {
  const existing = await findEmployeeByAnyId(req.params.id);
  if (!existing) return res.status(404).json({ success: false, message: 'Employee not found' });
  await prisma.employee.delete({ where: { id: existing.id } });
  res.json({ success: true, message: 'Employee deleted' });
});

app.get('/api/worker-tags', async (_req, res) => {
  const tags = await prisma.workerTag.findMany({ orderBy: { name: 'asc' } });
  res.json({ success: true, data: tags });
});

app.post('/api/worker-tags', async (req, res) => {
  const body = req.body || {};
  if (!body.name) return res.status(400).json({ success: false, message: 'name is required' });
  try {
    const tag = await prisma.workerTag.create({
      data: { name: body.name, color: body.color || '#3b82f6', description: body.description || null }
    });
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    res.status(409).json({ success: false, message: 'tag already exists', error: String(error) });
  }
});

app.put('/api/worker-tags/:id', async (req, res) => {
  const body = req.body || {};
  const existing = await prisma.workerTag.findUnique({ where: { id: req.params.id } });
  if (!existing) return res.status(404).json({ success: false, error: 'Tag not found' });

  const updated = await prisma.workerTag.update({
    where: { id: req.params.id },
    data: {
      name: body.name ?? undefined,
      color: body.color ?? undefined,
      description: body.description !== undefined ? body.description || null : undefined
    }
  });
  res.json({ success: true, data: updated });
});

app.delete('/api/worker-tags/:id', async (req, res) => {
  await prisma.workerTag.deleteMany({ where: { id: req.params.id } });
  res.json({ success: true });
});

app.post('/api/worker-tags/assign', async (req, res) => {
  const workerId = req.body?.worker_id;
  const tagId = req.body?.tag_id;
  if (!workerId || !tagId) return res.status(400).json({ success: false, error: 'worker_id and tag_id required' });

  try {
    const created = await prisma.workerTagAssignment.upsert({
      where: { workerId_tagId: { workerId, tagId } },
      update: {},
      create: { workerId, tagId },
      include: { tag: true }
    });
    res.status(201).json({ success: true, data: created.tag });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to assign tag', details: String(error) });
  }
});

app.delete('/api/worker-tags/assign/:workerId/:tagId', async (req, res) => {
  await prisma.workerTagAssignment.deleteMany({ where: { workerId: req.params.workerId, tagId: req.params.tagId } });
  res.json({ success: true });
});

app.get('/api/worker-tags/worker/:workerId', async (req, res) => {
  const links = await prisma.workerTagAssignment.findMany({
    where: { workerId: req.params.workerId },
    include: { tag: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json({ success: true, data: links.map((x) => x.tag) });
});

app.put('/api/worker-tags/notes/:workerId', async (req, res) => {
  const employee = await prisma.employee.findUnique({ where: { id: req.params.workerId }, include: { profile: true } });
  if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });

  const notes = req.body?.admin_notes || null;
  const updated = await prisma.profile.update({ where: { id: employee.profileId }, data: { adminNotes: notes } });
  res.json({ success: true, data: updated });
});

app.get('/api/employees/:id/tags', async (req, res) => {
  const employee = await findEmployeeByAnyId(req.params.id);
  if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
  const links = await prisma.workerTagAssignment.findMany({
    where: { workerId: employee.id },
    include: { tag: true },
    orderBy: { createdAt: 'desc' }
  });
  res.json({ success: true, data: links.map((x) => x.tag) });
});

app.post('/api/employees/:id/tags/:tagId', async (req, res) => {
  const employee = await findEmployeeByAnyId(req.params.id);
  if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
  const created = await prisma.workerTagAssignment.upsert({
    where: { workerId_tagId: { workerId: employee.id, tagId: req.params.tagId } },
    update: {},
    create: { workerId: employee.id, tagId: req.params.tagId },
    include: { tag: true }
  });
  res.status(201).json({ success: true, data: created.tag });
});

app.delete('/api/employees/:id/tags/:tagId', async (req, res) => {
  const employee = await findEmployeeByAnyId(req.params.id);
  if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
  await prisma.workerTagAssignment.deleteMany({ where: { workerId: employee.id, tagId: req.params.tagId } });
  res.json({ success: true, message: 'tag removed' });
});

app.get('/api/employees/:id/balances', async (req, res) => {
  const employee = await findEmployeeByAnyId(req.params.id);
  if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
  const balances = await prisma.workerBalance.findMany({ where: { workerId: employee.id }, orderBy: { createdAt: 'desc' } });
  const totalCents = balances.reduce((s, b) => s + b.amountCents, 0);
  res.json({ success: true, total_cents: totalCents, total_eur: Number((totalCents / 100).toFixed(2)), data: balances });
});

app.post('/api/employees/:id/balances', async (req, res) => {
  const employee = await findEmployeeByAnyId(req.params.id);
  if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
  const body = req.body || {};
  const amountCents = body.amount_cents !== undefined ? num(body.amount_cents, 0) : Math.round(num(body.amount, 0) * 100);
  const record = await prisma.workerBalance.create({
    data: {
      workerId: employee.id,
      amountCents,
      currency: body.currency || 'EUR',
      description: body.description || null,
      source: body.source || 'manual',
      createdBy: body.created_by || null
    }
  });
  res.status(201).json({ success: true, data: record });
});

app.get('/api/employees/:id/time-entries', async (req, res) => {
  const employee = await findEmployeeByAnyId(req.params.id);
  if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
  const entries = await prisma.timeEntry.findMany({ where: { employeeId: employee.id }, orderBy: { createdAt: 'desc' } });
  const totalHours = entries.reduce((s, e) => s + Number(e.hours || 0), 0);
  res.json({ success: true, total_hours: Number(totalHours.toFixed(2)), data: entries });
});

app.post('/api/employees/:id/time-entries', async (req, res) => {
  const employee = await findEmployeeByAnyId(req.params.id);
  if (!employee) return res.status(404).json({ success: false, error: 'Employee not found' });
  const body = req.body || {};
  const entry = await prisma.timeEntry.create({
    data: {
      employeeId: employee.id,
      hours: num(body.hours, 0),
      status: body.status || 'approved',
      description: body.description || null,
      entryDate: body.entry_date ? new Date(body.entry_date) : new Date()
    }
  });
  res.status(201).json({ success: true, data: entry });
});

app.get('/api/settings', async (_req, res) => {
  const rows = await prisma.setting.findMany({ orderBy: { key: 'asc' } });
  res.json({ success: true, data: rows });
});

app.put('/api/settings/:key', async (req, res) => {
  const key = req.params.key;
  const value = req.body?.value;
  const row = await prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  res.json({ success: true, data: row });
});

// Starter-task compatibility endpoints used by current demo shim/admin pages.
app.get('/api/admin/starter-task-tracking', async (_req, res) => {
  const [employees, templates, assignments, contactRows] = await Promise.all([
    prisma.employee.findMany({ include: { profile: true }, orderBy: { createdAt: 'desc' } }),
    getTaskTemplates(),
    getTaskAssignments(),
    prisma.setting.findMany({ where: { key: { startsWith: 'starter-task:contact:' } } })
  ]);

  const starterTemplateIds = new Set(templates.filter((t) => Boolean(t.is_starter_job)).map((t) => t.id));
  const contactByWorker = new Map();
  for (const row of contactRows) {
    const workerId = String(row.key || '').replace('starter-task:contact:', '');
    const history = Array.isArray(row?.value?.history) ? row.value.history : [];
    const last = history.length ? history[history.length - 1] : null;
    contactByWorker.set(workerId, {
      contact_count: history.length,
      last_contact_type: last?.type || null,
      last_contacted_at: last?.at || null,
    });
  }

  const statusFromAssignments = (rows) => {
    if (!rows.length) return 'not_started';
    const statuses = rows.map((r) => String(r.status || '').toLowerCase());
    if (statuses.some((x) => ['approved', 'completed', 'genehmigt'].includes(x))) return 'completed';
    if (statuses.some((x) => ['in_review', 'submitted', 'review', 'pending_review'].includes(x))) return 'in_review';
    if (statuses.some((x) => ['accepted', 'assigned', 'open', 'pending', 'in_progress', 'started'].includes(x))) return 'in_progress';
    return 'not_started';
  };

  const data = employees
    .filter((e) => isKycApprovedStatus(e.profile?.kycStatus))
    .map((e) => {
    const starterAssignments = assignments.filter((a) => {
      if (!starterTemplateIds.has(a.task_template_id)) return false;
      const assignee = String(a.assignee_id || '').trim();
      return assignee === String(e.profileId) || assignee === String(e.id);
    });

    const contact = contactByWorker.get(String(e.profileId)) || contactByWorker.get(String(e.id)) || {
      contact_count: 0,
      last_contact_type: null,
      last_contacted_at: null,
    };

    return {
      id: e.profileId,
      employee_id: e.id,
      profile_id: e.profileId,
      // Frontend starter-task table uses worker_id for /admin/employees/:id navigation,
      // and that details page expects profile id shape.
      worker_id: e.profileId,
      worker_first_name: e.profile.firstName || e.profile.fullName.split(' ')[0] || 'Unknown',
      worker_last_name: e.profile.lastName || e.profile.fullName.split(' ').slice(1).join(' '),
      worker_email: e.profile.email,
      worker_phone: e.profile.phone,
      registered_at: e.createdAt,
      days_since_registration: Math.floor((Date.now() - new Date(e.createdAt).getTime()) / (1000 * 60 * 60 * 24)),
      task_status: statusFromAssignments(starterAssignments),
      starter_tasks_total: starterAssignments.length,
      starter_tasks_completed: starterAssignments.filter((a) => ['approved', 'completed', 'genehmigt'].includes(String(a.status || '').toLowerCase())).length,
      contact_count: contact.contact_count,
      last_contact_type: contact.last_contact_type,
      last_contacted_at: contact.last_contacted_at,
    };
  });

  res.json({ success: true, data });
});

app.get('/api/admin/starter-task-tracking/stats', async (_req, res) => {
  const [employees, templates, assignments, contactRows] = await Promise.all([
    prisma.employee.findMany({ include: { profile: true } }),
    getTaskTemplates(),
    getTaskAssignments(),
    prisma.setting.findMany({ where: { key: { startsWith: 'starter-task:contact:' } } })
  ]);

  const starterTemplateIds = new Set(templates.filter((t) => Boolean(t.is_starter_job)).map((t) => t.id));
  const contactedWorkerIds = new Set(contactRows.map((r) => String(r.key || '').replace('starter-task:contact:', '')));

  const byEmployee = employees
    .filter((e) => isKycApprovedStatus(e.profile?.kycStatus))
    .map((e) => {
    const rows = assignments.filter((a) => {
      if (!starterTemplateIds.has(a.task_template_id)) return false;
      const assignee = String(a.assignee_id || '').trim();
      return assignee === String(e.profileId) || assignee === String(e.id);
    });
    const hasCompleted = rows.some((a) => ['approved', 'completed', 'genehmigt'].includes(String(a.status || '').toLowerCase()));
    return { e, hasCompleted };
  });

  const total = byEmployee.length;
  const pending = byEmployee.filter((x) => !x.hasCompleted).length;
  const contacted = byEmployee.filter((x) => contactedWorkerIds.has(String(x.e.profileId)) || contactedWorkerIds.has(String(x.e.id))).length;

  res.json({ success: true, data: { total_workers: total, pending_workers: pending, contacted_workers: contacted } });
});

app.post('/api/admin/starter-task-tracking/refresh', async (_req, res) => {
  res.json({ success: true, message: 'Refresh completed', refreshed_at: nowIso() });
});

const contactLogKey = (workerId) => `starter-task:contact:${workerId}`;

app.post('/api/admin/starter-task-tracking/:workerId/send-reminder', async (req, res) => {
  const workerId = req.params.workerId;
  const type = req.body?.type || 'email';
  const adminId = req.body?.adminId || null;
  const event = await safeMessageAck('starter-reminder', type, { workerId, adminId, request: req.body || {} });

  const key = contactLogKey(workerId);
  const row = await prisma.setting.findUnique({ where: { key } });
  const oldHistory = Array.isArray(row?.value?.history) ? row.value.history : [];
  const entry = { id: event.id, type, at: nowIso(), adminId, note: 'reminder_sent' };
  await prisma.setting.upsert({
    where: { key },
    update: { value: { history: [...oldHistory.slice(-99), entry] } },
    create: { key, value: { history: [entry] } }
  });

  res.json({ success: true, message: 'Reminder sent', data: { emailSent: type === 'email', smsSent: type !== 'email', errors: [] } });
});

app.post('/api/admin/starter-task-tracking/:workerId/contact-log', async (req, res) => {
  const workerId = req.params.workerId;
  const key = contactLogKey(workerId);
  const row = await prisma.setting.findUnique({ where: { key } });
  const oldHistory = Array.isArray(row?.value?.history) ? row.value.history : [];
  const entry = {
    id: `contact_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    type: req.body?.contactType || 'manual',
    at: nowIso(),
    adminId: req.body?.adminId || null,
    notes: req.body?.notes || null,
    reminderReason: req.body?.reminderReason || null
  };
  const history = [...oldHistory.slice(-99), entry];
  await prisma.setting.upsert({ where: { key }, update: { value: { history } }, create: { key, value: { history } } });
  res.json({ success: true, data: entry });
});

app.get('/api/admin/starter-task-tracking/:workerId/contact-history', async (req, res) => {
  const key = contactLogKey(req.params.workerId);
  const row = await prisma.setting.findUnique({ where: { key } });
  res.json({ success: true, data: (Array.isArray(row?.value?.history) ? row.value.history : []).slice().reverse() });
});

app.get('/api/starter-tasks/workers', (req, res) => {
  req.url = '/api/admin/starter-task-tracking';
  app._router.handle(req, res, () => null);
});
app.get('/api/starter-tasks/stats', (req, res) => {
  req.url = '/api/admin/starter-task-tracking/stats';
  app._router.handle(req, res, () => null);
});
app.post('/api/starter-tasks/refresh', (req, res) => {
  req.url = '/api/admin/starter-task-tracking/refresh';
  app._router.handle(req, res, () => null);
});

const parseBanDurationToDate = (duration) => {
  if (duration === undefined || duration === null) return undefined;
  const text = String(duration).trim().toLowerCase();
  if (!text || text === '0h' || text === '0' || text === 'none') return null;
  const m = text.match(/^(\d+)([mhdw])$/);
  if (!m) return null;
  const amount = Number(m[1]);
  const unit = m[2];
  const multiplier = unit === 'm' ? 60 * 1000 : unit === 'h' ? 60 * 60 * 1000 : unit === 'd' ? 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000;
  return new Date(Date.now() + amount * multiplier);
};

const serializeAdminUser = (profile) => {
  const employee = profile.employee || null;
  const banned = profile.bannedUntil ? new Date(profile.bannedUntil).toISOString() : null;
  return {
    id: profile.id,
    email: profile.email,
    role: profile.role,
    user_metadata: {
      first_name: profile.firstName || '',
      last_name: profile.lastName || '',
      role: profile.role,
      full_name: profile.fullName
    },
    first_name: profile.firstName || '',
    last_name: profile.lastName || '',
    full_name: profile.fullName,
    banned_until: banned,
    ban_duration: banned ? 'active' : '0h',
    created_at: profile.createdAt,
    updated_at: profile.updatedAt,
    profile,
    employee
  };
};

app.get('/api/admin/users', async (req, res) => {
  const role = (req.query.role || '').toString().trim();
  const q = (req.query.q || '').toString().trim();

  const users = await prisma.profile.findMany({
    where: {
      ...(role ? { role } : {}),
      ...(q
        ? {
            OR: [
              { email: { contains: q, mode: 'insensitive' } },
              { fullName: { contains: q, mode: 'insensitive' } },
              { firstName: { contains: q, mode: 'insensitive' } },
              { lastName: { contains: q, mode: 'insensitive' } }
            ]
          }
        : {})
    },
    include: { employee: true },
    orderBy: { createdAt: 'desc' }
  });

  res.json({ users: users.map(serializeAdminUser), count: users.length });
});

app.post('/api/admin/users', async (req, res) => {
  const body = req.body || {};
  const email = (body.email || '').toString().trim().toLowerCase();
  const role = (body.role || 'user').toString();
  const first = (body.first_name || body.firstName || '').toString().trim();
  const last = (body.last_name || body.lastName || '').toString().trim();
  const full = `${first} ${last}`.trim() || body.full_name || email;

  if (!email) return res.status(400).json({ error: 'email is required' });

  try {
    const created = await prisma.$transaction(async (tx) => {
      const profile = await tx.profile.create({
        data: {
          email,
          role,
          firstName: first || null,
          lastName: last || null,
          fullName: full,
          phone: body.phone || null,
          city: body.city || null,
          dateOfBirth: body.date_of_birth ? new Date(body.date_of_birth) : null,
          street: body.street || null,
          postalCode: body.postal_code || null,
          nationality: body.nationality || null,
          bannedUntil: parseBanDurationToDate(body.ban_duration) || null,
          adminNotes: body.admin_notes || null
        },
        include: { employee: true }
      });

      if (role === 'user' && !profile.employee) {
        await tx.employee.create({
          data: {
            profileId: profile.id,
            status: 'active',
            department: body.position || null,
            hiredAt: new Date()
          }
        });
      }

      return tx.profile.findUnique({ where: { id: profile.id }, include: { employee: true } });
    });

    res.status(201).json({ user: serializeAdminUser(created) });
  } catch (error) {
    if (String(error).includes('Unique constraint')) {
      return res.status(409).json({ error: 'email already exists' });
    }
    res.status(500).json({ error: 'Failed to create user', details: String(error) });
  }
});

async function findProfileByAnyId(id) {
  let profile = await prisma.profile.findUnique({ where: { id }, include: { employee: true } });
  if (!profile) {
    const employee = await prisma.employee.findUnique({ where: { id }, include: { profile: { include: { employee: true } } } });
    if (employee?.profile) profile = employee.profile;
  }
  if (!profile) {
    const employee = await prisma.employee.findFirst({ where: { profileId: id }, include: { profile: { include: { employee: true } } } });
    if (employee?.profile) profile = employee.profile;
  }
  return profile;
}

app.patch('/api/admin/users/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body || {};
  const existing = await findProfileByAnyId(id);
  if (!existing) return res.status(404).json({ error: 'User not found' });

  const metadata = body.user_metadata || {};
  const firstName = metadata.first_name ?? body.first_name;
  const lastName = metadata.last_name ?? body.last_name;
  const role = metadata.role ?? body.role;
  const bannedUntil = body.ban_duration !== undefined ? parseBanDurationToDate(body.ban_duration) : undefined;

  const previousKycStatus = String(existing.kycStatus || '').toLowerCase();

  const updated = await prisma.$transaction(async (tx) => {
    const fullNameFromUpdate = `${firstName ?? existing.firstName ?? ''} ${lastName ?? existing.lastName ?? ''}`.trim();
    const profile = await tx.profile.update({
      where: { id: existing.id },
      data: {
        email: body.email ?? undefined,
        firstName: firstName !== undefined ? firstName || null : undefined,
        lastName: lastName !== undefined ? lastName || null : undefined,
        fullName: body.full_name ?? (fullNameFromUpdate || undefined),
        role: role ?? undefined,
        phone: body.phone !== undefined ? body.phone || null : undefined,
        dateOfBirth: body.date_of_birth !== undefined ? (body.date_of_birth ? new Date(body.date_of_birth) : null) : undefined,
        street: body.street !== undefined ? body.street || null : undefined,
        postalCode: body.postal_code !== undefined ? body.postal_code || null : undefined,
        city: body.city !== undefined ? body.city || null : undefined,
        nationality: body.nationality !== undefined ? body.nationality || null : undefined,
        kycStatus: body.kyc_status ?? undefined,
        bannedUntil,
        adminNotes: body.admin_notes !== undefined ? body.admin_notes || null : undefined
      },
      include: { employee: true }
    });

    if ((role === 'user' || role === 'caller') && !profile.employee) {
      await tx.employee.create({ data: { profileId: existing.id, status: 'active', department: body.position || null, hiredAt: new Date() } });
    }

    return tx.profile.findUnique({ where: { id: existing.id }, include: { employee: true } });
  });

  const nextKycStatus = String(updated?.kycStatus || '').toLowerCase();
  const becameApproved = ['approved', 'verified', 'genehmigt'].includes(nextKycStatus) && !['approved', 'verified', 'genehmigt'].includes(previousKycStatus);
  if (becameApproved) {
    assignStarterTasksToProfile(updated.id, 'kyc_approved_auto').catch(() => null);
    safeMessageAck('email', 'kyc-approved', {
      to: updated.email,
      email: updated.email,
      first_name: updated.firstName || '',
      last_name: updated.lastName || '',
      full_name: updated.fullName || '',
    }).catch(() => null);
  }

  const becameDeclined = ['rejected', 'declined', 'abgelehnt'].includes(nextKycStatus) && !['rejected', 'declined', 'abgelehnt'].includes(previousKycStatus);
  if (becameDeclined) {
    const { caseId, webidUrl } = await ensureKycInviteForProfile(updated, 'email');
    await safeMessageAck('email', 'kyc-webid-link', {
      to: updated.email,
      email: updated.email,
      first_name: updated.firstName || '',
      last_name: updated.lastName || '',
      full_name: updated.fullName || '',
      case_id: caseId,
      webid_url: webidUrl,
    });
  }

  res.json({ user: serializeAdminUser(updated) });
});

app.delete('/api/admin/users/:id', async (req, res) => {
  const id = req.params.id;
  const existing = await findProfileByAnyId(id);
  if (!existing) return res.status(404).json({ error: 'User not found' });
  await prisma.profile.delete({ where: { id: existing.id } });
  res.json({ success: true, message: 'User deleted' });
});

app.post('/api/balance/add-bonus', async (req, res) => {
  const body = req.body || {};
  const workerId = body.workerId || body.worker_id;
  if (!workerId) return res.status(400).json({ status: 'error', message: 'workerId is required' });

  const worker = await prisma.employee.findUnique({ where: { id: workerId } });
  if (!worker) return res.status(404).json({ status: 'error', message: 'Worker not found' });

  const amountCents = body.amount_cents !== undefined ? num(body.amount_cents, 0) : Math.round(num(body.amount, 0) * 100);
  const record = await prisma.workerBalance.create({
    data: {
      workerId,
      amountCents,
      description: body.description || 'Manual bonus',
      currency: body.currency || 'EUR',
      source: 'bonus',
      createdBy: body.adminId || body.admin_id || null
    }
  });

  res.json({
    status: 'success',
    message: 'Bonus added',
    data: {
      id: record.id,
      workerId: record.workerId,
      amountCents: record.amountCents,
      amount: Number((record.amountCents / 100).toFixed(2)),
      currency: record.currency,
      createdAt: record.createdAt
    }
  });
});

const HEADLINE_EMAIL_FOOTER_TEXT = `---\nAngaben gemäß § 5 TMG\nHeadline GP GmbH\nHopfenmarkt 33\n20457 Hamburg\nDeutschland\nKontakt\nE-Mail: info@headline-agentur.com\nTelefon: +49 1520 8498 39\nDiese E-Mail wurde automatisch erstellt. Bitte antworten Sie nicht direkt auf diese Nachricht.`;
const HEADLINE_EMAIL_FOOTER_HTML = `<hr style="border:none;border-top:1px solid #e5e7eb;margin:18px 0"/><p style="font-size:12px;color:#6b7280;line-height:1.5">Angaben gemäß § 5 TMG<br/>Headline GP GmbH<br/>Hopfenmarkt 33<br/>20457 Hamburg<br/>Deutschland<br/>Kontakt<br/>E-Mail: <a href="mailto:info@headline-agentur.com">info@headline-agentur.com</a><br/>Telefon: +49 1520 8498 39<br/>Diese E-Mail wurde automatisch erstellt. Bitte antworten Sie nicht direkt auf diese Nachricht.</p>`;

function buildHeadlineEmailTemplate(template, payload = {}, fromName = 'Headline Agentur') {
  const firstName = String(payload?.first_name || payload?.firstName || '').trim();
  const fullNameRaw = String(payload?.full_name || `${payload?.first_name || ''} ${payload?.last_name || ''}`).trim();
  const fallbackName = String(payload?.name || '').trim();
  const fullName = firstName || fullNameRaw || fallbackName || 'Guten Tag';
  const registrationUrl = String(payload?.registration_url || payload?.registrationUrl || '').trim();
  const webidUrl = String(payload?.webid_url || payload?.webidUrl || '').trim();
  const resetLink = String(payload?.reset_link || payload?.resetLink || '').trim();

  const map = {
    welcome: {
      subject: 'Willkommen bei Headline Agentur',
      text: `Hallo ${fullName},\n\nherzlich willkommen bei Headline Agentur. Ihr Konto wurde erfolgreich erstellt. Sie können sich nun anmelden und mit Ihren ersten Aufgaben beginnen.\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>herzlich willkommen bei Headline Agentur. Ihr Konto wurde erfolgreich erstellt. Sie können sich nun anmelden und mit Ihren ersten Aufgaben beginnen.</p>${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'job-application-approved-registration-link': {
      subject: 'Ihre Bewerbung wurde genehmigt',
      text: `Hallo ${fullName},\n\nIhre Bewerbung wurde erfolgreich geprüft und genehmigt. Sie können jetzt auf Ihr Dashboard zugreifen und verfügbare Aufgaben einsehen.${registrationUrl ? `\n\nRegistrierung: ${registrationUrl}` : ''}\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Ihre Bewerbung wurde erfolgreich geprüft und genehmigt. Sie können jetzt auf Ihr Dashboard zugreifen und verfügbare Aufgaben einsehen.</p>${registrationUrl ? `<p><a href="${registrationUrl}">Registrierung öffnen</a></p>` : ''}${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'approve-application': {
      subject: 'Ihre Bewerbung wurde genehmigt',
      text: `Hallo ${fullName},\n\nIhre Bewerbung wurde erfolgreich geprüft und genehmigt. Sie können jetzt auf Ihr Dashboard zugreifen und verfügbare Aufgaben einsehen.${registrationUrl ? `\n\nRegistrierung: ${registrationUrl}` : ''}\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Ihre Bewerbung wurde erfolgreich geprüft und genehmigt. Sie können jetzt auf Ihr Dashboard zugreifen und verfügbare Aufgaben einsehen.</p>${registrationUrl ? `<p><a href="${registrationUrl}">Registrierung öffnen</a></p>` : ''}${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'application-rejected': {
      subject: 'Update zu Ihrer Bewerbung',
      text: `Hallo ${fullName},\n\nvielen Dank für Ihr Interesse. Leider konnte Ihre Bewerbung aktuell nicht berücksichtigt werden. Sie können sich jederzeit erneut bewerben.\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>vielen Dank für Ihr Interesse. Leider konnte Ihre Bewerbung aktuell nicht berücksichtigt werden. Sie können sich jederzeit erneut bewerben.</p>${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'kyc-approved': {
      subject: 'Verifizierung erfolgreich abgeschlossen',
      text: `Hallo ${fullName},\n\nIhre Identitätsprüfung wurde erfolgreich abgeschlossen. Ihr Konto ist nun vollständig aktiviert.\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Ihre Identitätsprüfung wurde erfolgreich abgeschlossen. Ihr Konto ist nun vollständig aktiviert.</p>${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'kyc-rejected': {
      subject: 'Verifizierung nicht erfolgreich',
      text: `Hallo ${fullName},\n\nIhre Identitätsprüfung konnte leider nicht bestätigt werden. Bitte überprüfen Sie Ihre Angaben und starten Sie den Vorgang erneut.\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Ihre Identitätsprüfung konnte leider nicht bestätigt werden. Bitte überprüfen Sie Ihre Angaben und starten Sie den Vorgang erneut.</p>${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'kyc-webid-link': {
      subject: 'Erinnerung zur Identitätsprüfung',
      text: `Hallo ${fullName},\n\nIhre Identitätsprüfung wurde noch nicht abgeschlossen. Bitte schließen Sie den Verifizierungsprozess ab, um Ihr Konto vollständig zu aktivieren.${webidUrl ? `\n\nVerifizierungslink: ${webidUrl}` : ''}\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Ihre Identitätsprüfung wurde noch nicht abgeschlossen. Bitte schließen Sie den Verifizierungsprozess ab, um Ihr Konto vollständig zu aktivieren.</p>${webidUrl ? `<p><a href="${webidUrl}">Verifizierungsprozess starten</a></p>` : ''}${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'password-reset': {
      subject: 'Passwort zurücksetzen',
      text: `Hallo ${fullName},\n\nSie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt. Bitte nutzen Sie den folgenden Link, um ein neues Passwort festzulegen:${resetLink ? `\n${resetLink}` : ''}\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Sie haben eine Anfrage zum Zurücksetzen Ihres Passworts gestellt. Bitte nutzen Sie den folgenden Link, um ein neues Passwort festzulegen:</p>${resetLink ? `<p><a href="${resetLink}">${resetLink}</a></p>` : ''}${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'videoident-data': {
      subject: 'VideoIdent Informationen',
      text: `Hallo ${fullName},\n\nIhre Verifizierungsdaten wurden erfolgreich übermittelt und werden derzeit geprüft. Sie erhalten eine Benachrichtigung, sobald der Prozess abgeschlossen ist.\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Ihre Verifizierungsdaten wurden erfolgreich übermittelt und werden derzeit geprüft. Sie erhalten eine Benachrichtigung, sobald der Prozess abgeschlossen ist.</p>${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'task-reminder': {
      subject: 'Erinnerung an offene Aufgaben',
      text: `Hallo ${fullName},\n\nSie haben noch offene Aufgaben in Ihrem Dashboard. Bitte prüfen Sie diese zeitnah.\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Sie haben noch offene Aufgaben in Ihrem Dashboard. Bitte prüfen Sie diese zeitnah.</p>${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
    'task-assigned': {
      subject: 'Neue Aufgabe zugewiesen',
      text: `Hallo ${fullName},\n\nIhnen wurde eine neue Aufgabe zugewiesen. Weitere Informationen finden Sie in Ihrem Dashboard.\n\n${HEADLINE_EMAIL_FOOTER_TEXT}`,
      html: `<p>Hallo ${fullName},</p><p>Ihnen wurde eine neue Aufgabe zugewiesen. Weitere Informationen finden Sie in Ihrem Dashboard.</p>${HEADLINE_EMAIL_FOOTER_HTML}`,
    },
  };

  const tpl = map[template] || null;
  return {
    subject: String(payload?.subject || '').trim() || tpl?.subject || 'Neue Nachricht',
    text: tpl?.text || String(payload?.text || payload?.message || ''),
    html: tpl?.html || String(payload?.html || '').trim() || undefined,
  };
}

const maybeSendSmtpEmail = async (cfg, template, payload = {}) => {
  const smtp = cfg?.providers?.smtp || {};
  const user = String(smtp.username || smtp.user || '').trim();
  const pass = String(smtp.password || smtp.pass || '').trim();
  const host = String(smtp.host || '').trim();
  const to = String(payload?.to || payload?.email || '').trim();

  if (!smtp?.enabled) return { sent: false, reason: 'smtp_disabled' };
  if (!host || !user || !pass || !to) return { sent: false, reason: 'smtp_incomplete' };

  const secure = Boolean(smtp.secure);
  const port = Number(smtp.port) || (secure ? 465 : 587);
  const fromEmail = String(smtp.from_email || user).trim();
  const fromName = String(smtp.from_name || 'MagicVics').trim();
  const from = fromName ? `${fromName} <${fromEmail}>` : fromEmail;

  const { subject, text, html } = buildHeadlineEmailTemplate(template, payload, fromName);

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
    socketTimeout: 8000,
  });

  const info = await transporter.sendMail({ from, to, subject, text, html });
  return { sent: true, provider: 'smtp', message_id: info?.messageId || null };
};

const maybeSendResendEmail = async (cfg, template, payload = {}) => {
  const resend = cfg?.providers?.resend || {};
  const apiKey = String(resend.api_key || '').trim();
  const enabled = resend.enabled !== false;
  const to = String(payload?.to || payload?.email || '').trim();
  if (!enabled) return { sent: false, reason: 'resend_disabled' };
  if (!apiKey || !to) return { sent: false, reason: 'resend_incomplete' };

  const fromEmail = String(resend.from_email || cfg?.providers?.smtp?.from_email || 'no-reply@example.com').trim();
  const fromName = String(resend.from_name || cfg?.providers?.smtp?.from_name || 'Headline Agentur').trim();
  const from = fromName ? `${fromName} <${fromEmail}>` : fromEmail;

  const { subject, text, html } = buildHeadlineEmailTemplate(template, payload, fromName);

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html: html || undefined,
      text: text || undefined,
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    return { sent: false, reason: 'resend_error', status: resp.status, error: errText.slice(0, 300) };
  }

  const out = await resp.json().catch(() => ({}));
  return { sent: true, provider: 'resend', message_id: out?.id || null };
};

const maybeSendBrevoApiEmail = async (cfg, template, payload = {}) => {
  const brevo = cfg?.providers?.brevo || {};
  const apiKey = String(brevo.api_key || '').trim();
  const enabled = brevo.enabled !== false;
  const to = String(payload?.to || payload?.email || '').trim();
  if (!enabled) return { sent: false, reason: 'brevo_disabled' };
  if (!apiKey || !to) return { sent: false, reason: 'brevo_incomplete' };

  const fromEmail = String(brevo.from_email || cfg?.providers?.smtp?.from_email || 'no-reply@example.com').trim();
  const fromName = String(brevo.from_name || cfg?.providers?.smtp?.from_name || 'MagicVics').trim();

  const { subject, text, html } = buildHeadlineEmailTemplate(template, payload, fromName);
  const fullName = String(payload?.first_name || payload?.firstName || '').trim()
    || String(payload?.full_name || `${payload?.first_name || ''} ${payload?.last_name || ''}`).trim()
    || String(payload?.name || '').trim()
    || 'Guten Tag';

  const resp = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': apiKey,
    },
    body: JSON.stringify({
      sender: { email: fromEmail, name: fromName },
      to: [{ email: to, name: fullName }],
      subject,
      htmlContent: html || undefined,
      textContent: text || undefined,
    })
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    return { sent: false, reason: 'brevo_error', status: resp.status, error: errText.slice(0, 300) };
  }

  const out = await resp.json().catch(() => ({}));
  return { sent: true, provider: 'brevo', message_id: out?.messageId || null };
};

const safeMessageAck = async (channel, template, payload = {}) => {
  const key = `${channel}:${template}`;
  const existing = await prisma.setting.findUnique({ where: { key } });
  const log = Array.isArray(existing?.value?.events) ? existing.value.events : [];

  let delivery = null;
  if (String(channel).toLowerCase() === 'email') {
    try {
      const row = await prisma.setting.findUnique({ where: { key: 'email:providers' } });
      const cfg = row?.value || {};
      const active = String(cfg?.active_provider || 'smtp').toLowerCase();

      const sendPromise = active === 'brevo'
        ? maybeSendBrevoApiEmail(cfg, template, payload)
        : active === 'resend'
          ? maybeSendResendEmail(cfg, template, payload)
          : maybeSendSmtpEmail(cfg, template, payload);

      delivery = await Promise.race([
        sendPromise,
        new Promise((resolve) => setTimeout(() => resolve({ sent: false, reason: 'email_timeout' }), 8000)),
      ]);
    } catch (error) {
      delivery = { sent: false, reason: 'email_error', error: String(error) };
    }
  }

  const event = {
    id: `evt_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    at: nowIso(),
    channel,
    template,
    payload,
    delivery,
  };
  const next = [...log.slice(-99), event];
  await prisma.setting.upsert({ where: { key }, update: { value: { events: next } }, create: { key, value: { events: next } } });
  return event;
};

const generateWebIdCaseId = () => {
  const seg = () => String(Math.floor(100 + Math.random() * 900));
  return `${seg()}-${seg()}-${seg()}`;
};

const normalizeCaseId = (v) => String(v || '').trim().replace(/[^0-9-]/g, '').slice(0, 40);

const HEADLINE_WEBID_BASE = String(process.env.HEADLINE_WEBID_BASE || 'https://headline-production.up.railway.app').replace(/\/$/, '');
const HEADLINE_API_BASE = String(process.env.HEADLINE_API_BASE || HEADLINE_WEBID_BASE).replace(/\/$/, '');
const HEADLINE_PORTAL_BASE = String(process.env.HEADLINE_PORTAL_BASE || 'https://portal.headline-agentur.com').replace(/\/$/, '');

const getKycInvites = async () => {
  const row = await loadJsonSetting('kyc:webid:invites', { invites: [] });
  const invites = Array.isArray(row?.invites) ? row.invites : [];
  return invites;
};

const setKycInvites = async (invites) => {
  await saveJsonSetting('kyc:webid:invites', { invites });
};

const ensureKycInviteForProfile = async (profile, type = 'email') => {
  const invites = await getKycInvites();
  const existingIdx = invites.findIndex((x) => String(x.profileId) === String(profile.id));
  const caseId = existingIdx >= 0 ? invites[existingIdx].caseId : generateWebIdCaseId();
  const webidUrl = `${HEADLINE_WEBID_BASE}/webid/${encodeURIComponent(caseId)}`;

  const entry = {
    profileId: profile.id,
    email: profile.email,
    caseId,
    webidUrl,
    type,
    status: 'sent',
    updatedAt: nowIso(),
    sentAt: nowIso(),
  };

  if (existingIdx >= 0) invites[existingIdx] = { ...invites[existingIdx], ...entry };
  else invites.unshift(entry);
  await setKycInvites(invites.slice(0, 1000));

  return { caseId, webidUrl };
};

const fetchHeadlineKycSubmissions = async () => {
  if (!HEADLINE_API_BASE) return [];
  try {
    const resp = await fetch(`${HEADLINE_API_BASE}/api/admin/kyc-submissions`, { method: 'GET' });
    if (!resp.ok) return [];
    const payload = await resp.json().catch(() => ({}));
    return Array.isArray(payload?.data) ? payload.data : [];
  } catch {
    return [];
  }
};

const toHeadlineProxyAssetUrl = (v) => {
  const raw = String(v || '').trim().replace(/^\/+/, '');
  if (!raw) return null;
  const base = String(HEADLINE_API_BASE || '').replace(/\/$/, '');
  // Prefer direct absolute asset URL to avoid frontend/router rewrites on /api paths.
  if (base && raw.startsWith('uploads/webid/')) return `${base}/${raw}`;
  return `/api/admin/kyc-document?path=${encodeURIComponent(raw)}`;
};

app.get('/api/admin/kyc-document', async (req, res) => {
  try {
    let rawPath = String(req.query?.path || '').trim();
    // tolerate double-encoded paths from frontend widgets
    for (let i = 0; i < 2; i += 1) {
      try {
        const dec = decodeURIComponent(rawPath);
        if (dec === rawPath) break;
        rawPath = dec;
      } catch {
        break;
      }
    }
    // extra normalization for stubborn encoded slashes coming through unchanged
    rawPath = rawPath.replace(/%2F/gi, '/').replace(/^\/+/, '');
    if (!rawPath || !rawPath.startsWith('uploads/webid/')) {
      return res.status(400).json({ success: false, message: 'Invalid document path' });
    }

    const base = String(HEADLINE_API_BASE || '').replace(/\/$/, '');
    const sourceUrl = `${base}/${rawPath}`;
    let resp = await fetch(sourceUrl, { method: 'GET' });

    if (!resp.ok && resp.status === 404) {
      const fallbackUrl = `${base}/api/admin/kyc-document?path=${encodeURIComponent(rawPath)}`;
      resp = await fetch(fallbackUrl, { method: 'GET' });
    }

    if (!resp.ok) return res.status(resp.status).send('Document fetch failed');

    const ct = resp.headers.get('content-type') || 'application/octet-stream';
    const ab = await resp.arrayBuffer();
    res.setHeader('content-type', ct);
    return res.status(200).send(Buffer.from(ab));
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to proxy KYC document', error: String(error) });
  }
});

app.post('/api/admin/kyc/:workerId/approve', async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const profile = await findProfileByAnyId(workerId);
    if (!profile) return res.status(404).json({ success: false, message: 'User not found' });

    const updated = await prisma.profile.update({
      where: { id: profile.id },
      data: { kycStatus: 'approved' },
    });

    assignStarterTasksToProfile(updated.id, 'kyc_approved_auto').catch(() => null);
    safeMessageAck('email', 'kyc-approved', {
      to: updated.email,
      email: updated.email,
      first_name: updated.firstName || '',
      last_name: updated.lastName || '',
      full_name: updated.fullName || '',
    }).catch(() => null);

    return res.json({ success: true, data: { id: updated.id, kyc_status: 'approved' } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to approve KYC', error: String(error) });
  }
});

app.get('/api/admin/kyc/profiles-feed', async (_req, res) => {
  try {
    const users = await prisma.profile.findMany({
      where: { role: { in: ['user', 'caller'] } },
      orderBy: { updatedAt: 'desc' }
    });

    const invites = await getKycInvites();
    const submissions = await fetchHeadlineKycSubmissions();
    const subByCase = new Map(
      submissions
        .map((s) => {
          const key = normalizeCaseId(s.case_id || s.id);
          return key ? [key, s] : null;
        })
        .filter(Boolean)
    );

    const data = users.map((u) => {
      const inv = invites.find((x) => String(x.profileId) === String(u.id));
      const sub = inv ? subByCase.get(normalizeCaseId(inv.caseId)) : null;

      const rawSubStatus = String(sub?.kyc_status || '').toLowerCase();
      const mappedSubStatus = ['in_review', 'uploaded', 'pending_review', 'submitted'].includes(rawSubStatus)
        ? 'submitted'
        : (rawSubStatus || 'submitted');
      const profileStatus = String(u.kycStatus || '').toLowerCase();
      const normalizedProfileStatus = ['verified', 'genehmigt'].includes(profileStatus)
        ? 'approved'
        : ['declined', 'abgelehnt'].includes(profileStatus)
          ? 'rejected'
          : profileStatus;
      const kycStatus = ['approved', 'rejected', 'in_review'].includes(normalizedProfileStatus)
        ? normalizedProfileStatus
        : (sub ? mappedSubStatus : (u.kycStatus || 'pending'));
      const docs = sub
        ? {
            identity_card_front: toHeadlineProxyAssetUrl(sub.kyc_documents?.identity_card_front),
            identity_card_back: toHeadlineProxyAssetUrl(sub.kyc_documents?.identity_card_back),
            selfie: toHeadlineProxyAssetUrl(sub.kyc_documents?.selfie),
            detected_name: sub.kyc_documents?.detected_name || null,
            detected_id_number: sub.kyc_documents?.detected_id_number || null,
            detected_confidence: sub.kyc_documents?.detected_confidence || null,
            case_id: inv?.caseId || sub.id || null,
          }
        : (u.kycDocuments || null);

      return {
        id: u.id,
        first_name: u.firstName || '',
        last_name: u.lastName || '',
        email: u.email || '',
        phone: u.phone || null,
        role: 'user',
        kyc_status: kycStatus,
        kyc_documents: docs,
        kyc_verified_at: u.kycVerifiedAt || null,
        updated_at: sub?.updated_at || inv?.updatedAt || u.updatedAt,
        created_at: u.createdAt,
      };
    });

    return res.json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, error: String(error) });
  }
});

app.post('/api/admin/kyc/:workerId/send-reminder', async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const type = req.body?.type || 'email';

    const profile = await findProfileByAnyId(workerId);
    if (!profile) return res.status(404).json({ success: false, message: 'User not found' });

    const { caseId, webidUrl } = await ensureKycInviteForProfile(profile, type);

    let emailEvent = null;
    if (type === 'email' || type === 'both') {
      emailEvent = await safeMessageAck('email', 'kyc-webid-link', {
        to: profile.email,
        email: profile.email,
        first_name: profile.firstName || '',
        last_name: profile.lastName || '',
        full_name: profile.fullName || '',
        case_id: caseId,
        webid_url: webidUrl,
        admin_id: req.body?.adminId || null,
      });
    }

    const event = await safeMessageAck('kyc-reminder', type, {
      profile_id: profile.id,
      email: profile.email,
      case_id: caseId,
      webid_url: webidUrl,
      admin_id: req.body?.adminId || null,
      email_event_id: emailEvent?.id || null,
    });

    return res.json({
      success: true,
      message: 'KYC-Link erstellt und Erinnerung registriert.',
      data: {
        emailSent: type === 'email' || type === 'both',
        smsSent: type === 'sms' || type === 'both',
        webidUrl,
        caseId,
        event_id: event.id,
        email_event_id: emailEvent?.id || null,
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to send reminder', error: String(error) });
  }
});
app.post('/api/email/:template', async (req, res) => {
  const template = String(req.params.template || '').trim();
  const payload = req.body || {};

  if (template === 'approve-application') {
    const applicationId = String(payload.applicationId || payload.application_id || '').trim();
    if (applicationId) {
      // Fire-and-forget fallback so UI never hangs on this email endpoint.
      // Approval should primarily happen through /api/admin/job-applications/:id.
      (async () => {
        try {
          const scheme = (String(process.env.PUBLIC_BASE_URL || '').startsWith('https://') || String(process.env.RAILWAY_PUBLIC_DOMAIN || '').trim()) ? 'https' : 'http';
          const host = String(process.env.PUBLIC_BASE_URL || '').replace(/^https?:\/\//, '').replace(/\/$/, '')
            || String(process.env.RAILWAY_PUBLIC_DOMAIN || '').trim()
            || `127.0.0.1:${port}`;

          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 3500);
          try {
            await fetch(`${scheme}://${host}/api/admin/job-applications/${encodeURIComponent(applicationId)}`, {
              method: 'PATCH',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ status: 'approved' }),
              signal: controller.signal,
            });
          } finally {
            clearTimeout(timer);
          }
        } catch {
          // Keep endpoint fast/resilient even if fallback patch fails.
        }
      })();
    }
  }

  const event = await safeMessageAck('email', template, payload);
  res.json({ success: true, status: 'queued', channel: 'email', template, event_id: event.id, simulated: false, delivery: event.delivery || null });
});

app.post('/api/telegram/:template', async (req, res) => {
  const event = await safeMessageAck('telegram', req.params.template, req.body || {});
  res.json({ success: true, status: 'queued', channel: 'telegram', template: req.params.template, event_id: event.id, simulated: true });
});

app.get('/api/email/history', async (_req, res) => {
  const rows = await prisma.setting.findMany({ where: { key: { startsWith: 'email:' } }, orderBy: { updatedAt: 'desc' } });
  const data = rows.flatMap((r) => (Array.isArray(r.value?.events) ? r.value.events : []));
  res.json({ success: true, data });
});

app.get('/api/telegram/history', async (_req, res) => {
  const rows = await prisma.setting.findMany({ where: { key: { startsWith: 'telegram:' } }, orderBy: { updatedAt: 'desc' } });
  const data = rows.flatMap((r) => (Array.isArray(r.value?.events) ? r.value.events : []));
  res.json({ success: true, data });
});

// Minimal Supabase REST/RPC compatibility for demos that still call those shapes.
app.post('/rpc/get_profiles_with_emails_complete', async (_req, res) => {
  const profiles = await prisma.profile.findMany({ orderBy: { createdAt: 'desc' } });
  const data = profiles.map((p) => ({
    id: p.id,
    first_name: p.firstName,
    last_name: p.lastName,
    email: p.email,
    role: p.role,
    banned_until: p.bannedUntil,
    created_at: p.createdAt,
    updated_at: p.updatedAt
  }));
  res.json(data);
});

app.post('/rpc/get_profiles_with_emails_by_ids', async (req, res) => {
  const ids = req.body?.profile_ids;
  if (!Array.isArray(ids)) return res.status(400).json({ error: 'profile_ids array required' });
  const profiles = await prisma.profile.findMany({ where: { id: { in: ids } } });
  const data = profiles.map((p) => ({
    id: p.id,
    first_name: p.firstName,
    last_name: p.lastName,
    email: p.email,
    role: p.role,
    banned_until: p.bannedUntil
  }));
  res.json(data);
});

app.post('/rpc/backfill_sequential_tasks_for_all_users', async (_req, res) => {
  res.json([]);
});

// Existing phone endpoints retained
app.get('/api/phone/providers', (_req, res) => {
  res.json({
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
});

app.get('/api/phone/services', (req, res) => {
  const provider = req.query.provider || 'anosim';
  const mode = req.query.mode || 'rental';
  res.json({
    status: 'success',
    data: {
      provider,
      mode,
      services: {
        go: { name: 'Google, YouTube, Gmail', cost: 0.8 },
        wa: { name: 'WhatsApp', cost: 0.9 },
        tg: { name: 'Telegram', cost: 0.7 },
        full_germany: { name: 'Deutschland - Vollmiete (alle Dienste)', cost: 10.85 },
        full: { name: 'Beste Vollmiete (automatische Auswahl)', cost: 10.85 },
        ot: { name: 'OTHER', cost: 0.6 }
      },
      countries: {
        '98': { name: 'Deutschland' },
        '286': { name: 'Vereinigtes KÃ¶nigreich' },
        '67': { name: 'Tschechische Republik' },
        '165': { name: 'Litauen' },
        '196': { name: 'Niederlande' }
      }
    }
  });
});

app.post('/api/phone/rent', async (req, res) => {
  const body = req.body || {};

  const record = await prisma.phoneNumber.create({
    data: {
      phoneNumber: body.phone_number || body.phoneNumber || `+4917${Math.floor(1000000 + Math.random() * 8999999)}`,
      provider: body.provider || 'anosim',
      service: body.service || 'go',
      country: body.country || '98',
      monthlyPrice: body.monthlyPrice || 10.85,
      status: 'active'
    }
  });

  res.json({
    status: 'success',
    data: {
      id: record.id,
      rent_id: `rent-${record.id}`,
      phone_number: record.phoneNumber,
      provider: record.provider,
      service: record.service,
      country: record.country,
      status: record.status,
      end_date: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
    }
  });
});

app.get('/api/phone/list', async (_req, res) => {
  const data = await prisma.phoneNumber.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ status: 'success', data });
});

const getSettingJson = async (key, fallback) => {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? fallback;
};

const putSettingJson = async (key, value) => {
  return prisma.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
};

app.post('/api/balance/approve-task-payment', async (req, res) => {
  const body = req.body || {};
  const taskId = body.taskId || body.task_id || null;
  const amountCents = body.amount_cents !== undefined ? num(body.amount_cents, 0) : Math.round(num(body.amount, 0) * 100);

  let workerId = body.workerId || body.worker_id || null;
  if (!workerId && taskId) {
    const task = await prisma.taskAssignment.findUnique({ where: { id: taskId } });
    workerId = task?.assigneeId || null;
  }

  if (!workerId) return res.status(400).json({ success: false, status: 'error', message: 'workerId or task_id with valid assignee is required' });
  if (!amountCents) return res.status(400).json({ success: false, status: 'error', message: 'amount is required' });

  const worker = await prisma.employee.findUnique({ where: { id: workerId } });
  if (!worker) return res.status(404).json({ success: false, status: 'error', message: 'Worker not found' });

  const approvalKey = taskId ? `balance:task-payment:${taskId}` : null;
  if (approvalKey) {
    const existing = await prisma.setting.findUnique({ where: { key: approvalKey } });
    if (existing?.value?.balance_id) {
      return res.json({
        success: true,
        status: 'success',
        message: 'Task payment already approved',
        already_approved: true,
        data: existing.value
      });
    }
  }

  const created = await prisma.workerBalance.create({
    data: {
      workerId,
      amountCents,
      currency: body.currency || 'EUR',
      description: body.description || `Task payment${taskId ? ` for ${taskId}` : ''}`,
      source: 'task_payment',
      createdBy: body.adminId || body.admin_id || null
    }
  });

  const payload = {
    task_id: taskId,
    worker_id: workerId,
    balance_id: created.id,
    amount_cents: created.amountCents,
    amount: Number((created.amountCents / 100).toFixed(2)),
    currency: created.currency,
    approved_at: nowIso(),
    approved_by: body.adminId || body.admin_id || null
  };

  if (approvalKey) await putSettingJson(approvalKey, payload);

  res.json({ success: true, status: 'success', message: 'Task payment approved', data: payload });
});

app.get('/api/admin/export/employees', async (req, res) => {
  const employees = await prisma.employee.findMany({ include: { profile: true, workerTagLinks: { include: { tag: true } }, balances: true }, orderBy: { createdAt: 'desc' } });
  const rows = employees.map((e) => {
    const s = serializeEmployee(e);
    return {
      id: s.id,
      email: s.email || '',
      first_name: s.first_name || '',
      last_name: s.last_name || '',
      full_name: s.full_name || '',
      role: s.role || '',
      status: s.status || '',
      department: s.department || '',
      salary_cents: s.salary_cents || 0,
      worker_balance_cents: s.worker_balance_cents || 0,
      tags: (s.tags || []).map((t) => t.name).join('|'),
      created_at: s.created_at,
      updated_at: s.updated_at
    };
  });

  if ((req.query.format || '').toString().toLowerCase() === 'csv') {
    const header = Object.keys(rows[0] || { id: '', email: '', first_name: '', last_name: '', full_name: '', role: '', status: '', department: '', salary_cents: '', worker_balance_cents: '', tags: '', created_at: '', updated_at: '' });
    const csvEscape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const lines = [header.join(','), ...rows.map((r) => header.map((k) => csvEscape(r[k])).join(','))];
    const csv = lines.join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="employees-export-${new Date().toISOString().slice(0, 10)}.csv"`);
    return res.status(200).send(csv);
  }

  res.json({ success: true, exported_at: nowIso(), count: rows.length, data: rows });
});

const EMAIL_PROVIDER_DEFAULTS = {
  active_provider: 'smtp',
  providers: {
    smtp: { enabled: true, host: '', port: 587, secure: false, username: '', password: '', from_email: '', from_name: 'Headline Agentur' },
    resend: { enabled: false, api_key: '', from_email: '', from_name: 'Headline Agentur' },
    sendgrid: { enabled: false, api_key_set: false, from_email: '', from_name: 'Headline Agentur' },
    brevo: { enabled: false, api_key: '', from_email: '', from_name: 'Headline Agentur' }
  }
};

async function getEmailDeliveryStatsMap() {
  try {
    const rows = await prisma.setting.findMany({ where: { key: { startsWith: 'email:' } } });
    const byProvider = {};
    const now = Date.now();
    const windowMs = 7 * 24 * 60 * 60 * 1000;

    for (const row of rows) {
      if (row.key === 'email:providers') continue;
      const events = Array.isArray(row?.value?.events) ? row.value.events : [];
      for (const ev of events) {
        const delivery = ev?.delivery || {};
        const provider = String(delivery?.provider || '').toLowerCase();
        if (!provider) continue;

        const ts = Date.parse(String(ev?.at || ''));
        if (!Number.isFinite(ts) || (now - ts) > windowMs) continue;

        if (!byProvider[provider]) byProvider[provider] = { sent: 0, errors: 0, total: 0, success_rate: 0 };
        byProvider[provider].total += 1;
        if (delivery?.sent) byProvider[provider].sent += 1;
        else byProvider[provider].errors += 1;
      }
    }

    for (const key of Object.keys(byProvider)) {
      const s = byProvider[key];
      s.success_rate = s.total > 0 ? Number(((s.sent / s.total) * 100).toFixed(1)) : 0;
    }

    return byProvider;
  } catch {
    return {};
  }
}

function emailProvidersRowsFromConfig(cfg = EMAIL_PROVIDER_DEFAULTS, statsMap = {}) {
  const providersMap = cfg?.providers || {};
  return Object.entries(providersMap).map(([key, value], idx) => {
    const p = value || {};
    const st = statsMap?.[key] || { sent: 0, errors: 0, total: 0, success_rate: 0 };
    return {
      id: idx + 1,
      provider_key: key,
      provider: key,
      name: p.from_name || 'Headline Agentur',
      provider_type: key === 'smtp' ? 'smtp' : 'api',
      from_email: p.from_email || '',
      from_name: p.from_name || 'Headline Agentur',
      api_key: p.api_key ? '***' : '',
      smtp_host: p.host || '',
      smtp_port: p.port || 587,
      smtp_secure: !!p.secure,
      smtp_user: p.username ? '***' : '',
      smtp_password: p.password ? '***' : '',
      host: p.host || null,
      port: p.port || null,
      secure: !!p.secure,
      username: p.username ? '***' : null,
      api_key_set: !!(p.api_key || p.api_key_set),
      priority: Number(p.priority || idx + 1),
      is_active: cfg?.active_provider === key,
      active: cfg?.active_provider === key,
      enabled: p.enabled !== false,
      sent_count: st.sent,
      error_count: st.errors,
      success_rate: st.success_rate,
    };
  });
}

app.get('/api/email/providers', async (_req, res) => {
  const data = await getSettingJson('email:providers', EMAIL_PROVIDER_DEFAULTS);
  const statsMap = await getEmailDeliveryStatsMap();
  const rows = emailProvidersRowsFromConfig(data, statsMap);
  // Frontend expects a plain array here
  res.json(rows);
});

app.put('/api/email/providers', async (req, res) => {
  const current = await getSettingJson('email:providers', EMAIL_PROVIDER_DEFAULTS);
  const next = { ...current, ...(req.body || {}) };
  await putSettingJson('email:providers', next);
  res.json({ success: true, status: 'success', message: 'Email providers updated', data: next });
});

app.post('/api/email/providers', async (req, res) => {
  const body = req.body || {};
  const current = await getSettingJson('email:providers', EMAIL_PROVIDER_DEFAULTS);
  const providers = { ...(current.providers || {}) };

  const providerKey = String(
    body.provider_key
      || body.provider
      || body.type
      || (String(body.provider_type || '').toLowerCase().includes('smtp') ? 'smtp' : 'resend')
  ).toLowerCase();

  const existing = providers[providerKey] || {};
  providers[providerKey] = {
    ...existing,
    enabled: body.enabled !== false,
    from_email: String(body.from_email || existing.from_email || '').trim(),
    from_name: String(body.from_name || body.name || existing.from_name || 'Headline Agentur').trim(),
    priority: Number(body.priority || existing.priority || 1),
    ...(providerKey === 'smtp'
      ? {
          host: String(body.smtp_host || body.host || existing.host || '').trim(),
          port: Number(body.smtp_port || body.port || existing.port || 587),
          secure: Boolean(body.smtp_secure ?? body.secure ?? existing.secure ?? false),
          username: String(body.smtp_user || body.username || existing.username || '').trim(),
          password: String(body.smtp_password || body.password || existing.password || '').trim(),
        }
      : {
          api_key: String(body.api_key || body.apiKey || existing.api_key || '').trim(),
        }),
  };

  const setActive = body.is_active === true || body.active === true || String(body.set_active || '').toLowerCase() === 'true';
  const next = {
    ...current,
    providers,
    active_provider: setActive ? providerKey : (current.active_provider || providerKey),
  };

  await putSettingJson('email:providers', next);
  const statsMap = await getEmailDeliveryStatsMap();
  const rows = emailProvidersRowsFromConfig(next, statsMap);
  const created = rows.find((r) => r.provider_key === providerKey) || rows[0] || null;
  res.json(created || { success: true });
});

app.put('/api/email/providers/:id', async (req, res) => {
  const body = req.body || {};
  const current = await getSettingJson('email:providers', EMAIL_PROVIDER_DEFAULTS);
  const keyFromId = Object.keys(current.providers || {})[Math.max(0, Number(req.params.id || 1) - 1)] || null;
  const providerKey = String(body.provider_key || body.provider || keyFromId || '').toLowerCase();
  if (!providerKey) return res.status(400).json({ error: 'invalid_provider' });

  const providers = { ...(current.providers || {}) };
  const existing = providers[providerKey] || {};
  providers[providerKey] = {
    ...existing,
    enabled: body.enabled !== false,
    from_email: String(body.from_email || existing.from_email || '').trim(),
    from_name: String(body.from_name || body.name || existing.from_name || 'Headline Agentur').trim(),
    priority: Number(body.priority || existing.priority || 1),
    ...(providerKey === 'smtp'
      ? {
          host: String(body.smtp_host || body.host || existing.host || '').trim(),
          port: Number(body.smtp_port || body.port || existing.port || 587),
          secure: Boolean(body.smtp_secure ?? body.secure ?? existing.secure ?? false),
          username: String(body.smtp_user || body.username || existing.username || '').trim(),
          password: String(body.smtp_password || body.password || existing.password || '').trim(),
        }
      : {
          api_key: String(body.api_key || body.apiKey || existing.api_key || '').trim() || existing.api_key || '',
        }),
  };

  const next = {
    ...current,
    providers,
    active_provider: body.is_active === true || body.active === true ? providerKey : current.active_provider,
  };

  await putSettingJson('email:providers', next);
  const statsMap = await getEmailDeliveryStatsMap();
  const rows = emailProvidersRowsFromConfig(next, statsMap);
  const updated = rows.find((r) => r.provider_key === providerKey) || rows[0] || null;
  res.json(updated || { success: true });
});

app.delete('/api/email/providers/:id', async (req, res) => {
  const current = await getSettingJson('email:providers', EMAIL_PROVIDER_DEFAULTS);
  const keys = Object.keys(current.providers || {});
  const key = keys[Math.max(0, Number(req.params.id || 1) - 1)] || null;
  if (!key) return res.status(404).json({ error: 'provider_not_found' });

  if (key === current.active_provider) {
    return res.status(400).json({ error: 'cannot_delete_active_provider' });
  }

  const providers = { ...(current.providers || {}) };
  delete providers[key];
  await putSettingJson('email:providers', { ...current, providers });
  res.json({ success: true });
});

app.post('/api/email/providers/:id/test', async (_req, res) => {
  // Keep UI happy; real delivery test can be done with /api/email/welcome endpoint.
  res.json({ success: true, message: 'Test connection endpoint reachable' });
});

// Backward-compatible admin endpoints expected by older dashboard builds
app.get('/api/admin/email-providers', async (_req, res) => {
  const data = await getSettingJson('email:providers', EMAIL_PROVIDER_DEFAULTS);
  const statsMap = await getEmailDeliveryStatsMap();
  const rows = emailProvidersRowsFromConfig(data, statsMap);
  res.json({
    success: true,
    status: 'success',
    data: rows,
    providers: rows,
    active_provider: data?.active_provider || null,
    total: rows.length,
  });
});

async function saveAdminEmailProvider(req, res) {
  const body = req.body || {};
  const current = await getSettingJson('email:providers', { active_provider: 'smtp', providers: {} });
  const providers = { ...(current.providers || {}) };

  const providerKey = String(
    body.provider_key
      || body.provider
      || body.type
      || (String(body.provider_type || '').toLowerCase().includes('smtp') ? 'smtp' : 'resend')
  ).toLowerCase();

  if (!providers[providerKey]) providers[providerKey] = { enabled: true };

  providers[providerKey] = {
    ...providers[providerKey],
    enabled: body.enabled !== false,
    from_email: String(body.from_email || providers[providerKey].from_email || '').trim(),
    from_name: String(body.from_name || body.name || providers[providerKey].from_name || 'Headline Agentur').trim(),
    ...(providerKey === 'smtp'
      ? {
          host: String(body.host || providers[providerKey].host || '').trim(),
          port: Number(body.port || providers[providerKey].port || 587),
          secure: Boolean(body.secure ?? providers[providerKey].secure ?? false),
          username: String(body.username || body.smtp_username || providers[providerKey].username || '').trim(),
          password: String(body.password || body.smtp_password || providers[providerKey].password || '').trim(),
        }
      : {
          api_key: String(body.api_key || body.apiKey || providers[providerKey].api_key || '').trim(),
        }),
  };

  const setActive = body.is_active === true || body.active === true || String(body.set_active || '').toLowerCase() === 'true';
  const next = {
    ...current,
    providers,
    active_provider: setActive ? providerKey : (current.active_provider || providerKey),
  };

  await putSettingJson('email:providers', next);
  return res.json({ success: true, status: 'success', message: 'Email provider saved', data: next });
}

app.post('/api/admin/email-providers', saveAdminEmailProvider);
app.put('/api/admin/email-providers', saveAdminEmailProvider);
app.patch('/api/admin/email-providers', saveAdminEmailProvider);
app.put('/api/admin/email-providers/:id', saveAdminEmailProvider);
app.patch('/api/admin/email-providers/:id', saveAdminEmailProvider);

app.post('/api/admin/email-providers/test', async (_req, res) => {
  return res.json({ success: true, status: 'success', message: 'Provider test endpoint reachable' });
});

app.get('/api/telegram/settings', async (_req, res) => {
  const defaults = { enabled: false, bot_token_set: false, chat_id: null, notifications_enabled: true };
  const data = await getSettingJson('telegram:settings', defaults);
  res.json({ success: true, data });
});

app.put('/api/telegram/settings', async (req, res) => {
  const current = await getSettingJson('telegram:settings', { enabled: false, notifications_enabled: true });
  const next = { ...current, ...(req.body || {}), updated_at: nowIso() };
  await putSettingJson('telegram:settings', next);
  res.json({ success: true, message: 'Telegram settings updated', data: next });
});

app.get('/api/sms/settings', async (_req, res) => {
  const defaults = { enabled: false, provider: 'anosim', sender_id: null, rate_limit_per_minute: 30 };
  const data = await getSettingJson('sms:settings', defaults);
  res.json({ success: true, data });
});

app.put('/api/sms/settings', async (req, res) => {
  const current = await getSettingJson('sms:settings', { enabled: false, provider: 'anosim' });
  const next = { ...current, ...(req.body || {}), updated_at: nowIso() };
  await putSettingJson('sms:settings', next);
  res.json({ success: true, message: 'SMS settings updated', data: next });
});

app.get('/api/sms/providers', async (_req, res) => {
  const data = {
    providers: {
      anosim: { available: true, name: 'Anosim' },
      smspva: { available: true, name: 'SMSPVA' },
      gogetsms: { available: true, name: 'GoGetSMS' },
      juicysms: { available: true, name: 'JuicySMS' }
    },
    availableCount: 4,
    totalCount: 4
  };
  res.json({ success: true, status: 'success', data });
});

app.post('/api/sms/send', async (req, res) => {
  const body = req.body || {};
  const event = await safeMessageAck('sms', 'send', body);
  res.json({ success: true, status: 'queued', channel: 'sms', event_id: event.id, simulated: true });
});

app.get('/api/sms/history', async (_req, res) => {
  const rows = await prisma.setting.findMany({ where: { key: { startsWith: 'sms:' } }, orderBy: { updatedAt: 'desc' } });
  const data = rows.flatMap((r) => (Array.isArray(r.value?.events) ? r.value.events : []));
  res.json({ success: true, data });
});

app.get('/api/ai-knowledge/analytics', async (_req, res) => {
  const [employees, tags, assignments, balances, timeEntries] = await Promise.all([
    prisma.employee.count(),
    prisma.workerTag.count(),
    prisma.workerTagAssignment.count(),
    prisma.workerBalance.aggregate({ _sum: { amountCents: true }, _count: true }),
    prisma.timeEntry.aggregate({ _sum: { hours: true }, _count: true })
  ]);

  const payload = {
    entities: {
      employees,
      tags,
      tag_assignments: assignments,
      balance_records: balances._count || 0,
      time_entries: timeEntries._count || 0
    },
    financial: {
      total_balance_cents: balances._sum.amountCents || 0,
      total_balance_eur: Number(((balances._sum.amountCents || 0) / 100).toFixed(2))
    },
    worklog: {
      total_hours: Number(timeEntries._sum.hours || 0)
    },
    generated_at: nowIso()
  };

  // Keep compatibility with clients expecting either {data} or {analytics}
  res.json({ success: true, data: payload, analytics: payload });
});

const makeId = (prefix) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const parseTimeframeMs = (timeframe) => {
  const tf = (timeframe || '24h').toString().trim().toLowerCase();
  if (tf === '1h') return 60 * 60 * 1000;
  if (tf === '7d') return 7 * 24 * 60 * 60 * 1000;
  if (tf === '30d') return 30 * 24 * 60 * 60 * 1000;
  return 24 * 60 * 60 * 1000;
};

const chatStateFallbackMemory = { value: null };

const loadJsonSetting = async (key, fallback) => {
  try {
    const row = await prisma.setting.findUnique({ where: { key } });
    return row?.value ?? fallback;
  } catch (err) {
    console.error(`[settings] load failed for key=${key}:`, err?.message || err);
    if (key === 'chat:state' && chatStateFallbackMemory.value) return chatStateFallbackMemory.value;
    return fallback;
  }
};

const saveJsonSetting = async (key, value) => {
  try {
    await putSettingJson(key, value);
  } catch (err) {
    console.error(`[settings] save failed for key=${key}:`, err?.message || err);
    if (key === 'chat:state') {
      chatStateFallbackMemory.value = value;
      return;
    }
    throw err;
  }
};

const aiAgentsDefault = () => ({
  settings: {
    knowledge_base_enabled: true,
    semantic_search_enabled: true,
    auto_embeddings: false,
    default_provider: 'openai',
    default_model: 'gpt-4o-mini',
    channels: ['chat'],
    max_context_items: 10,
    updated_at: nowIso()
  },
  agents: [
    {
      id: 'agent_default',
      name: 'Default AI Agent',
      is_active: true,
      provider: 'openai',
      model: 'gpt-4o-mini',
      channels: ['chat'],
      knowledge_base_enabled: true,
      semantic_search_enabled: true,
      system_prompt: 'You are a helpful support assistant.',
      response_template: null,
      temperature: 0.2,
      max_tokens: 800,
      created_at: nowIso(),
      updated_at: nowIso()
    }
  ]
});

const loadAiAgentsState = async () => {
  const current = await loadJsonSetting('ai:agents:state', null);
  if (current && Array.isArray(current.agents)) return current;
  const next = aiAgentsDefault();
  await saveJsonSetting('ai:agents:state', next);
  return next;
};

const normalizeAgentInput = (input = {}, prev = null) => {
  const channels = Array.isArray(input.channels) ? input.channels.map(String) : prev?.channels || ['chat'];
  return {
    ...(prev || {}),
    name: input.name ?? prev?.name ?? 'AI Agent',
    description: input.description ?? prev?.description ?? null,
    is_active: input.is_active ?? input.enabled ?? prev?.is_active ?? true,
    provider: input.provider ?? prev?.provider ?? 'openai',
    model: input.model ?? prev?.model ?? 'gpt-4o-mini',
    channels,
    knowledge_base_enabled: input.knowledge_base_enabled ?? prev?.knowledge_base_enabled ?? true,
    semantic_search_enabled: input.semantic_search_enabled ?? prev?.semantic_search_enabled ?? true,
    system_prompt: input.system_prompt ?? input.prompt ?? prev?.system_prompt ?? '',
    response_template: input.response_template ?? prev?.response_template ?? null,
    temperature: input.temperature !== undefined ? Number(input.temperature) : prev?.temperature ?? 0.2,
    max_tokens: input.max_tokens !== undefined ? num(input.max_tokens, 800) : prev?.max_tokens ?? 800,
    updated_at: nowIso()
  };
};

const loadChatState = async () => {
  const state = await loadJsonSetting('chat:state', null);
  if (state && Array.isArray(state.conversations) && Array.isArray(state.messages)) return state;

  let employees = [];
  try {
    employees = await prisma.employee.findMany({ include: { profile: true }, orderBy: { createdAt: 'asc' }, take: 3 });
  } catch (err) {
    console.error('[chat] failed to load employees for seed state:', err?.message || err);
    employees = [];
  }

  const conversations = employees.map((e, idx) => {
    const createdAt = new Date(Date.now() - (idx + 1) * 2 * 60 * 60 * 1000).toISOString();
    return {
      id: makeId('conv'),
      created_by: e.id,
      conversation_type: idx % 2 === 0 ? 'support' : 'general',
      title: null,
      archived_at: null,
      deleted_at: null,
      created_at: createdAt,
      updated_at: createdAt
    };
  });
  const messages = conversations.flatMap((conv, idx) => {
    const start = Date.now() - (idx + 1) * 2 * 60 * 60 * 1000;
    return [
      {
        id: makeId('msg'),
        conversation_id: conv.id,
        sender_type: 'user',
        sender_id: conv.created_by,
        content: 'Hallo, ich brauche Hilfe bei meiner Aufgabe.',
        message_type: 'text',
        metadata: {},
        deleted_at: null,
        edited_at: null,
        created_at: new Date(start).toISOString(),
        updated_at: new Date(start).toISOString()
      },
      {
        id: makeId('msg'),
        conversation_id: conv.id,
        sender_type: 'ai',
        sender_id: null,
        content: 'NatÃ¼rlich, ich helfe dir gerne. Worum geht es genau?',
        message_type: 'text',
        metadata: {},
        deleted_at: null,
        edited_at: null,
        created_at: new Date(start + 60 * 1000).toISOString(),
        updated_at: new Date(start + 60 * 1000).toISOString()
      }
    ];
  });

  const initial = { conversations, messages, updated_at: nowIso() };
  await saveJsonSetting('chat:state', initial);
  return initial;
};

const saveChatState = async (state) => saveJsonSetting('chat:state', { ...state, updated_at: nowIso() });

const toConversationDto = (conv, state, profilesByEmployee) => {
  const msgs = state.messages
    .filter((m) => m.conversation_id === conv.id && !m.deleted_at)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const last = msgs[msgs.length - 1] || null;
  const profile = profilesByEmployee.get(conv.created_by) || null;
  return {
    ...conv,
    user_profile: profile,
    message_count: msgs.length,
    last_message: last
  };
};

const paginate = (items, page = 1, limit = 20) => {
  const p = clamp(num(page, 1), 1, 100000);
  const l = clamp(num(limit, 20), 1, 5000);
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / l));
  const start = (p - 1) * l;
  return {
    data: items.slice(start, start + l),
    pagination: { page: p, limit: l, total, totalPages }
  };
};

// AI Knowledge extra compatibility endpoints
app.post('/api/ai-knowledge/search', async (req, res) => {
  const query = (req.body?.query || '').toString().trim().toLowerCase();
  const limit = clamp(num(req.body?.limit, 10), 1, 100);
  const threshold = Number(req.body?.threshold ?? 0);

  if (!query) return res.json({ success: true, results: [], searchType: 'semantic' });

  const employees = await prisma.employee.findMany({ include: { profile: true }, take: 500 });
  const corpus = employees.map((e) => ({
    id: e.id,
    title: e.profile?.fullName || e.profile?.email || e.id,
    content: [e.profile?.email, e.department, e.status, e.profile?.city, e.profile?.nationality].filter(Boolean).join(' '),
    source: 'employee'
  }));

  const scored = corpus
    .map((x) => {
      const hay = `${x.title} ${x.content}`.toLowerCase();
      const score = hay.includes(query) ? 1 : query.split(/\s+/).filter((w) => hay.includes(w)).length / Math.max(1, query.split(/\s+/).length);
      return { ...x, score: Number(score.toFixed(3)) };
    })
    .filter((x) => x.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  res.json({ success: true, results: scored, searchType: 'semantic' });
});

app.post('/api/ai-knowledge/embeddings/:id', async (req, res) => {
  const id = req.params.id;
  const vec = Array.from({ length: 16 }).map((_, i) => {
    let h = 0;
    const text = `${id}:${i}`;
    for (let j = 0; j < text.length; j++) h = (h * 31 + text.charCodeAt(j)) >>> 0;
    return Number(((h % 1000) / 1000).toFixed(4));
  });
  await saveJsonSetting(`ai:embedding:${id}`, { id, vector: vec, embeddingSize: vec.length, generated_at: nowIso() });
  res.json({ success: true, id, embeddingSize: vec.length, generated_at: nowIso() });
});

app.get('/api/ai-knowledge/export', async (_req, res) => {
  const analytics = await loadJsonSetting('ai:knowledge:export:cache', null);
  const payload = {
    total_articles: await prisma.employee.count(),
    total_training_examples: 0,
    exported_at: nowIso(),
    cached: analytics
  };
  res.json({ success: true, data: payload });
});

app.put('/api/ai-knowledge/effectiveness/:id', async (req, res) => {
  const id = req.params.id;
  const score = Number(req.body?.effectivenessScore ?? req.body?.score ?? 0);
  const safe = clamp(score, 0, 1);
  await saveJsonSetting(`ai:effectiveness:${id}`, { id, score: safe, updated_at: nowIso() });
  res.json({ success: true, id, effectivenessScore: safe, updated_at: nowIso() });
});

// AI agent settings/list CRUD compatibility
app.get(['/api/ai-knowledge/settings', '/api/admin/ai/settings'], async (_req, res) => {
  const state = await loadAiAgentsState();
  res.json({ success: true, settings: state.settings, data: state.settings });
});

app.put(['/api/ai-knowledge/settings', '/api/admin/ai/settings'], async (req, res) => {
  const state = await loadAiAgentsState();
  const next = { ...state, settings: { ...state.settings, ...(req.body || {}), updated_at: nowIso() } };
  await saveJsonSetting('ai:agents:state', next);
  res.json({ success: true, settings: next.settings, data: next.settings });
});

app.get(['/api/ai-knowledge/agents', '/api/admin/ai/agents', '/api/ai-agents'], async (_req, res) => {
  const state = await loadAiAgentsState();
  res.json({ success: true, agents: state.agents, data: state.agents, count: state.agents.length });
});

app.post(['/api/ai-knowledge/agents', '/api/admin/ai/agents', '/api/ai-agents'], async (req, res) => {
  const state = await loadAiAgentsState();
  const agent = normalizeAgentInput(req.body || {});
  agent.id = makeId('agent');
  agent.created_at = nowIso();
  const next = { ...state, agents: [agent, ...state.agents] };
  await saveJsonSetting('ai:agents:state', next);
  res.status(201).json({ success: true, agent, data: agent });
});

app.get(['/api/ai-knowledge/agents/:id', '/api/admin/ai/agents/:id', '/api/ai-agents/:id'], async (req, res) => {
  const state = await loadAiAgentsState();
  const agent = state.agents.find((x) => x.id === req.params.id);
  if (!agent) return res.status(404).json({ success: false, error: 'Agent not found' });
  res.json({ success: true, agent, data: agent });
});

app.put(['/api/ai-knowledge/agents/:id', '/api/admin/ai/agents/:id', '/api/ai-agents/:id'], async (req, res) => {
  const state = await loadAiAgentsState();
  const idx = state.agents.findIndex((x) => x.id === req.params.id);
  if (idx < 0) return res.status(404).json({ success: false, error: 'Agent not found' });
  const updated = normalizeAgentInput(req.body || {}, state.agents[idx]);
  updated.id = state.agents[idx].id;
  updated.created_at = state.agents[idx].created_at;
  const nextAgents = state.agents.slice();
  nextAgents[idx] = updated;
  await saveJsonSetting('ai:agents:state', { ...state, agents: nextAgents });
  res.json({ success: true, agent: updated, data: updated });
});

app.delete(['/api/ai-knowledge/agents/:id', '/api/admin/ai/agents/:id', '/api/ai-agents/:id'], async (req, res) => {
  const state = await loadAiAgentsState();
  const before = state.agents.length;
  const nextAgents = state.agents.filter((x) => x.id !== req.params.id);
  if (nextAgents.length === before) return res.status(404).json({ success: false, error: 'Agent not found' });
  await saveJsonSetting('ai:agents:state', { ...state, agents: nextAgents });
  res.json({ success: true, deleted: true });
});

// Chat monitoring + chat demo endpoints (DB-backed via settings JSON)
app.get('/api/admin/chat/conversations', async (req, res) => {
  const [state, employees] = await Promise.all([
    loadChatState(),
    prisma.employee.findMany({ include: { profile: true } })
  ]);
  const profilesByEmployee = new Map(
    employees.map((e) => [
      e.id,
      {
        id: e.profileId,
        first_name: e.profile?.firstName || '',
        last_name: e.profile?.lastName || '',
        email: e.profile?.email || null,
        role: e.profile?.role || 'user',
        kyc_status: e.profile?.kycStatus || 'pending'
      }
    ])
  );

  let rows = state.conversations
    .filter((c) => !c.deleted_at)
    .map((c) => toConversationDto(c, state, profilesByEmployee))
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

  const search = (req.query.search || '').toString().trim().toLowerCase();
  const dateFrom = req.query.dateFrom ? new Date(String(req.query.dateFrom)).getTime() : null;
  const dateTo = req.query.dateTo ? new Date(String(req.query.dateTo)).getTime() + 24 * 60 * 60 * 1000 - 1 : null;
  const conversationType = (req.query.conversationType || '').toString().trim();

  if (search) {
    rows = rows.filter((r) => {
      const hay = [
        r.user_profile?.first_name,
        r.user_profile?.last_name,
        r.user_profile?.email,
        r.last_message?.content
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(search);
    });
  }
  if (dateFrom) rows = rows.filter((r) => new Date(r.created_at).getTime() >= dateFrom);
  if (dateTo) rows = rows.filter((r) => new Date(r.created_at).getTime() <= dateTo);
  if (conversationType) rows = rows.filter((r) => r.conversation_type === conversationType);

  const { data, pagination } = paginate(rows, req.query.page, req.query.limit);
  res.json({ success: true, conversations: data, pagination });
});

app.get('/api/admin/chat/conversations/:id/messages', async (req, res) => {
  const state = await loadChatState();
  const conv = state.conversations.find((c) => c.id === req.params.id && !c.deleted_at);
  if (!conv) return res.status(404).json({ success: false, error: 'Conversation not found' });

  let rows = state.messages
    .filter((m) => m.conversation_id === conv.id && !m.deleted_at)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((m) => ({ ...m, attachments: [], chat_attachments: [] }));

  const { data, pagination } = paginate(rows, req.query.page, req.query.limit);
  res.json({ success: true, messages: data, pagination });
});

app.get('/api/admin/chat/analytics', async (req, res) => {
  const state = await loadChatState();
  const since = Date.now() - parseTimeframeMs(req.query.timeframe);
  const conversations = state.conversations.filter((c) => !c.deleted_at && new Date(c.created_at).getTime() >= since);
  const messages = state.messages.filter((m) => !m.deleted_at && new Date(m.created_at).getTime() >= since);
  const aiMsgs = messages.filter((m) => m.sender_type === 'ai').length;
  const userMsgs = messages.filter((m) => m.sender_type === 'user').length;
  const avgResponse = aiMsgs > 0 ? Math.round((messages.length / aiMsgs) * 320) : 0;

  res.json({
    success: true,
    analytics: {
      conversations: { total: conversations.length },
      messages: { total: messages.length, ai: aiMsgs, user: userMsgs },
      performance: { average_response_time: avgResponse }
    }
  });
});

app.post('/api/admin/chat/conversations/:id/intervene', async (req, res) => {
  const content = (req.body?.content || '').toString().trim();
  if (!content) return res.status(400).json({ success: false, error: 'content required' });

  const state = await loadChatState();
  const idx = state.conversations.findIndex((c) => c.id === req.params.id && !c.deleted_at);
  if (idx < 0) return res.status(404).json({ success: false, error: 'Conversation not found' });

  const now = nowIso();
  const msg = {
    id: makeId('msg'),
    conversation_id: req.params.id,
    sender_type: 'admin',
    sender_id: req.body?.admin_id || null,
    content,
    message_type: 'text',
    metadata: { admin_intervention: true },
    deleted_at: null,
    edited_at: null,
    created_at: now,
    updated_at: now
  };
  const next = { ...state, messages: [...state.messages, msg] };
  next.conversations[idx] = { ...next.conversations[idx], updated_at: now };
  await saveChatState(next);
  res.status(201).json({ success: true, message: msg });
});

app.put('/api/admin/chat/messages/:id', async (req, res) => {
  const content = (req.body?.content || '').toString().trim();
  if (!content) return res.status(400).json({ success: false, error: 'content required' });

  const state = await loadChatState();
  const idx = state.messages.findIndex((m) => m.id === req.params.id && !m.deleted_at);
  if (idx < 0) return res.status(404).json({ success: false, error: 'Message not found' });

  const edited = { ...state.messages[idx], content, edited_at: nowIso(), updated_at: nowIso() };
  const next = { ...state, messages: state.messages.slice() };
  next.messages[idx] = edited;
  await saveChatState(next);
  res.json({ success: true, message: edited });
});

app.delete('/api/admin/chat/messages/:id', async (req, res) => {
  const permanent = !!req.body?.permanent;
  const state = await loadChatState();
  const idx = state.messages.findIndex((m) => m.id === req.params.id);
  if (idx < 0) return res.status(404).json({ success: false, error: 'Message not found' });

  const next = { ...state, messages: state.messages.slice() };
  if (permanent) next.messages.splice(idx, 1);
  else next.messages[idx] = { ...next.messages[idx], deleted_at: nowIso(), updated_at: nowIso() };
  await saveChatState(next);
  res.json({ success: true });
});

app.delete('/api/admin/chat/conversations/:id', async (req, res) => {
  const permanent = !!req.body?.permanent;
  const state = await loadChatState();
  const idx = state.conversations.findIndex((c) => c.id === req.params.id);
  if (idx < 0) return res.status(404).json({ success: false, error: 'Conversation not found' });

  let next = { ...state, conversations: state.conversations.slice(), messages: state.messages.slice() };
  if (permanent) {
    next.conversations.splice(idx, 1);
    next.messages = next.messages.filter((m) => m.conversation_id !== req.params.id);
  } else {
    next.conversations[idx] = { ...next.conversations[idx], archived_at: nowIso(), deleted_at: nowIso(), updated_at: nowIso() };
  }

  await saveChatState(next);
  res.json({ success: true });
});

// User chat endpoints for demo compatibility
app.post('/api/chat/conversations', async (req, res) => {
  try {
    const state = await loadChatState();

    const title = (req.body?.title || 'Projektleitung Chat').toString().trim();
    const conversationType = (req.body?.conversationType || req.body?.conversation_type || 'general').toString();
    const taskAssignmentId = (req.body?.taskAssignmentId || req.body?.task_assignment_id || '').toString().trim() || null;
    const userId = (req.body?.user_id || req.body?.userId || '').toString().trim() || null;

    const conversations = Array.isArray(state?.conversations) ? state.conversations : [];

    let existing = null;
    if (taskAssignmentId) {
      existing = conversations.find(
        (c) => !c.deleted_at && c.task_assignment_id === taskAssignmentId && (userId ? c.created_by === userId : true)
      );
    } else {
      // Compatibility: widget may repeatedly call createConversation without taskAssignmentId.
      // Reuse latest open conversation for the same user + type instead of creating duplicates.
      const candidates = conversations
        .filter((c) => !c.deleted_at && c.conversation_type === conversationType && (userId ? c.created_by === userId : true))
        .sort((a, b) => new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime());
      existing = candidates[0] || null;
    }

    if (existing) {
      return res.json({ success: true, conversation: existing, isExisting: true });
    }

    const now = nowIso();
    const created = {
      id: makeId('conv'),
      created_by: userId,
      conversation_type: conversationType,
      task_assignment_id: taskAssignmentId,
      title,
      archived_at: null,
      deleted_at: null,
      created_at: now,
      updated_at: now
    };

    const nextState = {
      ...(state && typeof state === 'object' ? state : {}),
      conversations: [created, ...conversations],
      messages: Array.isArray(state?.messages) ? state.messages : []
    };

    await saveChatState(nextState);

    return res.json({ success: true, conversation: created, isExisting: false });
  } catch (err) {
    console.error('[chat] create conversation failed:', err?.message || err);
    const now = nowIso();
    const title = (req.body?.title || 'Projektleitung Chat').toString().trim();
    const fallback = {
      id: makeId('conv'),
      created_by: (req.body?.user_id || req.body?.userId || '').toString().trim() || null,
      conversation_type: (req.body?.conversationType || req.body?.conversation_type || 'general').toString(),
      task_assignment_id: (req.body?.taskAssignmentId || req.body?.task_assignment_id || '').toString().trim() || null,
      title,
      archived_at: null,
      deleted_at: null,
      created_at: now,
      updated_at: now
    };
    return res.status(200).json({ success: true, conversation: fallback, isExisting: false, degraded: true });
  }
});

app.get('/api/chat/conversations', async (req, res) => {
  const state = await loadChatState();
  const userId = (req.query.user_id || req.query.userId || '').toString().trim();
  let rows = state.conversations.filter((c) => !c.deleted_at);
  if (userId) rows = rows.filter((c) => c.created_by === userId);
  rows = rows.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  const { data, pagination } = paginate(rows, req.query.page, req.query.limit || 50);
  res.json({ success: true, conversations: data, pagination });
});

app.get('/api/chat/conversations/:id/messages', async (req, res) => {
  try {
    const state = await loadChatState();
    const messages = Array.isArray(state?.messages) ? state.messages : [];
    const rows = messages
      .filter((m) => m.conversation_id === req.params.id && !m.deleted_at)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    const { data, pagination } = paginate(rows, req.query.page, req.query.limit || 200);
    res.json({ success: true, messages: data, pagination });
  } catch (err) {
    console.error('[chat] load messages failed:', err?.message || err);
    res.json({ success: true, messages: [], pagination: { page: 1, limit: 200, total: 0, totalPages: 0 } });
  }
});

app.post(['/api/chat', '/api/chat/messages', '/api/chat/conversations/:id/messages'], async (req, res) => {
  const content = (req.body?.content || req.body?.message || '').toString().trim();
  if (!content) return res.status(400).json({ success: false, error: 'content required' });

  const state = await loadChatState();
  const userId = (req.body?.user_id || req.body?.userId || '').toString().trim() || null;
  let conversationId = req.params.id || req.body?.conversation_id || req.body?.conversationId;

  if (!conversationId) {
    const created = {
      id: makeId('conv'),
      created_by: userId,
      conversation_type: req.body?.conversation_type || 'general',
      title: req.body?.title || null,
      archived_at: null,
      deleted_at: null,
      created_at: nowIso(),
      updated_at: nowIso()
    };
    state.conversations.unshift(created);
    conversationId = created.id;
  }

  const convIdx = state.conversations.findIndex((c) => c.id === conversationId && !c.deleted_at);
  if (convIdx < 0) return res.status(404).json({ success: false, error: 'Conversation not found' });

  const now = nowIso();
  const userMsg = {
    id: makeId('msg'),
    conversation_id: conversationId,
    sender_type: 'user',
    sender_id: userId,
    content,
    message_type: 'text',
    metadata: {},
    deleted_at: null,
    edited_at: null,
    created_at: now,
    updated_at: now
  };

  const prior = state.messages
    .filter((m) => m.conversation_id === conversationId && !m.deleted_at)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .slice(-8)
    .map((m) => ({
      role: m.sender_type === 'ai' ? 'assistant' : 'user',
      content: String(m.content || '')
    }))
    .filter((m) => m.content);

  let aiContent = null;
  let aiMeta = { auto_reply: true, provider: 'fallback' };
  try {
    const kbArticles = await loadKnowledgeArticles();
    const snippets = selectKnowledgeSnippets(content, kbArticles, 3);
    const llm = await generateOpenAIReply({ content, history: prior, snippets });
    if (llm) {
      aiContent = llm;
      aiMeta = {
        auto_reply: true,
        provider: 'openai',
        model: OPENAI_MODEL,
        knowledge_titles: snippets.map((s) => s.title)
      };
    }
  } catch (err) {
    console.error('[chat] openai failed, falling back:', err?.message || err);
  }

  const aiMsg = {
    id: makeId('msg'),
    conversation_id: conversationId,
    sender_type: 'ai',
    sender_id: null,
    content: aiContent || defaultChatReply(content),
    message_type: 'text',
    metadata: aiMeta,
    deleted_at: null,
    edited_at: null,
    created_at: new Date(Date.now() + 250).toISOString(),
    updated_at: new Date(Date.now() + 250).toISOString()
  };

  const next = {
    ...state,
    messages: [...state.messages, userMsg, aiMsg],
    conversations: state.conversations.slice()
  };
  next.conversations[convIdx] = { ...next.conversations[convIdx], updated_at: aiMsg.created_at };
  await saveChatState(next);

  res.status(201).json({
    success: true,
    conversation_id: conversationId,
    // compatibility shapes used across different frontend bundles
    message: userMsg,
    reply: aiMsg,
    userMessage: userMsg,
    aiMessage: aiMsg
  });
});

const JOB_LISTINGS_KEY = 'job_listings_v1';
const JOB_APPLICATIONS_KEY = 'job_applications_v1';

const toList = (v) => {
  if (Array.isArray(v)) return v.map((x) => String(x || '').trim()).filter(Boolean);
  if (typeof v === 'string') return v.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  return [];
};

const normalizeJobListing = (row = {}) => {
  const title = String(row.title || '').trim();
  const slugBase = String(row.slug || title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || `job-${Math.random().toString(36).slice(2, 8)}`;

  const brief = String(row.brief_description || row.briefDescription || row.short_description || row.summary || '').trim();
  const description = String(row.description || row.summary || row.short_description || row.brief_description || '').trim();

  const requirements = toList(row.requirements || row.profile);
  const tasks = toList(row.tasks || row.responsibilities);
  const benefits = toList(row.benefits || row.offer);

  const employmentTypeValue = row.type_of_employment || row.employment_type || row.employmentType || '';
  const workModelValue = row.working_model || row.workingModel || row.work_model || row.workModel || '';
  const salaryDisplayValue = row.ad_text || row.adText || row.salary_display || row.salaryDisplay || row.salary_text || '';

  const facts = row.facts && typeof row.facts === 'object' ? { ...row.facts } : {};
  if (!facts.employment) facts.employment = employmentTypeValue || null;
  if (!facts.salary) facts.salary = salaryDisplayValue || null;
  if (!facts.location) facts.location = row.location || null;

  return {
    id: row.id || `job_${Math.random().toString(36).slice(2, 10)}`,
    slug: slugBase,
    title,

    // legacy fields used by headline pages
    summary: brief || description,
    tasks,
    profile: requirements,
    offer: benefits,
    facts,

    // admin-form compatible aliases
    brief_description: brief,
    briefDescription: brief,
    short_description: row.short_description || brief,
    shortDescription: row.shortDescription || row.short_description || brief,
    description,
    type_of_employment: employmentTypeValue,
    employment_type: employmentTypeValue,
    employmentType: employmentTypeValue,
    working_model: workModelValue,
    workingModel: workModelValue,
    work_model: workModelValue,
    workModel: workModelValue,
    location: row.location || '',
    min_salary: row.min_salary ?? row.minSalary ?? 0,
    minSalary: row.minSalary ?? row.min_salary ?? 0,
    max_salary: row.max_salary ?? row.maxSalary ?? 0,
    maxSalary: row.maxSalary ?? row.max_salary ?? 0,
    salary_type: row.salary_type || row.salaryType || 'per month',
    salaryType: row.salaryType || row.salary_type || 'per month',
    ad_text: salaryDisplayValue,
    adText: salaryDisplayValue,
    salary_display: row.salary_display || salaryDisplayValue,
    salaryDisplay: row.salaryDisplay || row.salary_display || salaryDisplayValue,
    requirements,
    responsibilities: tasks,
    benefits,
    internal_tags: toList(row.internal_tags || row.tags),
    internalTags: toList(row.internalTags || row.internal_tags || row.tags),

    status: String(row.status || 'active').toLowerCase(),
    created_at: row.created_at || nowIso(),
    updated_at: nowIso()
  };
};

async function getJobListings() {
  const existing = await prisma.setting.findUnique({ where: { key: JOB_LISTINGS_KEY } });
  const value = existing?.value;
  const rows = Array.isArray(value?.jobs) ? value.jobs : Array.isArray(value) ? value : [];
  return rows.map(normalizeJobListing);
}

async function saveJobListings(jobs) {
  const normalized = jobs.map(normalizeJobListing);
  await putSettingJson(JOB_LISTINGS_KEY, { jobs: normalized, updated_at: nowIso() });
  return normalized;
}

const normalizeJobApplication = (row = {}) => {
  const firstName = String(row.first_name || row.firstName || '').trim();
  const lastName = String(row.last_name || row.lastName || '').trim();
  const fullName = String(row.full_name || row.fullName || [firstName, lastName].filter(Boolean).join(' ')).trim();
  const email = String(row.email || '').trim().toLowerCase();
  const birthDate = String(row.birth_date || row.birthDate || row.date_of_birth || row.dob || '').trim();
  const street = String(row.street || row.address || '').trim();
  const postalCode = String(row.postal_code || row.zip || '').trim();
  const city = String(row.city || '').trim();
  const nationality = String(row.nationality || row.country || '').trim();
  const jobTitle = String(row.job_title || row.position_applied || row.application_type || '').trim();

  return {
    id: row.id || `ja_${Math.random().toString(36).slice(2, 10)}`,
    first_name: firstName || fullName || 'Bewerber',
    last_name: lastName || '-',
    full_name: fullName || `${firstName} ${lastName}`.trim(),
    name: fullName || `${firstName} ${lastName}`.trim(),
    email,
    phone: String(row.phone || row.mobile || row.mobile_number || '').trim(),
    mobile: String(row.mobile || row.phone || row.mobile_number || '').trim(),
    mobile_number: String(row.mobile_number || row.mobile || row.phone || '').trim(),
    birth_date: birthDate,
    date_of_birth: birthDate,
    dob: birthDate,
    address: String(row.address || row.full_address || street).trim(),
    full_address: String(row.full_address || [street, [postalCode, city].filter(Boolean).join(' ')].filter(Boolean).join(', ')).trim(),
    street,
    zip: postalCode,
    postal_code: postalCode,
    city,
    country: String(row.country || nationality).trim(),
    nationality,
    source_page: String(row.source_page || row.sourcePage || '').trim(),
    job_slug: String(row.job_slug || row.jobSlug || '').trim(),
    job_title: jobTitle,
    position_applied: String(row.position_applied || jobTitle).trim(),
    application_type: String(row.application_type || jobTitle || 'Initiativbewerbung').trim(),
    status: String(row.status || 'pending').toLowerCase(),
    created_at: row.created_at || nowIso(),
    updated_at: nowIso(),
  };
};

async function getJobApplications() {
  const existing = await prisma.setting.findUnique({ where: { key: JOB_APPLICATIONS_KEY } });
  const value = existing?.value;
  const rows = Array.isArray(value?.applications) ? value.applications : Array.isArray(value) ? value : [];
  return rows.map(normalizeJobApplication);
}

async function saveJobApplications(applications) {
  const normalized = applications.map(normalizeJobApplication);
  await putSettingJson(JOB_APPLICATIONS_KEY, { applications: normalized, updated_at: nowIso() });
  return normalized;
}
const isKycApprovedStatus = (v) => ['approved', 'verified', 'genehmigt'].includes(String(v || '').toLowerCase());

async function ensureDefaultStarterTemplates() {
  const templates = await getTaskTemplates();
  const starter = templates.filter((t) => Boolean(t.is_starter_job));
  if (starter.length >= 2) return templates;

  const defaults = [
    {
      title: 'Starter: CRM Datenpflege & Lead-Update',
      description: 'Pflege 20 CRM-DatensÃ¤tze, setze Status korrekt und dokumentiere Follow-ups sauber.',
      type: 'standard',
      priority: 'medium',
      estimated_hours: 2,
      is_starter_job: true,
      steps: ['DatensÃ¤tze prÃ¼fen', 'Status aktualisieren', 'Follow-up Notizen dokumentieren'],
      created_by: 'system',
    },
    {
      title: 'Starter: QA Telefonleitfaden',
      description: 'PrÃ¼fe den Leitfaden auf BegrÃ¼ÃŸung, Bedarfsermittlung, Einwandbehandlung und Abschluss.',
      type: 'standard',
      priority: 'medium',
      estimated_hours: 2,
      is_starter_job: true,
      steps: ['Leitfaden prÃ¼fen', 'Abweichungen notieren', 'VerbesserungsvorschlÃ¤ge eintragen'],
      created_by: 'system',
    }
  ];

  const next = [...templates, ...defaults.map(normalizeTaskTemplate)];
  await saveTaskTemplates(next);
  return next;
}

async function assignStarterTasksToProfile(profileId, createdBy = 'kyc_approved_auto') {
  const assigneeId = String(profileId || '').trim();
  if (!assigneeId) return { assigned_count: 0, assignment_ids: [] };

  const [allTemplates, currentAssignments] = await Promise.all([ensureDefaultStarterTemplates(), getTaskAssignments()]);
  const starterTemplates = allTemplates
    .filter((t) => Boolean(t.is_starter_job))
    .sort((a, b) => {
      const ao = Number.isFinite(Number(a.order_number)) ? Number(a.order_number) : Number.MAX_SAFE_INTEGER;
      const bo = Number.isFinite(Number(b.order_number)) ? Number(b.order_number) : Number.MAX_SAFE_INTEGER;
      if (ao !== bo) return ao - bo;
      return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime();
    })
    .slice(0, 2);
  if (starterTemplates.length === 0) return { assigned_count: 0, assignment_ids: [] };

  const dueDate = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString();
  const nextAssignments = [...currentAssignments];
  const created = [];

  for (const tpl of starterTemplates) {
    const exists = nextAssignments.some((a) => a.task_template_id === tpl.id && String(a.assignee_id || '') === assigneeId);
    if (exists) continue;

    const row = normalizeTaskAssignment({
      task_template_id: tpl.id,
      assignee_id: assigneeId,
      status: 'pending',
      due_date: dueDate,
      created_by: createdBy,
    });

    nextAssignments.unshift(row);
    created.push(row.id);
  }

  if (created.length > 0) {
    await saveTaskAssignments(nextAssignments);
  }

  return { assigned_count: created.length, assignment_ids: created, due_date: dueDate };
}

app.get('/api/public/job-listings', async (_req, res) => {
  try {
    const jobs = await getJobListings();
    const active = jobs.filter((j) => ['active', 'published', 'live'].includes(String(j.status || '').toLowerCase()));
    res.json({ success: true, count: active.length, data: active });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch public job listings', error: String(error) });
  }
});

app.get('/api/admin/job-listings', async (_req, res) => {
  try {
    const jobs = await getJobListings();
    res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin job listings', error: String(error) });
  }
});

app.post('/api/admin/job-listings', async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : [req.body || {}];
    const current = await getJobListings();
    const next = [...current, ...payload.map(normalizeJobListing)];
    const saved = await saveJobListings(next);
    res.status(201).json({ success: true, data: saved.slice(-payload.length) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create job listing', error: String(error) });
  }
});

app.patch('/api/admin/job-listings/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};
    const current = await getJobListings();
    const idx = current.findIndex((j) => j.id === id);
    if (idx < 0) return res.status(404).json({ success: false, message: 'Job listing not found' });
    const merged = normalizeJobListing({ ...current[idx], ...patch, id: current[idx].id, created_at: current[idx].created_at });
    current[idx] = merged;
    await saveJobListings(current);
    res.json({ success: true, data: merged });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update job listing', error: String(error) });
  }
});

app.delete('/api/admin/job-listings/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const current = await getJobListings();
    const next = current.filter((j) => j.id !== id);
    await saveJobListings(next);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete job listing', error: String(error) });
  }
});

app.get('/api/admin/job-applications', async (_req, res) => {
  try {
    const [rows, jobs] = await Promise.all([getJobApplications(), getJobListings()]);
    const bySlug = new Map(jobs.map((j) => [String(j.slug || ''), j]));

    const enriched = rows.map((r) => {
      const job = bySlug.get(String(r.job_slug || '').trim());
      const appType = String(r.application_type || '').trim();
      const isGeneric = !appType || /^initiativbewerbung$/i.test(appType);

      const patchedType = isGeneric && job?.title ? job.title : (r.application_type || r.position_applied || r.job_title || 'Initiativbewerbung');

      return {
        ...r,
        job_title: r.job_title || job?.title || '',
        position_applied: r.position_applied || job?.title || '',
        application_type: patchedType,
        job_listing: job
          ? {
              id: job.id,
              slug: job.slug,
              title: job.title,
              employment_type: job.employment_type || job.type_of_employment || '',
              work_model: job.work_model || job.working_model || '',
              location: job.location || '',
            }
          : null,
      };
    });

    const sorted = enriched.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    res.json({ success: true, count: sorted.length, data: sorted });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch job applications', error: String(error) });
  }
});

app.post('/api/public/job-applications', async (req, res) => {
  try {
    const payload = req.body || {};

    // Backfill job title from slug when available so admin shows exact applied position.
    if ((!payload.job_title && !payload.position_applied && !payload.application_type) && payload.job_slug) {
      const jobs = await getJobListings();
      const match = jobs.find((j) => j.slug === String(payload.job_slug));
      if (match?.title) {
        payload.job_title = match.title;
        payload.position_applied = match.title;
        payload.application_type = match.title;
      }
    }

    const normalized = normalizeJobApplication(payload);
    if (!normalized.email || !normalized.first_name || !normalized.birth_date) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const current = await getJobApplications();
    const next = [normalized, ...current];
    await saveJobApplications(next);
    res.status(201).json({ success: true, data: normalized });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create job application', error: String(error) });
  }
});

app.patch('/api/admin/job-applications/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};
    const current = await getJobApplications();
    const idx = current.findIndex((x) => String(x.id) === String(id));
    if (idx < 0) return res.status(404).json({ success: false, message: 'Job application not found' });

    const merged = normalizeJobApplication({ ...current[idx], ...patch, id: current[idx].id, created_at: current[idx].created_at });

    const normalizedStatus = String(merged.status || '').toLowerCase();
    const shouldCreateEmployee = ['approved', 'accepted', 'hired', 'eingestellt', 'genehmigt'].includes(normalizedStatus);
    let employeeCreated = null;

    if (shouldCreateEmployee) {
      const appEmail = String(merged.email || '').trim().toLowerCase();
      if (appEmail) {
        const firstName = String(merged.first_name || '').trim() || 'Mitarbeiter';
        const lastName = String(merged.last_name || '').trim() || '';
        const fullName = `${firstName} ${lastName}`.trim();

        let profile = await prisma.profile.findFirst({ where: { email: appEmail } });

        if (!profile) {
          profile = await prisma.profile.create({
            data: {
              email: appEmail,
              role: 'caller',
              firstName: firstName || null,
              lastName: lastName || null,
              fullName,
              phone: String(merged.phone || '').trim() || null,
              dateOfBirth: merged.birth_date ? new Date(merged.birth_date) : null,
              street: String(merged.address || '').trim() || null,
              postalCode: String(merged.zip || merged.postal_code || '').trim() || null,
              city: String(merged.city || '').trim() || null,
              nationality: String(merged.country || merged.nationality || '').trim() || null,
              kycStatus: 'pending',
              adminNotes: `Erstellt aus Bewerbung ${merged.id}`,
            }
          });
        } else {
          profile = await prisma.profile.update({
            where: { id: profile.id },
            data: {
              role: 'caller',
              firstName: firstName || null,
              lastName: lastName || null,
              fullName: fullName || null,
              phone: String(merged.phone || '').trim() || profile.phone || null,
              dateOfBirth: merged.birth_date ? new Date(merged.birth_date) : profile.dateOfBirth,
              street: String(merged.address || '').trim() || profile.street || null,
              postalCode: String(merged.zip || merged.postal_code || '').trim() || profile.postalCode || null,
              city: String(merged.city || '').trim() || profile.city || null,
              nationality: String(merged.country || merged.nationality || '').trim() || profile.nationality || null,
            }
          });
        }

        let employee = await prisma.employee.findFirst({ where: { profileId: profile.id }, include: { profile: true } });
        if (!employee) {
          employee = await prisma.employee.create({
            data: {
              profileId: profile.id,
              status: 'active',
              department: String(merged.job_title || merged.application_type || '').trim() || null,
              hiredAt: new Date(),
            },
            include: { profile: true }
          });
        }

        const { caseId, webidUrl } = await ensureKycInviteForProfile(profile, 'email');

        const registrationUrl = (() => {
          const u = new URL(`${HEADLINE_PORTAL_BASE}/register`);
          u.searchParams.set('first_name', firstName);
          u.searchParams.set('last_name', lastName);
          u.searchParams.set('email', appEmail);
          u.searchParams.set('phone', String(merged.phone || '').trim());
          u.searchParams.set('birth_date', String(merged.birth_date || merged.dob || '').trim());
          u.searchParams.set('address_line', String(merged.address || '').trim());
          u.searchParams.set('zip', String(merged.zip || merged.postal_code || '').trim());
          u.searchParams.set('city', String(merged.city || '').trim());
          u.searchParams.set('country', String(merged.country || merged.nationality || '').trim());
          return u.toString();
        })();

        await safeMessageAck('email', 'job-application-approved-registration-link', {
          to: appEmail,
          first_name: firstName,
          last_name: lastName,
          full_name: fullName,
          registration_url: registrationUrl,
          subject: 'Willkommen im Team – Einrichtung Ihres Mitarbeiterzugangs',
          application_id: merged.id,
          status: merged.status,
        });

        employeeCreated = {
          id: employee.id,
          profile_id: employee.profileId,
          email: employee.profile?.email || appEmail,
          full_name: employee.profile?.fullName || fullName,
          kyc_case_id: caseId,
          kyc_webid_url: webidUrl,
        };
      }
    }

    current[idx] = merged;
    await saveJobApplications(current);
    res.json({ success: true, data: merged, employee_created: employeeCreated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update job application', error: String(error) });
  }
});

app.delete('/api/admin/job-applications/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const current = await getJobApplications();
    const next = current.filter((x) => x.id !== id);
    await saveJobApplications(next);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete job application', error: String(error) });
  }
});

// ---- Task template + assignment compatibility (for admin templates flow) ----
const TASK_TEMPLATES_KEY = 'task_templates_v1';
const TASK_ASSIGNMENTS_KEY = 'task_assignments_v1';
const TASK_RATINGS_KEY = 'task_ratings_v1';
const PAYOUT_REQUESTS_KEY = 'payout_requests_v1';

const normalizeTaskTemplate = (row = {}) => ({
  id: row.id || `tt_${Math.random().toString(36).slice(2, 10)}`,
  title: String(row.title || '').trim(),
  description: String(row.description || '').trim(),
  type: String(row.type || 'standard').trim(),
  priority: String(row.priority || 'medium').toLowerCase(),
  estimated_hours: Number(row.estimated_hours ?? row.estimatedHours ?? 1) || 1,
  is_starter_job: Boolean(row.is_starter_job),
  order_number: row.is_starter_job ? null : (row.order_number ?? null),
  required_attachments: Array.isArray(row.required_attachments) ? row.required_attachments : [],
  steps: Array.isArray(row.steps) ? row.steps : [],
  payment_amount: row.payment_amount ?? null,
  created_by: row.created_by || null,
  created_at: row.created_at || nowIso(),
  updated_at: nowIso()
});

const normalizeTaskAssignment = (row = {}) => ({
  id: row.id || `asg_${Math.random().toString(36).slice(2, 10)}`,
  task_id: row.task_id || `task_${Math.random().toString(36).slice(2, 10)}`,
  task_template_id: String(row.task_template_id || '').trim(),
  assignee_id: String(row.assignee_id || '').trim(),
  status: String(row.status || 'pending').toLowerCase(),
  due_date: row.due_date || null,
  submitted_at: row.submitted_at || null,
  created_by: row.created_by || null,
  current_step: Number(row.current_step ?? 0),
  created_at: row.created_at || nowIso(),
  updated_at: nowIso()
});

async function getTaskTemplates() {
  const existing = await prisma.setting.findUnique({ where: { key: TASK_TEMPLATES_KEY } });
  const value = existing?.value;
  const rows = Array.isArray(value?.templates) ? value.templates : Array.isArray(value) ? value : [];
  return rows.map(normalizeTaskTemplate);
}

async function saveTaskTemplates(templates) {
  const normalized = templates.map(normalizeTaskTemplate);
  await putSettingJson(TASK_TEMPLATES_KEY, { templates: normalized, updated_at: nowIso() });
  return normalized;
}

async function getTaskAssignments() {
  const existing = await prisma.setting.findUnique({ where: { key: TASK_ASSIGNMENTS_KEY } });
  const value = existing?.value;
  const rows = Array.isArray(value?.assignments) ? value.assignments : Array.isArray(value) ? value : [];
  return rows.map(normalizeTaskAssignment);
}

async function saveTaskAssignments(assignments) {
  const normalized = assignments.map(normalizeTaskAssignment);
  await putSettingJson(TASK_ASSIGNMENTS_KEY, { assignments: normalized, updated_at: nowIso() });
  return normalized;
}

const normalizeTaskRating = (row = {}) => ({
  id: row.id || `tr_${Math.random().toString(36).slice(2, 10)}`,
  task_assignment_id: String(row.task_assignment_id || '').trim(),
  rating_type: String(row.rating_type || 'initial').trim(),
  status: String(row.status || 'pending').toLowerCase(),
  rating_data: row.rating_data && typeof row.rating_data === 'object' ? row.rating_data : {},
  submitted_at: row.submitted_at || nowIso(),
  reviewed_at: row.reviewed_at || null,
  reviewed_by: row.reviewed_by || null,
  rejection_reason: row.rejection_reason || null,
  admin_notes: row.admin_notes || null,
  created_at: row.created_at || nowIso(),
  updated_at: nowIso()
});

async function getTaskRatings() {
  const existing = await prisma.setting.findUnique({ where: { key: TASK_RATINGS_KEY } });
  const value = existing?.value;
  const rows = Array.isArray(value?.ratings) ? value.ratings : Array.isArray(value) ? value : [];
  return rows.map(normalizeTaskRating);
}

async function saveTaskRatings(ratings) {
  const normalized = ratings.map(normalizeTaskRating);
  await putSettingJson(TASK_RATINGS_KEY, { ratings: normalized, updated_at: nowIso() });
  return normalized;
}

const normalizePayoutRequest = (row = {}) => ({
  id: row.id || `po_${Math.random().toString(36).slice(2, 10)}`,
  email: String(row.email || '').trim().toLowerCase(),
  account_holder_name: String(row.account_holder_name || '').trim(),
  iban: String(row.iban || '').trim().toUpperCase(),
  bic: String(row.bic || '').trim().toUpperCase(),
  amount: Number(row.amount || 0) || 0,
  status: String(row.status || 'requested').toLowerCase(),
  created_at: row.created_at || nowIso(),
  updated_at: nowIso()
});

async function getPayoutRequests() {
  const existing = await prisma.setting.findUnique({ where: { key: PAYOUT_REQUESTS_KEY } });
  const value = existing?.value;
  const rows = Array.isArray(value?.requests) ? value.requests : Array.isArray(value) ? value : [];
  return rows.map(normalizePayoutRequest);
}

async function savePayoutRequests(requests) {
  const normalized = requests.map(normalizePayoutRequest);
  await putSettingJson(PAYOUT_REQUESTS_KEY, { requests: normalized, updated_at: nowIso() });
  return normalized;
}

app.get('/api/admin/task-templates', async (_req, res) => {
  try {
    const rows = await getTaskTemplates();
    res.json({ success: true, count: rows.length, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch task templates', error: String(error) });
  }
});

app.post('/api/admin/task-templates', async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : [req.body || {}];
    const current = await getTaskTemplates();
    const next = [...current, ...payload.map(normalizeTaskTemplate)];
    const saved = await saveTaskTemplates(next);
    res.status(201).json({ success: true, data: saved.slice(-payload.length) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create task template', error: String(error) });
  }
});

app.patch('/api/admin/task-templates/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const patch = req.body || {};
    const current = await getTaskTemplates();
    const idx = current.findIndex((t) => t.id === id);
    if (idx < 0) return res.status(404).json({ success: false, message: 'Task template not found' });
    const merged = normalizeTaskTemplate({ ...current[idx], ...patch, id: current[idx].id, created_at: current[idx].created_at });
    current[idx] = merged;
    await saveTaskTemplates(current);
    res.json({ success: true, data: merged });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update task template', error: String(error) });
  }
});

app.delete('/api/admin/task-templates/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const current = await getTaskTemplates();
    const next = current.filter((t) => t.id !== id);
    await saveTaskTemplates(next);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete task template', error: String(error) });
  }
});

app.post('/api/admin/task-assignments/from-template', async (req, res) => {
  try {
    const body = req.body || {};
    const templateId = String(body.task_template_id || body.p_template_id || body.template_id || '').trim();
    const assigneeId = String(body.assignee_id || body.p_assignee_id || body.user_id || '').trim();
    if (!templateId || !assigneeId) {
      return res.status(400).json({ success: false, message: 'task_template_id and assignee_id are required' });
    }

    const [templates, assignments] = await Promise.all([getTaskTemplates(), getTaskAssignments()]);
    const template = templates.find((t) => t.id === templateId);
    if (!template) return res.status(404).json({ success: false, message: 'Task template not found' });

    const duplicate = assignments.find((a) => {
      if (!(a.task_template_id === templateId && a.assignee_id === assigneeId)) return false;
      const s = String(a.status || '').toLowerCase();
      // Allow re-assignment after final states, block only active/in-flight tasks.
      return ['pending', 'open', 'accepted', 'in_review', 'submitted', 'assigned'].includes(s);
    });
    if (duplicate) {
      return res.json({ success: true, data: { task_id: duplicate.task_id, assignment_id: duplicate.id, message: 'Already assigned' } });
    }

    const created = normalizeTaskAssignment({
      task_template_id: templateId,
      assignee_id: assigneeId,
      due_date: body.due_date || body.p_due_date,
      created_by: body.created_by || body.p_created_by || null,
      status: 'pending'
    });

    await saveTaskAssignments([created, ...assignments]);
    res.status(201).json({
      success: true,
      data: {
        task_id: created.task_id,
        assignment_id: created.id,
        message: 'Task assignment created'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create task assignment', error: String(error) });
  }
});

const enrichTaskAssignments = async (assignments) => {
  const templates = await getTaskTemplates();
  const templateById = new Map(templates.map((t) => [t.id, t]));

  const assigneeIds = Array.from(new Set(assignments.map((a) => String(a.assignee_id || '').trim()).filter(Boolean)));
  const profiles = await prisma.profile.findMany({ where: { id: { in: assigneeIds } }, include: { employee: true } });
  const profileById = new Map(profiles.map((p) => [p.id, p]));
  const employeeById = new Map(profiles.map((p) => [p.employee?.id, p]).filter(([k]) => Boolean(k)));

  return assignments.map((a) => {
    const tpl = templateById.get(a.task_template_id) || null;
    const profile = profileById.get(a.assignee_id) || employeeById.get(a.assignee_id) || null;
    const profileShape = profile ? {
      id: profile.id,
      first_name: profile.firstName || '',
      last_name: profile.lastName || '',
      email: profile.email || ''
    } : null;

    return {
      ...a,
      task_template: tpl,
      task_templates: tpl,
      profiles: profileShape,
      profile: profileShape,
      template_title: tpl?.title || null,
      template_description: tpl?.description || null,
      template_steps: Array.isArray(tpl?.steps) ? tpl.steps : [],
      template_required_attachments: Array.isArray(tpl?.required_attachments) ? tpl.required_attachments : [],
      estimated_hours: tpl?.estimated_hours ?? null,
      payment_amount: tpl?.payment_amount ?? null
    };
  });
};

app.get('/api/admin/task-assignments', async (_req, res) => {
  try {
    const assignments = await getTaskAssignments();
    const enriched = await enrichTaskAssignments(assignments);
    res.json({ success: true, count: enriched.length, data: enriched });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch task assignments', error: String(error) });
  }
});

app.patch('/api/admin/task-assignments/:id', async (req, res) => {
  try {
    const id = String(req.params.id || '').trim();
    const patch = req.body || {};
    const current = await getTaskAssignments();
    const idx = current.findIndex((a) => a.id === id);
    if (idx < 0) return res.status(404).json({ success: false, message: 'Task assignment not found' });

    const currentRow = current[idx];
    let requestedStatus = String(patch.status || currentRow.status || '').toLowerCase();

    // Stage-1 approval should move task into ratings queue (in_review), not complete directly.
    if (['completed', 'approved', 'genehmigt'].includes(requestedStatus)) {
      const ratings = await getTaskRatings();
      const hasApprovedRating = ratings.some((r) => r.task_assignment_id === id && r.status === 'approved');
      if (!hasApprovedRating) {
        requestedStatus = 'in_review';
        const hasPending = ratings.some((r) => r.task_assignment_id === id && r.status === 'pending');
        if (!hasPending) {
          const created = normalizeTaskRating({
            task_assignment_id: id,
            rating_type: 'initial',
            status: 'pending',
            submitted_at: nowIso()
          });
          await saveTaskRatings([created, ...ratings]);
        }
      }
    }

    const merged = normalizeTaskAssignment({ ...currentRow, ...patch, status: requestedStatus, id: currentRow.id, created_at: currentRow.created_at });
    current[idx] = merged;
    await saveTaskAssignments(current);

    const enriched = await enrichTaskAssignments([merged]);
    res.json({ success: true, data: enriched[0] || merged });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update task assignment', error: String(error) });
  }
});

const enrichTaskRatings = async (ratings) => {
  const assignments = await getTaskAssignments();
  const byAssignmentId = new Map(assignments.map((a) => [a.id, a]));
  const relatedAssignments = ratings
    .map((r) => byAssignmentId.get(r.task_assignment_id))
    .filter(Boolean);
  const enrichedAssignments = await enrichTaskAssignments(relatedAssignments);
  const enrichedById = new Map(enrichedAssignments.map((a) => [a.id, a]));

  return ratings.map((r) => ({
    ...r,
    task_assignments: enrichedById.get(r.task_assignment_id) || null
  }));
};

app.get('/api/admin/task-ratings', async (_req, res) => {
  try {
    const ratings = await getTaskRatings();
    const enriched = await enrichTaskRatings(ratings);
    res.json({ success: true, count: enriched.length, data: enriched });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch task ratings', error: String(error) });
  }
});

app.post('/api/admin/task-ratings', async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : [req.body || {}];
    const currentRatings = await getTaskRatings();
    const created = payload.map(normalizeTaskRating);
    await saveTaskRatings([...created, ...currentRatings]);
    const enriched = await enrichTaskRatings(created);
    res.status(201).json({ success: true, data: enriched });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create task rating', error: String(error) });
  }
});

app.patch('/api/admin/task-ratings/:id', async (req, res) => {
  try {
    const id = String(req.params.id || '').trim();
    const patch = req.body || {};
    const ratings = await getTaskRatings();
    const idx = ratings.findIndex((r) => r.id === id);
    if (idx < 0) return res.status(404).json({ success: false, message: 'Task rating not found' });

    const currentRating = ratings[idx];
    const nextRating = normalizeTaskRating({ ...currentRating, ...patch, id: currentRating.id, created_at: currentRating.created_at });
    ratings[idx] = nextRating;
    await saveTaskRatings(ratings);

    // Final approval in Aufgaben-Bewertungen marks assignment completed.
    if (String(nextRating.status || '').toLowerCase() === 'approved') {
      const assignments = await getTaskAssignments();
      const aIdx = assignments.findIndex((a) => a.id === nextRating.task_assignment_id);
      if (aIdx >= 0) {
        assignments[aIdx] = normalizeTaskAssignment({ ...assignments[aIdx], status: 'completed', updated_at: nowIso() });
        await saveTaskAssignments(assignments);
      }
    }

    const enriched = await enrichTaskRatings([nextRating]);
    res.json({ success: true, data: enriched[0] || nextRating });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update task rating', error: String(error) });
  }
});

app.post('/api/public/payout-requests', async (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const account_holder_name = String(req.body?.account_holder_name || '').trim();
    const iban = String(req.body?.iban || '').trim().toUpperCase();
    const bic = String(req.body?.bic || '').trim().toUpperCase();
    const amount = Number(req.body?.amount || 0) || 0;

    if (!email || !account_holder_name || !iban || !bic) {
      return res.status(400).json({ success: false, message: 'email, account_holder_name, iban and bic are required' });
    }

    const current = await getPayoutRequests();
    const next = normalizePayoutRequest({ email, account_holder_name, iban, bic, amount, status: 'requested' });
    await savePayoutRequests([next, ...current.filter((x) => x.email !== email)]);

    return res.status(201).json({ success: true, data: next });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to save payout request', error: String(error) });
  }
});

app.get('/api/public/payout-requests/latest', async (req, res) => {
  try {
    const email = String(req.query?.email || '').trim().toLowerCase();
    if (!email) return res.status(400).json({ success: false, message: 'email is required' });

    const rows = await getPayoutRequests();
    const latest = rows.find((x) => x.email === email) || null;
    return res.json({ success: true, data: latest });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to fetch payout request', error: String(error) });
  }
});

app.get('/api/public/user-task-assignments', async (req, res) => {
  try {
    const email = String(req.query.email || '').trim().toLowerCase();
    const assigneeId = String(req.query.assignee_id || '').trim();

    if (!email && !assigneeId) {
      return res.status(400).json({ success: false, message: 'email or assignee_id is required' });
    }

    const assignments = await getTaskAssignments();

    const assigneeIds = new Set();
    if (assigneeId) assigneeIds.add(assigneeId);

    if (email) {
      const profile = await prisma.profile.findUnique({ where: { email }, include: { employee: true } });
      if (profile?.id) assigneeIds.add(profile.id);
      if (profile?.employee?.id) assigneeIds.add(profile.employee.id);
    }

    const ids = Array.from(assigneeIds);
    const filteredBase = assignments.filter((a) => ids.includes(String(a.assignee_id || '').trim()));
    const filtered = await enrichTaskAssignments(filteredBase);

    res.json({ success: true, count: filtered.length, data: filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user task assignments', error: String(error) });
  }
});

async function verifyTaskOwnershipByEmail(email, assigneeId) {
  if (!email) return true;
  const profile = await prisma.profile.findUnique({ where: { email }, include: { employee: true } });
  const ownerIds = new Set([profile?.id, profile?.employee?.id].filter(Boolean));
  return ownerIds.has(assigneeId);
}

app.post('/api/public/user-task-assignments/:id/accept', async (req, res) => {
  try {
    const assignmentId = String(req.params.id || '').trim();
    const email = String(req.body?.email || req.query?.email || '').trim().toLowerCase();
    if (!assignmentId) return res.status(400).json({ success: false, message: 'assignment id is required' });

    const [assignments, templates] = await Promise.all([getTaskAssignments(), getTaskTemplates()]);
    const idx = assignments.findIndex((a) => a.id === assignmentId);
    if (idx < 0) return res.status(404).json({ success: false, message: 'Task assignment not found' });

    const current = assignments[idx];
    const owns = await verifyTaskOwnershipByEmail(email, current.assignee_id);
    if (!owns) return res.status(403).json({ success: false, message: 'Assignment does not belong to user' });

    const currentStatus = String(current.status || '').toLowerCase();
    const nextStatus = (currentStatus === 'pending' || currentStatus === 'open') ? 'accepted' : currentStatus;
    const updated = normalizeTaskAssignment({ ...current, status: nextStatus, updated_at: nowIso() });
    assignments[idx] = updated;
    await saveTaskAssignments(assignments);

    const tpl = templates.find((t) => t.id === updated.task_template_id) || null;
    res.json({ success: true, data: { ...updated, template_title: tpl?.title || null, template_description: tpl?.description || null, payment_amount: tpl?.payment_amount ?? null } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to accept task assignment', error: String(error) });
  }
});

app.post('/api/public/user-task-assignments/:id/submit', async (req, res) => {
  try {
    const assignmentId = String(req.params.id || '').trim();
    const email = String(req.body?.email || req.query?.email || '').trim().toLowerCase();

    if (!assignmentId) return res.status(400).json({ success: false, message: 'assignment id is required' });

    const [assignments, templates] = await Promise.all([getTaskAssignments(), getTaskTemplates()]);
    const idx = assignments.findIndex((a) => a.id === assignmentId);
    if (idx < 0) return res.status(404).json({ success: false, message: 'Task assignment not found' });

    const current = assignments[idx];
    const owns = await verifyTaskOwnershipByEmail(email, current.assignee_id);
    if (!owns) return res.status(403).json({ success: false, message: 'Assignment does not belong to user' });

    const currentStatus = String(current.status || '').toLowerCase();
    if (currentStatus !== 'accepted') {
      return res.status(400).json({ success: false, message: 'Task must be accepted before submit' });
    }

    const updated = normalizeTaskAssignment({ ...current, status: 'submitted', submitted_at: nowIso(), updated_at: nowIso() });
    assignments[idx] = updated;
    await saveTaskAssignments(assignments);

    const tpl = templates.find((t) => t.id === updated.task_template_id) || null;

    res.json({
      success: true,
      data: {
        ...updated,
        template_title: tpl?.title || null,
        template_description: tpl?.description || null,
        payment_amount: tpl?.payment_amount ?? null
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to submit task assignment', error: String(error) });
  }
});

app.get('/api/postident/status/:id', async (req, res) => {
  const requestId = req.params.id;
  const key = `postident:status:${requestId}`;
  const defaults = {
    id: requestId,
    status: 'pending',
    provider: 'simulated',
    message: 'Verification in progress',
    updated_at: nowIso(),
    completed_at: null
  };
  const existing = await prisma.setting.findUnique({ where: { key } });
  const data = existing?.value || defaults;
  if (!existing) await putSettingJson(key, data);
  res.json({ success: true, data });
});

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not Found' });
});

app.listen(port, () => {
  console.log(`magicvics backend running at http://localhost:${port}`);
});






