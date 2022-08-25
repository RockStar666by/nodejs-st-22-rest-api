import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { requestLogger } from '../../loggers/request-logger';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    requestLogger.info({
      path: req.baseUrl,
      request: req,
      response: res,
      method: req.method,
    });
    next();
  }
}
