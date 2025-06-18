import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express'
import cors from 'cors'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  app.enableCors()
  app.use('/stripe/webhook', express.raw({type: 'application/json'}))
  await app.listen(process.env.PORT ?? 3001);

}
bootstrap();
