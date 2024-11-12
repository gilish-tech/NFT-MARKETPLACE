import { PrismaClient } from '@prisma/client';

// Disable the "no-var" rule for this specific line
// eslint-disable-next-line no-var
declare global {
  var prisma: PrismaClient | undefined; //eslint-disable-line no-var
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
}

export default prisma;
