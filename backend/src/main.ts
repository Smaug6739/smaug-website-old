import { App } from './app';
import { config } from './config';
const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.ALLOWED_DOMAINS);

const server: App = new App(config)
server.start();