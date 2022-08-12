import 'dotenv/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { errorLogger } from './loggers/error-logger';
import { TopLevelLogger } from './loggers/top-level-logger';

console.log(
  '\x1b[33m%s\x1b[0m',
  `WARNING! App is running in " ${process.env.NODE_ENV.toUpperCase()} " mode. To change mode, please, go to .env file.\n`,
);

process.on('uncaughtException', ({ name, message, stack }) => {
  errorLogger.error({
    event: 'uncaughtException',
    name,
    message,
    stack,
  });
});

process.on('unhandledRejection', (reason) => {
  errorLogger.warn({ event: 'unhandledRejection', reason });
});

async function start() {
  const PORT = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule, {
    logger: new TopLevelLogger(),
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () =>
    console.log(`Server started on port ${PORT}...`),
  );
}
start();
