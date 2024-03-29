import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception?.message || 'Custom::Internal server error';

    const exceptionResponse =
      typeof exception.getResponse() === 'string'
        ? { message: exception.getResponse() }
        : (exception.getResponse() as Record<string, unknown>);

    const error = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      ...exceptionResponse,
    };

    Logger.error(error);
    response.status(status).json(error);
  }
}
