import { errorLoggerDev } from './development/error-logger.dev';
import { errorLoggerTest } from './test/error-logger.test-env';

export const errorLogger =
  process.env.NODE_ENV === 'development' ? errorLoggerDev() : errorLoggerTest();
