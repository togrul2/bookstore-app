import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';

@Injectable()
/**
 * Interceptor for logging requests and responses.
 */
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const logger = new Logger(context.getClass().name);
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        const time = Date.now() - startTime;
        logger.log(`${req.method} ${statusCode} ${req.url} ${time}ms`);
      }),
      catchError((error) => {
        // const response = context.switchToHttp().getResponse();
        // Default to 500 if status code is not available.
        let statusCode = 500;
        if (error instanceof HttpException) {
          statusCode = error.getStatus();
        }

        const time = Date.now() - startTime;
        const message = `${req.method} ${statusCode} ${req.url} ${time}ms - ${error.message}`;
        const isClientError = statusCode >= 400 && statusCode < 500;

        if (isClientError) {
          logger.warn(message);
        } else {
          logger.error(message);
        }
        throw error; // re-throw the error to propagate it.
      }),
    );
  }
}
