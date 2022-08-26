import { methodLoggerDev } from './development/method-logger.dev';
import { methodLoggerTest } from './test/method-logger.test-env';

export const methodLogger =
  process.env.NODE_ENV === 'development'
    ? methodLoggerDev()
    : methodLoggerTest();
