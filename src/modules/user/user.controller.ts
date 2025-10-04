import { asyncHandler } from '../../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { compare } from 'bcryptjs';
import prisma from '../../lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'; // use env in prod

// --- LOGIN ---
const adminSignIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendResponse(res, {
        statusCode: 401,
        message: 'Credentials incomplete',
        data: null,
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return sendResponse(res, {
        statusCode: 401,
        message: 'Invalid email',
        data: null,
      });
    }

    const isPasswordCorrect = await compare(password, existingUser.password);

    if (!isPasswordCorrect) {
      return sendResponse(res, {
        statusCode: 400,
        message: 'Invalid password',
        data: null,
      });
    }

    // generate tokens
    const accessToken = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: existingUser.id, email: existingUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // remove password before sending
    const { password: _, ...userWithoutPassword } = existingUser;

    sendResponse(res, {
      statusCode: 200,
      message: 'User validation successful!',
      data: {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      },
    });
  }
);

// --- DASHBOARD ---
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
      data: { postData, projectData },
      message: 'Dashboard Data Fetched Successfully!',
      statusCode: 200,
    });
  }
);

export const UserController = {
  adminSignIn,
  getDashboardData,
};
