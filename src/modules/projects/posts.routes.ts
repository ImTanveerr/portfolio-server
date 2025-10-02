import { Router } from 'express';
import { ProjectController } from './projects.controller';

export const projectsRouter = Router();

projectsRouter.post('/create', ProjectController.createProject);
projectsRouter.get('/get/:id', ProjectController.getProjectById);
projectsRouter.get('/get-all', ProjectController.getAllProjects);
projectsRouter.patch('/update/:id', ProjectController.modifyProjectById);
projectsRouter.delete('/delete/:id', ProjectController.deleteProjectById);
