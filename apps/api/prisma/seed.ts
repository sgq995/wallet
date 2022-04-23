import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function types() {
  return prisma.type.createMany({
    data: [
      { name: 'Income' },
      { name: 'Expense' },
      { name: 'Asset' },
      { name: 'Liability' },
    ],
    skipDuplicates: true,
  });
}

async function main() {
  await types();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
