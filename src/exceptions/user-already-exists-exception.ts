import { ExceptionFilter } from '@nestjs/common';

export class UserAlreadyExistsException implements ExceptionFilter {
  catch(_, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 409;
    const message = 'User already exists';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
