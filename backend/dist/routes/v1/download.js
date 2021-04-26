"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infos = void 0;
const express_1 = require("express");
const downloadCtrl = require("../../controllers/download");
const DownloadRouter = express_1.Router();
DownloadRouter.get('/image/:file', downloadCtrl.downloadImage);
DownloadRouter.get('/archive/:file', downloadCtrl.downloadArchive);
exports.infos = {
    route: "download",
    version: 1,
    router: DownloadRouter
};
