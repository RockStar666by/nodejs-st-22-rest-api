import { methodLoggerDev } from './development/method-logger.dev';

const logger = methodLoggerDev();

export function MethodInfoLogger(target: any, key: string, descriptor: any) {
  const calledMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    logger.info({
      controller: this?.constructor?.name,
      method: key,
      args,
    });
    return calledMethod.apply(this, args);
  };

  return descriptor;
}
