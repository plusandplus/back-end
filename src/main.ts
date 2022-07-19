import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(process.env.SERVER_PORT);
  Logger.log(`Application running on port ${process.env.SERVER_PORT}`);
}
bootstrap();
