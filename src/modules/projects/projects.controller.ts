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

const createProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, thumbnailUrl, features, liveUrl, projectUrl } = req.body;

    if (!name || !description || !features || !Array.isArray(features) || features.length === 0 || !liveUrl || !projectUrl) {
      sendResponse(res, {
        data: null,
        message: 'Required post field(s) missing or invalid',
        statusCode: 400,
      });
      return;
    }

    try {
      const project = await prisma.projects.create({
        data: {
          name: String(name),
          description: String(description),
          features: features.map((item: any) => String(item)),
          thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : null,
          liveUrl: String(liveUrl),
          projectUrl: String(projectUrl),
        },
      });

      sendResponse(res, {
        message: 'Project created successfully!',
        data: project,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

const getProjectById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    try {
      const project = await prisma.projects.findUnique({
        where: { id },
      });

      if (!project) {
        sendResponse(res, {
          data: null,
          message: 'Project not found',
          statusCode: 404,
        });
        return;
      }

      sendResponse(res, {
        message: 'Project fetched successfully!',
        data: project,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
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
        message: 'All projects fetched successfully!',
        data: projects,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

const deleteProjectById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);

    try {
      const deletedProject = await prisma.projects.delete({
        where: { id },
      });

      sendResponse(res, {
        message: 'Project deleted successfully!',
        data: deletedProject,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
    }
  }
);

const modifyProjectById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, thumbnailUrl, features, liveUrl, projectUrl } = req.body;
    const id = Number(req.params.id);

    if (!name || !description || !features || !Array.isArray(features) || features.length === 0 || !liveUrl || !projectUrl) {
      sendResponse(res, {
        data: null,
        message: 'Required post field(s) missing or invalid',
        statusCode: 400,
      });
      return;
    }

    try {
      const updatedProject = await prisma.projects.update({
        where: { id },
        data: {
          name: String(name),
          description: String(description),
          features: features.map((item: any) => String(item)),
          thumbnailUrl: thumbnailUrl ? String(thumbnailUrl) : null,
          liveUrl: String(liveUrl),
          projectUrl: String(projectUrl),
        },
      });

      sendResponse(res, {
        message: 'Project updated successfully!',
        data: updatedProject,
        statusCode: 200,
      });
    } catch (error) {
      handleServerError(res, error);
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
