"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.update = exports.add = exports.getProject = exports.getProjects = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const project_1 = __importDefault(require("../assets/classes/project"));
const functions_1 = require("../utils/functions");
const Projects = new project_1.default();
function getProjects(req, res) {
    Projects.getAll(req.params.page)
        .then((result) => res.status(200).json(functions_1.success(result)))
        .catch((err) => res.json(functions_1.error(err.message)));
}
exports.getProjects = getProjects;
function getProject(req, res) {
    Projects.get(req.params.projectId)
        .then((result) => res.status(200).json(functions_1.success(result)))
        .catch((err) => res.json(functions_1.error(err.message)));
}
exports.getProject = getProject;
function add(req, res) {
    let miniature = '';
    let source_code = '';
    if (req.files && req.files.miniature)
        miniature = req.files.miniature[0].filename;
    if (req.files && req.files.source)
        source_code = req.files.source[0].filename;
    Projects.add(req.body.name, req.body.order, req.body.version, req.body.description, req.body.content, req.body.category, miniature, req.body.github, req.body.bugs, req.body.link, req.body.license, source_code)
        .then(() => res.status(201).json(functions_1.success('success')))
        .catch((err) => {
        console.log(err);
        if (miniature)
            fs_1.unlink(path_1.join(__dirname, `../../public/uploads/projects/images/${miniature}`), (e) => { if (e) {
                console.log(e);
            } });
        if (source_code)
            fs_1.unlink(path_1.join(__dirname, `../../public/uploads/projects/archives/${source_code}`), (e) => { if (e) {
                console.log(e);
            } });
        res.json(functions_1.error(err.message));
    });
}
exports.add = add;
function update(req, res) {
    let miniature = '';
    let source_code = '';
    if (req.files && req.files.miniature)
        miniature = req.files.miniature[0].filename;
    if (req.files && req.files.source)
        source_code = req.files.source[0].filename;
    Projects.put(req.params.projectId, req.body.name, req.body.order, req.body.version, req.body.description, req.body.content, req.body.category, miniature, req.body.github, req.body.bugs, req.body.link, req.body.license, source_code)
        .then((result) => {
        res.status(200).json(functions_1.success('success'));
        if (miniature && result.oldImage)
            fs_1.unlink(path_1.join(__dirname, `../../public/uploads/projects/images/${result.oldImage}`), (e) => { if (e) {
                console.log(e);
            } });
        if (source_code && result.oldArchive)
            fs_1.unlink(path_1.join(__dirname, `../../public/uploads/projects/archives/${result.oldArchive}`), (e) => { if (e) {
                console.log(e);
            } });
    })
        .catch((err) => {
        if (miniature)
            fs_1.unlink(path_1.join(__dirname, `../../public/uploads/projects/images/${miniature}`), (e) => { if (e) {
                console.log(e);
            } });
        if (source_code)
            fs_1.unlink(path_1.join(__dirname, `../../public/uploads/projects/archives/${source_code}`), (e) => { if (e) {
                console.log(e);
            } });
        res.json(functions_1.error(err.message));
    });
}
exports.update = update;
function deleteProject(req, res) {
    Projects.delete(req.params.projectId)
        .then((result) => {
        res.status(200).json(functions_1.success('success'));
        if (result.oldImage)
            fs_1.unlink(path_1.join(__dirname, `../../public/uploads/projects/images/${result.oldImage}`), (e) => { if (e) {
                console.log(e);
            } });
        if (result.oldArchive)
            fs_1.unlink(path_1.join(__dirname, `../../public/uploads/projects/archives/${result.oldArchive}`), (e) => { if (e) {
                console.log(e);
            } });
    })
        .catch((err) => {
        res.json(functions_1.error(err.message));
    });
}
exports.deleteProject = deleteProject;
