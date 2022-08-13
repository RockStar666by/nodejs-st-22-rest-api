import clc = require('cli-color');
import { Request, Response, NextFunction } from 'express';

export const myCustomLogger = (req: Request, res: Response) => {
  const getCurrentDateString = () => {
    return new Date().toISOString() + ' ::';
  };

  const info = {
    path: req.baseUrl,
    request: req,
    response: res,
    method: req.method,
  };

  Object.entries(info).forEach((arg) =>
    console.log(
      clc.green(getCurrentDateString()),
      `- ${clc.bgGreen(' info ')} - ${arg[0]}:`,
      arg[1],
    ),
  );
};
