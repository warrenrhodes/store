import { PrismaClient } from "./generated/client";

const prismaClientSingleton = () => {
  // Add this check
  if (typeof window !== "undefined") {
    console.trace("🚨 Attempting to use Prisma Client on the browser");
    throw new Error("Prisma Client cannot be used on the browser");
  }

  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    datasourceUrl: process.env.DATABASE_URL,
  });

  return client;
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
