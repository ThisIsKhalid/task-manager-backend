/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// custom-error.ts
import { HttpException } from '@nestjs/common';

export class CustomError extends HttpException {
  constructor(
    status: number,
    message: string,
    public readonly errorCode?: string,
    public readonly details?: any,
  ) {
    super(
      {
        statusCode: status,
        message,
        errorCode,
        details,
      },
      status,
    );
  }
}
