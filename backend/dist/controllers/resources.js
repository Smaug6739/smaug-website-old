"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResource = exports.update = exports.add = exports.getResource = exports.getResources = void 0;
const resources_1 = __importDefault(require("../assets/classes/resources"));
const functions_1 = require("../utils/functions");
const Resources = new resources_1.default();
function getResources(req, res) {
    Resources.getAll(req.params.page)
        .then((result) => res.status(201).json(functions_1.success(result)))
        .catch((err) => res.json(functions_1.error(err.message)));
}
exports.getResources = getResources;
function getResource(req, res) {
    Resources.get(req.params.resourceId)
        .then((result) => res.status(201).json(functions_1.success(result)))
        .catch((err) => res.json(functions_1.error(err.message)));
}
exports.getResource = getResource;
function add(req, res) {
    Resources.add(req.body.name, req.body.category, req.body.description, req.body.content, req.body.author)
        .then(() => res.status(201).json(functions_1.success('success')))
        .catch((err) => res.json(functions_1.error(err.message)));
}
exports.add = add;
function update(req, res) {
    let miniature = '';
    let source_code = '';
    if (req.files && req.files.miniature)
        miniature = req.files.miniature[0].filename;
    if (req.files && req.files.source)
        source_code = req.files.source[0].filename;
    Resources.put(req.params.resourceId, req.body.name, req.body.category, req.body.description, req.body.content, req.body.author)
        .then(() => res.status(201).json(functions_1.success('success')))
        .catch((err) => res.json(functions_1.error(err.message)));
}
exports.update = update;
function deleteResource(req, res) {
    Resources.delete(req.params.resourceId)
        .then(() => res.status(201).json(functions_1.success('success')))
        .catch((err) => res.json(functions_1.error(err.message)));
}
exports.deleteResource = deleteResource;
