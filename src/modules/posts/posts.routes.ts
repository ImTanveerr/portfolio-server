import { Router } from 'express';
import { PostController } from './posts.controller';

export const postsRouter = Router();

postsRouter.post('/create', PostController.createPost);
postsRouter.get('/get/:id', PostController.getPostById);
postsRouter.get('/get-all', PostController.getAllPosts);
postsRouter.patch('/update/:id', PostController.modifyPostById);
postsRouter.delete('/delete/:id', PostController.deletePostById);
