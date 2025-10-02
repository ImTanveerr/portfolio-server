import { Router } from 'express';
import { UserController } from './user.controller';

export const userRouter = Router();

userRouter.post('/admin-sign-in', UserController.adminSignIn);
userRouter.get('/get-dashboard-data', UserController.getDashboardData);
