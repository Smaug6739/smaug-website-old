"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadArchive = exports.downloadImage = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const functions_1 = require("../utils/functions");
function downloadImage(req, res) {
    const file = req.params.file;
    const path = path_1.join(__dirname, `../../public/uploads/projects/images/${file}`);
    if (fs_1.existsSync(path))
        res.download(path);
    else
        res.status(404).json(functions_1.error('File not found.'));
}
exports.downloadImage = downloadImage;
function downloadArchive(req, res) {
    const file = req.params.file;
    const path = path_1.join(__dirname, `../../public/uploads/projects/archives/${file}`);
    if (fs_1.existsSync(path))
        res.download(path);
    else
        res.status(404).json(functions_1.error('File not found.'));
}
exports.downloadArchive = downloadArchive;
