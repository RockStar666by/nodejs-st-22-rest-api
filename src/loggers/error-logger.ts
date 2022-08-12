import { errorLoggerDev } from './development/error-logger.dev';

export const errorLogger =
  process.env.NODE_ENV === 'development' ? errorLoggerDev() : null;
