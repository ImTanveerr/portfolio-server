import { Router } from 'express';
import { postsRouter } from './modules/posts/posts.routes';
import { userRouter } from './modules/user/user.routes';
import { projectsRouter } from './modules/projects/posts.routes';

export const globalRouter = Router();

globalRouter.use('/posts', postsRouter);
globalRouter.use('/user', userRouter);
globalRouter.use('/projects', projectsRouter);
