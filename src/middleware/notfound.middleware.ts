import { Request, Response } from 'express';

export async function notFound(req: Request, res: Response) {
  res.status(404).json({
    success: false,
    message: 'Route Not Found',
    data: null,
  });
}
