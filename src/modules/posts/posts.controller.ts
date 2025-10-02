import { asyncHandler } from '../../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import prisma from '../../lib/prisma';


const createPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, thumbnailUrl, content } = req.body;

    if (!title || !description || !content) {
      sendResponse(res, {
        data: null,
        message: 'Required Post Field(s) Missing',
        statusCode: 400,
      });
      return;
    }
    try {
      const post = await prisma.posts.create({
        data: {
          title: String(title),
          content: String(content),
          description: String(description),
          thumbnailUrl: String(thumbnailUrl),
        },
      });
      sendResponse(res, {
        message: 'Post created succesfully!',
        data: post,
        statusCode: 200,
      });
    } catch (error) {
      sendResponse(res, {
        data: null,
        message: 'Something went wrong on the server',
        statusCode: 500,
      });
      console.log(error);
    }
  }
);

const getPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await prisma.posts.findFirst({
        where: { id: Number(id) },
      });
      sendResponse(res, {
        message: 'Post fetched succesfully!',
        data: post,
        statusCode: 200,
      });
    } catch (error) {
      sendResponse(res, {
        data: null,
        message: 'Something went wrong on the server',
        statusCode: 500,
      });
      console.log(error);
    }
  }
);

const getAllPosts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await prisma.posts.findMany({
        orderBy: { createdAt: 'desc' },
      });
      sendResponse(res, {
        message: 'All Post fetched succesfully!',
        data: post,
        statusCode: 200,
      });
    } catch (error) {
      sendResponse(res, {
        data: null,
        message: 'Something went wrong on the server',
        statusCode: 500,
      });
      console.log(error);
    }
  }
);

const deletePostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

   
    try {
      const updtedPost = await prisma.posts.delete({
        where: { id: Number(id) },
      });
      sendResponse(res, {
        message: 'Post deleted succesfully!',
        data: updtedPost,
        statusCode: 200,
      });
    } catch (error) {
      sendResponse(res, {
        data: null,
        message: 'Something went wrong on the server',
        statusCode: 500,
      });
      console.log(error);
    }
  }
);
const modifyPostById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, thumbnailUrl, content } = req.body;
    const id = req.params.id;

    // if (!title || !description || !content) {
    //   sendResponse(res, {
    //     data: null,
    //     message: 'Required Post Field(s) Missing',
    //     statusCode: 400,
    //   });
    //   return;
    // }
    try {
      const updtedPost = await prisma.posts.update({
        where: {
          id: Number(id),
        },
        data: {
          title: String(title),
          content: String(content),
          description: String(description),
          thumbnailUrl: String(thumbnailUrl),
        },
      });
      sendResponse(res, {
        message: 'Post updated succesfully!',
        data: updtedPost,
        statusCode: 200,
      });
    } catch (error) {
      sendResponse(res, {
        data: null,
        message: 'Something went wrong on the server',
        statusCode: 500,
      });
      console.log(error);
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
