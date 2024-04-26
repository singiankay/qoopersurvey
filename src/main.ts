import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
import 'dotenv/config';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(fastifyCookie, {
    secret: process.env.JWT_SECRET,
  });
  app.enableCors({ origin: 'http://localhost:8080', credentials: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Qooper Survey API')
    .setDescription('Qooper Backend Engineer Survey API')
    .setVersion('1.0')
    .addTag('survey')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, HOST, () => {
    console.log(`Listening on PORT ${PORT} and HOST ${HOST}`);
  });
}
bootstrap();
