const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const insights = await prisma.industryInsight.findMany();
  console.log(JSON.stringify(insights, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
