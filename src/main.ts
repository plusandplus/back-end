import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log(process.env.DB_USERNAME);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
