import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import { returnMessage } from "utils/helpers/returnMessage";
import { StatusMessage } from "utils/enums/StatusMessage";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | null = null;

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res = exception.getResponse();
      if (typeof res === "string") {
        message = res;
      } else if (typeof res === "object" && res !== null) {
        message = (res as any).message || message;
      }
    }

    const statusMessage: StatusMessage =
      this.mapHttpStatusToStatusMessage(statusCode);

    response.status(statusCode).json(
      returnMessage({
        ok: false,
        statusCode,
        statusMessage,
        data: message,
      }),
    );
  }

  private mapHttpStatusToStatusMessage(statusCode: number): StatusMessage {
    switch (statusCode) {
      case HttpStatus.BAD_REQUEST:
        return StatusMessage.BAD_REQUEST;
      case HttpStatus.UNAUTHORIZED:
        return StatusMessage.UNAUTHORIZED;
      case HttpStatus.FORBIDDEN:
        return StatusMessage.FORBIDDEN;
      case HttpStatus.NOT_FOUND:
        return StatusMessage.NOT_FOUND;
      case HttpStatus.CONFLICT:
        return StatusMessage.CONFLICT;
      case HttpStatus.CREATED:
        return StatusMessage.CREATED;
      case HttpStatus.OK:
        return StatusMessage.OK;
      default:
        return StatusMessage.INTERNAL_SERVER_ERROR;
    }
  }
}
