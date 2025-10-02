import { asyncHandler } from '../../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { prisma } from '../../lib/prisma';
import { compare, hash } from 'bcryptjs';

const adminSignIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const credEmail = req.body.email;
    const password = req.body.password;

    if (!credEmail || !password)
      sendResponse(res, {
        statusCode: 401,
        message: 'Credentials incomplete',
        data: null,
      });

    const existingUser = await prisma.user.findFirst({
      where: { email: credEmail },
    });
    if (!existingUser) {
      sendResponse(res, {
        data: null,
        message: 'Invalid email',
        statusCode: 401,
      });
      return;
    }

    const isPasswordCorrect = await compare(password, existingUser.password);

    if (isPasswordCorrect)
      sendResponse(res, {
        statusCode: 200,
        message: 'User validation succesful!',
        data: existingUser,
      });
    else {
      sendResponse(res, {
        statusCode: 400,
        message: 'User validation failed!',
        data: null,
      });
    }
  }
);


const getDashboardData = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const [postData, projectData] = await prisma.$transaction([
      prisma.posts.findMany({
        omit: { content: true, updatedAt: true },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.projects.findMany({
        select: { id: true, name: true, description: true },
        orderBy: { id: 'desc' },
      }),
    ]);

    sendResponse(res, {
      data: {
        postData,
        projectData,
      },
      message: 'Dashboard Data Fetched Succesfully!',
      statusCode: 200,
    });
  }
);

export const UserController = {
  adminSignIn,
  getDashboardData,
 
};
