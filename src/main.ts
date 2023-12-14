import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './app.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // Custom exception factory is needed for more detailed error response.
      exceptionFactory: (errors) => new BadRequestException(errors),
    }),
  );
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Swagger doc config builder.
  const config = new DocumentBuilder()
    .setTitle('Book app')
    .setDescription('App for managing book storage')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}

bootstrap();
