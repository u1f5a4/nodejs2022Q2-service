import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from './logger/logger.service';

@Catch()
export class HttpExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = `ERROR [HttpExceptionFilter] ${request.method} ${request.url}`;
    new Logger().send(message);

    response.status(status).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
