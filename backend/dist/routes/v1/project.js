"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infos = void 0;
const express_1 = require("express");
const ProjectsCtrl = __importStar(require("../../controllers/project"));
const multerProject = require('../../middlewares/multer.project');
const auth_1 = __importDefault(require("../../middlewares/auth"));
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
