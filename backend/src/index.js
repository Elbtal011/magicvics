import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = Number(process.env.PORT || 4000);

app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(express.json());

const nowIso = () => new Date().toISOString();
const num = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

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
});

async function findEmployeeByAnyId(id, include = undefined) {
  let employee = await prisma.employee.findUnique({ where: { id }, include });
  if (!employee) employee = await prisma.employee.findFirst({ where: { profileId: id }, include });
  return employee;
}

app.get('/api/employees/:id', async (req, res) => {
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
  const employees = await prisma.employee.findMany({ include: { profile: true }, orderBy: { createdAt: 'desc' } });
  const data = employees.map((e) => ({
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
    task_status: 'not_started',
    contact_count: 0,
    last_contact_type: null,
    last_contacted_at: null
  }));
  res.json({ success: true, data });
});

app.get('/api/admin/starter-task-tracking/stats', async (_req, res) => {
  const total = await prisma.employee.count();
  res.json({ success: true, data: { total_workers: total, pending_workers: total, contacted_workers: 0 } });
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

app.patch('/api/admin/users/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body || {};
  const existing = await prisma.profile.findUnique({ where: { id }, include: { employee: true } });
  if (!existing) return res.status(404).json({ error: 'User not found' });

  const metadata = body.user_metadata || {};
  const firstName = metadata.first_name ?? body.first_name;
  const lastName = metadata.last_name ?? body.last_name;
  const role = metadata.role ?? body.role;
  const bannedUntil = body.ban_duration !== undefined ? parseBanDurationToDate(body.ban_duration) : undefined;

  const updated = await prisma.$transaction(async (tx) => {
    const fullNameFromUpdate = `${firstName ?? existing.firstName ?? ''} ${lastName ?? existing.lastName ?? ''}`.trim();
    const profile = await tx.profile.update({
      where: { id },
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
        bannedUntil,
        adminNotes: body.admin_notes !== undefined ? body.admin_notes || null : undefined
      },
      include: { employee: true }
    });

    if (role === 'user' && !profile.employee) {
      await tx.employee.create({ data: { profileId: id, status: 'active', department: body.position || null, hiredAt: new Date() } });
    }

    return tx.profile.findUnique({ where: { id }, include: { employee: true } });
  });

  res.json({ user: serializeAdminUser(updated) });
});

app.delete('/api/admin/users/:id', async (req, res) => {
  const id = req.params.id;
  const existing = await prisma.profile.findUnique({ where: { id } });
  if (!existing) return res.status(404).json({ error: 'User not found' });
  await prisma.profile.delete({ where: { id } });
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

const safeMessageAck = async (channel, template, payload = {}) => {
  const key = `${channel}:${template}`;
  const existing = await prisma.setting.findUnique({ where: { key } });
  const log = Array.isArray(existing?.value?.events) ? existing.value.events : [];
  const event = {
    id: `evt_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    at: nowIso(),
    channel,
    template,
    payload
  };
  const next = [...log.slice(-99), event];
  await prisma.setting.upsert({ where: { key }, update: { value: { events: next } }, create: { key, value: { events: next } } });
  return event;
};

app.post('/api/email/:template', async (req, res) => {
  const event = await safeMessageAck('email', req.params.template, req.body || {});
  res.json({ success: true, status: 'queued', channel: 'email', template: req.params.template, event_id: event.id, simulated: true });
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
        '286': { name: 'Vereinigtes Königreich' },
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

app.get('/api/email/providers', async (_req, res) => {
  const defaults = {
    active_provider: 'smtp',
    providers: {
      smtp: { enabled: true, host: '', port: 587, secure: false, from_email: '', from_name: 'MagicVics' },
      resend: { enabled: false, api_key_set: false, from_email: '' },
      sendgrid: { enabled: false, api_key_set: false, from_email: '' }
    }
  };
  const data = await getSettingJson('email:providers', defaults);
  res.json({ success: true, data });
});

app.put('/api/email/providers', async (req, res) => {
  const current = await getSettingJson('email:providers', { active_provider: 'smtp', providers: {} });
  const next = { ...current, ...(req.body || {}) };
  await putSettingJson('email:providers', next);
  res.json({ success: true, message: 'Email providers updated', data: next });
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

const loadJsonSetting = async (key, fallback) => {
  const row = await prisma.setting.findUnique({ where: { key } });
  return row?.value ?? fallback;
};
const saveJsonSetting = async (key, value) => putSettingJson(key, value);

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

  const employees = await prisma.employee.findMany({ include: { profile: true }, orderBy: { createdAt: 'asc' }, take: 3 });
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
        content: 'Natürlich, ich helfe dir gerne. Worum geht es genau?',
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
  const state = await loadChatState();

  const title = (req.body?.title || 'Projektleitung Chat').toString().trim();
  const conversationType = (req.body?.conversationType || req.body?.conversation_type || 'general').toString();
  const taskAssignmentId = (req.body?.taskAssignmentId || req.body?.task_assignment_id || '').toString().trim() || null;
  const userId = (req.body?.user_id || req.body?.userId || '').toString().trim() || null;

  let existing = null;
  if (taskAssignmentId) {
    existing = state.conversations.find(
      (c) => !c.deleted_at && c.task_assignment_id === taskAssignmentId && (userId ? c.created_by === userId : true)
    );
  } else {
    // Compatibility: widget may repeatedly call createConversation without taskAssignmentId.
    // Reuse latest open conversation for the same user + type instead of creating duplicates.
    const candidates = state.conversations
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

  state.conversations.unshift(created);
  await saveChatState(state);

  return res.json({ success: true, conversation: created, isExisting: false });
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
  const state = await loadChatState();
  const rows = state.messages
    .filter((m) => m.conversation_id === req.params.id && !m.deleted_at)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const { data, pagination } = paginate(rows, req.query.page, req.query.limit || 200);
  res.json({ success: true, messages: data, pagination });
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

  // deterministic auto-reply for demo feel
  const aiMsg = {
    id: makeId('msg'),
    conversation_id: conversationId,
    sender_type: 'ai',
    sender_id: null,
    content: `Danke für deine Nachricht: "${content.slice(0, 120)}". Ein Admin kann jederzeit eingreifen.`,
    message_type: 'text',
    metadata: { auto_reply: true },
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
