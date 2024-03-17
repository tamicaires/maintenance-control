import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { IncorrectValuesException } from './exceptions/IncorrectValuesExceptions';
import { mapperClassValidationErrorToAppException } from './utils/mappers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory(errors: ValidationError[]){
        throw new IncorrectValuesException({
          fields: mapperClassValidationErrorToAppException(errors)
        });
      },
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  await app.listen(3000);
}

bootstrap();
