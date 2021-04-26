"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.infos = void 0;
const express_1 = require("express");
const AuthCtrl = require("../../controllers/auth");
const AuthRouter = express_1.Router();
AuthRouter.post('/', AuthCtrl.auth);
AuthRouter.get('/disconnection', AuthCtrl.disconnection);
exports.infos = {
    route: "auth",
    version: 1,
    router: AuthRouter
};
