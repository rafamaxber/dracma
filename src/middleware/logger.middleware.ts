import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`
      Called ${req.method}:
      [url: ${req.baseUrl}}]
      [query: ${JSON.stringify(req.query)}],
      [params: ${JSON.stringify(req.params)}],
      [body: ${JSON.stringify(req.body)}],
      [headers: ${JSON.stringify(req.headers)}]
    `);

    next();
  }
}
