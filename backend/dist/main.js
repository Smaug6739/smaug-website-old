"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const app_1 = require("./app");
const config_1 = require("./config");
const dotenv = require("dotenv");
dotenv.config({
    path: path_1.join(__dirname, '../.env')
});
const server = new app_1.App(config_1.config);
server.start();
