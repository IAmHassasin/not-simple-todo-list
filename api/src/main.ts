import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

export const prismaService = new PrismaClient();

async function bootstrap() {
  // Intialize Prisma
  await prismaService.$connect();

  const app = await NestFactory.create(AppModule);

  app.getHttpAdapter().getInstance().disable('x-powered-by');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);

  // Handle graceful shutdown
  process.on('SIGTERM', async () => {
    await prismaService.$disconnect();
    await app.close();
  });
  process.on('SIGINT', async () => {
    await prismaService.$disconnect();
    await app.close();
  });
  process.on('unhandledRejection', async err => {
    await prismaService.$disconnect();
    await app.close();
  });
  process.on('uncaughtException', async err => {
    await prismaService.$disconnect();
    await app.close();
  });
}

bootstrap();

