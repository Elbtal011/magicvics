import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.phoneNumber.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.setting.deleteMany();

  const admin = await prisma.profile.create({
    data: {
      email: 'demo-admin@local.test',
      fullName: 'Demo Admin',
      role: 'admin'
    }
  });

  const lina = await prisma.profile.create({
    data: {
      email: 'lina@magicvics.test',
      fullName: 'Lina Schmidt',
      role: 'user'
    }
  });

  const noah = await prisma.profile.create({
    data: {
      email: 'noah@magicvics.test',
      fullName: 'Noah Weber',
      role: 'user'
    }
  });

  const emp1 = await prisma.employee.create({
    data: { profileId: lina.id, status: 'active', department: 'caller', salaryCents: 280000 }
  });

  const emp2 = await prisma.employee.create({
    data: { profileId: noah.id, status: 'inactive', department: 'support', salaryCents: 240000 }
  });

  await prisma.setting.createMany({
    data: [
      { key: 'website_name', value: 'MagicVics 2' },
      { key: 'payment_mode', value: 'vertragsbasis' },
      { key: 'kyc_required_for_tasks', value: false }
    ]
  });

  await prisma.phoneNumber.createMany({
    data: [
      {
        phoneNumber: '+49170000001',
        provider: 'anosim',
        service: 'go',
        country: '98',
        monthlyPrice: 10.85,
        status: 'active',
        employeeId: emp1.id
      },
      {
        phoneNumber: '+49170000002',
        provider: 'gogetsms',
        service: 'wa',
        country: '286',
        monthlyPrice: 8.25,
        status: 'active',
        employeeId: null
      }
    ]
  });

  console.log('Seed complete:', { admin: admin.id, employees: [emp1.id, emp2.id] });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
