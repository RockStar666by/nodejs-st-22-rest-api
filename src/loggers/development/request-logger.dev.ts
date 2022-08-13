import * as path from 'node:path';
import * as winston from 'winston';

const { timestamp, combine, json } = winston.format;

export const requestLoggerDev = () => {
  return winston.createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
      new winston.transports.File({
        filename: path.join('logs', 'requests.log'),
      }),
    ],
  });
};
