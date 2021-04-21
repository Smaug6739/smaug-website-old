import { Router } from 'express';
import * as ProjectsCtrl from '../../controllers/project';
import { Iroute } from '../../types';
const multerProject = require('../../middlewares/multer.project')
import authMid from '../../middlewares/auth'
const ProjectsRouter: Router = Router();

ProjectsRouter.post('/add', authMid, multerProject, ProjectsCtrl.add)

export const infos: Iroute = {
	route: "project",
	version: 1,
	router: ProjectsRouter
};