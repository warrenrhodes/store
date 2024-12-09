import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

async function main() {}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });

export { prismaClient };
