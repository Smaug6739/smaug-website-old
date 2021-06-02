"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const config_1 = require("../config");
const discord_js_1 = require("discord.js");
const logsWebhook = new discord_js_1.WebhookClient(config_1.config.logs.webhookId, config_1.config.logs.webhookToken);
const pool = mysql_1.createPool({
    host: config_1.config.database.host,
    user: config_1.config.database.user,
    password: config_1.config.database.password,
    database: config_1.config.database.database
});
// var getConnection = function (cb: any) {
//     pool.getConnection(function (err, connection) {
//         //if(err) throw err;
//         //pass the error to the cb instead of throwing it
//         if (err) {
//             return cb(err);
//         }
//         cb(null, connection);
//     });
// };
pool.on('acquire', function (connection) {
    console.log('Connection %d acquired', connection.threadId);
    logsWebhook.send(`Connection ${connection.threadId} acquired.`);
});
pool.on('connection', function (conn) {
    conn.on("error", (err) => {
        logsWebhook.send(err);
    });
});
exports.default = pool;
// import { createConnection, MysqlError } from 'mysql';
// import { config } from '../config';
// import { WebhookClient } from "discord.js"
// const logsWebhook = new WebhookClient(config.logs.webhookId, config.logs.webhookToken)
// const connection = createConnection({
//     host: config.database.host,
//     user: config.database.user,
//     password: config.database.password,
//     database: config.database.database
// })
// connection.connect(function (err: MysqlError) {
//     if (err) {
//         console.error('Mysql error connecting: ' + err.stack);
//         return;
//     }
//     console.log('Mysql connected as id: ' + connection.threadId);
//     logsWebhook.send('Mysql connected as id: ' + connection.threadId)
// });
// connection.on('error', function (err) {
//     if (err.code === 'PROTOCOL_CONNECTION_LOST') {
//         logsWebhook.send('Mysql error : PROTOCOL_CONNECTION_LOST. Try reconnecting...')
//         connection.connect(function (err) {
//             if (err) {
//                 console.error('Mysql error reconnecting: ' + err.stack);
//                 logsWebhook.send('Mysql error reconnecting:')
//                 logsWebhook.send(err.stack, { code: 'js' })
//                 return;
//             }
//         })
//     } else {
//         logsWebhook.send(err.code, { code: 'js' })
//         logsWebhook.send(err.stack, { code: 'js' })
//     }
// });
// export default connection;
