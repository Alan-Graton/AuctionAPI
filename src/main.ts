import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
  });
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
