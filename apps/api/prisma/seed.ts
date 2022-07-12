import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function types() {
  return prisma.entryType.createMany({
    data: [
      { name: 'Income' },
      { name: 'Expense' },
      { name: 'Asset' },
      { name: 'Liability' },
    ],
    skipDuplicates: true,
  });
}

function currencies() {
  return prisma.currency.createMany({
    data: [
      { precision: 2, symbol: '$', code: 'USD', decimal: '.', separator: ',' },
      { precision: 0, symbol: '¥', code: 'JPY', decimal: '.', separator: ',' },
      { precision: 2, symbol: '€', code: 'EUR', decimal: '.', separator: ',' },
      { precision: 2, symbol: '$', code: 'COP', decimal: '.', separator: ',' },
    ],
  });
}

async function main() {
  await types();
  await currencies();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
