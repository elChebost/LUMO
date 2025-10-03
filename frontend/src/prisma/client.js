// client.js
// Placeholder para simular Prisma Client en frontend

// En frontend solo se usan datos mock, no conexión real.

import { students, missions } from './seed';

export const prisma = {
  student: {
    findMany: async () => students,
  },
  mission: {
    findMany: async () => missions,
  },
};
