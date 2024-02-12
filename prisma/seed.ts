import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  const createRoles = prisma.roles.createMany({
    data: [
      { name: Role.system_admin },
      { name: Role.user },
      { name: Role.worker },
      { name: Role.user_admin },
    ],
  });

  const createUnits = prisma.unit.createMany({
    data: [
      { name: 'kg', longName: 'Kilos' },
      { name: 'gr', longName: 'Gramas' },
      { name: 'l', longName: 'Litros' },
      { name: 'ml', longName: 'Mili Litros' },
      { name: 'pacotes', longName: 'Pacote' },
      { name: 'unidades', longName: 'Unidade' },
    ],
  });

  await prisma.$transaction([createRoles, createUnits]);
  console.log('Database seeded!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
