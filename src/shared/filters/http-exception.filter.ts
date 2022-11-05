import { Response, Request } from 'express';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { errorsEn, errorsPt } from '../i18n';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const language = request.headers['x-language'] as string;
    const languageIsPt = language && language.toLowerCase().includes('pt');
    const errorMessagesObj = languageIsPt ? errorsPt : errorsEn;

    let message = 'Internal Server Error';
    let statusCode = 500;

    if (exception.response?.isAppError) {
      const errMessage = errorMessagesObj[exception?.response?.errorMessageKey];
      message = errMessage || 'Need to implement this error message correctly';
    } else if (exception.message) {
      message = exception.message;
    }

    const isMongooseValidationError = exception._message;

    if (exception.status) {
      statusCode = exception.status;
    } else if (isMongooseValidationError) {
      statusCode = 422;
    }

    return response.status(statusCode).json({
      message,
      messageLang: languageIsPt ? 'pt' : 'en',
      statusCode,
    });
  }
}
