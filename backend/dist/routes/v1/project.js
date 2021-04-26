"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infos = void 0;
const express_1 = require("express");
const ProjectsCtrl = require("../../controllers/project");
const multerProject = require('../../middlewares/multer.project');
const auth_1 = require("../../middlewares/auth");
const ProjectsRouter = express_1.Router();
ProjectsRouter.get('/all/:page', ProjectsCtrl.getProjects);
ProjectsRouter.get('/:projectId', ProjectsCtrl.getProject);
ProjectsRouter.post('/', auth_1.default, multerProject, ProjectsCtrl.add);
ProjectsRouter.patch('/:projectId', auth_1.default, multerProject, ProjectsCtrl.update);
ProjectsRouter.delete('/:projectId', auth_1.default, ProjectsCtrl.deleteProject);
exports.infos = {
    route: "project",
    version: 1,
    router: ProjectsRouter
};
