import * as dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { taskData } from './data/task';

dotenv.config({ path: '.env' });
const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: taskData,
  })
}

main()
  .catch((e) => {
    console.log(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });