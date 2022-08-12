import { ConsoleLogger } from '@nestjs/common';
import { errorLogger } from './error-logger';

export class TopLevelLogger extends ConsoleLogger {
  logger = errorLogger;
  error(error: any, ...args) {
    if (this.logger) {
      if (error instanceof Error) {
        const { message, name, stack } = error;
        this.logger.error({ name, message, stack });
      } else {
        this.logger.error(error);
      }
    }
    super.error(error, ...args);
  }
}
