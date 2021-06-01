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
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        logsWebhook.send('Mysql error : PROTOCOL_CONNECTION_LOST. Try reconnecting...')
        connection.connect(function (err) {
            if (err) {
                console.error('Mysql error reconnecting: ' + err.stack);
                logsWebhook.send('Mysql error reconnecting:')
                logsWebhook.send(err.stack, { code: 'js' })
                return;
            }
        })
    } else {
        logsWebhook.send(err.code, { code: 'js' })
        logsWebhook.send(err.stack, { code: 'js' })
    }

});
export default connection;
