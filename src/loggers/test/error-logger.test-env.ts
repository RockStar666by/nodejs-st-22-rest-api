import * as path from 'node:path';
import * as winston from 'winston';

const { timestamp, combine, json } = winston.format;

export const errorLoggerTest = () => {
  return winston.createLogger({
    level: 'error',
    format: combine(timestamp(), json()),
    transports: [
      new winston.transports.File({
        filename: path.join('logs-test', 'errors.log'),
      }),
    ],
  });
};
