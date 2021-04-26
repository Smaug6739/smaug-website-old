"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
const functions_1 = require("../utils/functions");
exports.default = (req, res, next) => {
    try {
        var cookies = req.headers.cookie;
        if (cookies) {
            req.cookies = cookies.split(';').reduce((obj, c) => {
                var n = c.trim().split("=");
                obj[n[0]] = n[1].trim();
                return obj;
            }, {});
        }
        if (!req.cookies)
            throw 'Missing cookies';
        if (!req.cookies.user_token)
            throw 'Missing token cookie.';
        if (!req.cookies.user_id)
            throw 'Missing token cookie.';
        const decoded = jsonwebtoken_1.verify(req.cookies.user_token, config_1.config.secret);
        if (req.cookies.user_id != decoded.userId)
            throw 'Bad user';
        next();
    }
    catch (err) {
        return res.status(401).json(functions_1.error('Requete non authentifiée'));
    }
};
