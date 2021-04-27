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
const ResourcesCtrl = __importStar(require("../../controllers/resources"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const ResourceRouter = express_1.Router();
ResourceRouter.get('/all/:page', ResourcesCtrl.getResources);
ResourceRouter.get('/:resourceId', ResourcesCtrl.getResource);
ResourceRouter.post('/', auth_1.default, ResourcesCtrl.add);
ResourceRouter.patch('/:resourceId', auth_1.default, ResourcesCtrl.update);
ResourceRouter.delete('/:resourceId', auth_1.default, ResourcesCtrl.deleteResource);
exports.infos = {
    route: "resources",
    version: 1,
    router: ResourceRouter
};
