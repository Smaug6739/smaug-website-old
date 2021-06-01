"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const config_1 = require("../config");
const discord_js_1 = require("discord.js");
const logsWebhook = new discord_js_1.WebhookClient(config_1.config.logs.webhookId, config_1.config.logs.webhookToken);
const connection = mysql_1.createConnection({
    host: config_1.config.database.host,
    user: config_1.config.database.user,
    password: config_1.config.database.password,
    database: config_1.config.database.database
});
connection.connect(function (err) {
    if (err) {
        console.error('Mysql error connecting: ' + err.stack);
        return;
    }
    console.log('Mysql connected as id: ' + connection.threadId);
    logsWebhook.send('Mysql connected as id: ' + connection.threadId);
});
connection.on('error', function (err) {
    logsWebhook.send(err.code, { code: 'js' });
    logsWebhook.send(err.stack, { code: 'js' });
});
exports.default = connection;
