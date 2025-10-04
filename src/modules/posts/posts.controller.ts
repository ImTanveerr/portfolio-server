import { asyncHandler } from '../../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import prisma from '../../lib/prisma';

// Helper for server errors
const handleServerError = (res: Response, error: any) => {
  console.error(error);
  sendResponse(res, {
    data: null,
    message: 'Something went wrong on the server',
    statusCode: 500,
  });
};

const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, thumbnailUrl, content } = req.body;

    if (!title || !description || !content) {
      sendResponse(res, {
        data: null,
        message: 'Required post field(s) missing',
        statusCode: 400,
      });
      return;
    }

    try {
      const post = await prisma.posts.create({
        data: {
          title: String(title),
          description: String(description),
          content: String(content),
          thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : null,
        },
      });

      sendResponse(res, {
        message: 'Post created successfully!',
        data: post,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

const getPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    try {
      const post = await prisma.posts.findUnique({
        where: { id },
      });

      if (!post) {
        sendResponse(res, {
          data: null,
          message: 'Post not found',
          statusCode: 404,
        });
        return;
      }

      sendResponse(res, {
        message: 'Post fetched successfully!',
        data: post,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

const getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await prisma.posts.findMany({
        orderBy: { createdAt: 'desc' },
      });

      sendResponse(res, {
        message: 'All posts fetched successfully!',
        data: posts,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

const deletePostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    try {
      const deletedPost = await prisma.posts.delete({
        where: { id },
      });

      sendResponse(res, {
        message: 'Post deleted successfully!',
        data: deletedPost,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

const modifyPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, thumbnailUrl, content } = req.body;
    const id = Number(req.params.id);

    if (!title || !description || !content) {
      sendResponse(res, {
        data: null,
        message: 'Required post field(s) missing',
        statusCode: 400,
      });
      return;
    }

    try {
      const updatedPost = await prisma.posts.update({
        where: { id },
        data: {
          title: String(title),
          description: String(description),
          content: String(content),
          thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : null,
        },
      });

      sendResponse(res, {
        message: 'Post updated successfully!',
        data: updatedPost,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

export const PostController = {
  createPost,
  getPostById,
  getAllPosts,
  modifyPostById,
  deletePostById,
};
