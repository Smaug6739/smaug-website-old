import { Router } from 'express';
import * as ProjectsCtrl from '../../controllers/project';
import { Iroute } from '../../types';
const multerProject = require('../../middlewares/multer.project')
import authMid from '../../middlewares/auth'
const ProjectsRouter: Router = Router();

ProjectsRouter.get('/all/:page', ProjectsCtrl.getProjects)
ProjectsRouter.get('/:projectId', ProjectsCtrl.getProject)
ProjectsRouter.post('/', authMid, multerProject, ProjectsCtrl.add)
ProjectsRouter.patch('/:projectId', authMid, multerProject, ProjectsCtrl.update)
ProjectsRouter.delete('/:projectId', authMid, ProjectsCtrl.deleteProject)

export const infos: Iroute = {
	route: "project",
	version: 1,
	router: ProjectsRouter
};