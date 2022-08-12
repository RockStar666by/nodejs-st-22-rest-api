import { requestLoggerDev } from './development/request-logger.dev';

export const requestLogger =
  process.env.NODE_ENV === 'development' ? requestLoggerDev() : null;
