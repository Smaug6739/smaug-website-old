import { createConnection, MysqlError } from 'mysql';
import { config } from '../config';
import { WebhookClient } from "discord.js"
const logsWebhook = new WebhookClient(config.logs.webhookId, config.logs.webhookToken)
const connection = createConnection({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.database
})
connection.connect(function (err: MysqlError) {
    if (err) {
        console.error('Mysql error connecting: ' + err.stack);
        return;
    }
    console.log('Mysql connected as id: ' + connection.threadId);
    logsWebhook.send('Mysql connected as id: ' + connection.threadId)
});
connection.on('error', function (err) {
    logsWebhook.send(err.code, { code: 'js' })
    logsWebhook.send(err.stack, { code: 'js' })
});
export default connection;
