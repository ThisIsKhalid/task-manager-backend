import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let errorResponse =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    if (!(exception instanceof HttpException)) {
      this.logger.error(
        'Unhandled Exception',
        exception instanceof Error ? exception.stack : String(exception),
      );
    }

    if (typeof errorResponse === 'string') {
      errorResponse = { message: errorResponse };
    }

    // Send response (merging errorResponse fields)
    response.status(status).send({
      statusCode: status,
      ...errorResponse,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
