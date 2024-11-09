import { PrismaClient } from "@prisma/client";

// Defining a global type for the Prisma instance, allowing it to persist across module reloads in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Exporting the Prisma instance, checking if one already existed in `globalForPrisma`.
// This is preventing the creation of multiple instances during hot-reloading in development.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Logging all queries to the console for debugging purposes
    log: ['query'],
  });

// In non-production environments, storing the Prisma instance globally to avoid duplication
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
