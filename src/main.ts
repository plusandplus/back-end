import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.AWS_ACCESS_KEY);
  console.log('1');
  const app = await NestFactory.create(AppModule, { cors: true });
  console.log(process.env.AWS_ACCESS_KEY);
  console.log('2');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.SERVER_PORT);
  Logger.log(`Application running on port ${process.env.SERVER_PORT}`);
}
bootstrap();
