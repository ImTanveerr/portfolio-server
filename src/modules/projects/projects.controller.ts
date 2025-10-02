import { asyncHandler } from '../../utils/asyncHandler';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../../utils/sendResponse';
import { prisma } from '../../lib/prisma';

const createProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, thumbnailUrl, features, liveUrl, projectUrl } =
      req.body;

    if (!name || !description || !features || !liveUrl || !projectUrl) {
      sendResponse(res, {
        data: null,
        message: 'Required Post Field(s) Missing',
        statusCode: 400,
      });
      return;
    }
    if (!Array.isArray(features)) {
      sendResponse(res, {
        data: null,
        message: 'Invalid features array',
        statusCode: 400,
      });
      return;
    }

    try {
      const post = await prisma.projects.create({
        data: {
          name: String(name),
          features: features.map((item) => String(item)),
          description: String(description),
          thumbnailUrl: String(thumbnailUrl),
          liveUrl: String(liveUrl),
          projectUrl: String(projectUrl),
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

const getProjectById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
      const post = await prisma.projects.findFirst({
        where: { id: Number(id) },
      });
      sendResponse(res, {
        message: 'Project fetched succesfully!',
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

const getAllProjects = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const projects = await prisma.projects.findMany({
        orderBy: { id: 'desc' },
      });
      sendResponse(res, {
        message: 'All Projects fetched succesfully!',
        data: projects,
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

const deleteProjectById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
      const updtedproject = await prisma.projects.delete({
        where: { id: Number(id) },
      });
      sendResponse(res, {
        message: 'project deleted succesfully!',
        data: updtedproject,
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
const modifyProjectById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, thumbnailUrl, features, liveUrl, projectUrl } =
      req.body;

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
      const updtedProject = await prisma.projects.update({
        where: {
          id: Number(id),
        },
        data: {
          name: String(name),
          features: features.map((item: string) => String(item)),
          description: String(description),
          thumbnailUrl: String(thumbnailUrl),
          liveUrl: String(liveUrl),
          projectUrl: String(projectUrl),
        },
      });
      sendResponse(res, {
        message: 'Project updated succesfully!',
        data: updtedProject,
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

export const ProjectController = {
  createProject,
  getAllProjects,
  getProjectById,
  modifyProjectById,
  deleteProjectById,
};
