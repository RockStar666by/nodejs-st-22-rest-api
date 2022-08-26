import { requestLoggerDev } from './development/request-logger.dev';
import { requestLoggerTest } from './test/request-logger.test-env';

export const requestLogger =
  process.env.NODE_ENV === 'development'
    ? requestLoggerDev()
    : requestLoggerTest();
