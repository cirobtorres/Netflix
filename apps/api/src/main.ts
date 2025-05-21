import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('DATABASE_URL', process.env.DATABASE_URL ? 'ok' : undefined, '\n');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
