import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from './logger/logger.service';

@Catch()
export class HttpExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof BadRequestException) {
      const error = exception.getResponse();

      const message = `ERROR [BadRequestException] ${JSON.stringify(error)}`;
      new Logger().send(message);

      response.status(status).json(error);
    }

    if (exception instanceof HttpException) {
      const error = exception.getResponse();

      const message = `ERROR [HttpException] ${JSON.stringify(error)}`;
      new Logger().send(message);

      response.status(status).json({ statusCode: status, message: error });
    }

    const message = `ERROR [HttpExceptionFilter] ${status} ${request.method} ${request.url}`;
    new Logger().send(message);

    response.status(status).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
}
