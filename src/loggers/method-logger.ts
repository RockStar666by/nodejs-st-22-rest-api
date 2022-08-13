import { methodLoggerDev } from './development/method-logger.dev';

export const methodLogger =
  process.env.NODE_ENV === 'development' ? methodLoggerDev() : null;
