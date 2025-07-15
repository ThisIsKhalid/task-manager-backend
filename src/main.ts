import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/error_handler/globalErrorHandler';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,

    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); // this will validate incoming requests based on DTOs, without this DTOs will not be validated

  app.useGlobalFilters(new AllExceptionsFilter()); // Global error handler
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error('Failed to bootstrap application', err);
});
