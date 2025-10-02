import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/apiError';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorDetails: any = undefined;

  // Fallback to ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    statusCode,
    message,
    errorName: err.name,
    ...(errorDetails && { errors: errorDetails }),
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
