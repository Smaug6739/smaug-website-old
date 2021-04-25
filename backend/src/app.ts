import { readdirSync } from 'fs';
import { join } from 'path';

import * as express from 'express';

import { checkAndChange, error } from './utils/functions'
import { Iconfig, IObject } from './types';
const morgan = require('morgan')('dev');
export class App {
    private app;
    public port: number;
    public config: Iconfig;
    constructor(config: Iconfig) {
        this.app = express();
        this.port = config.port;
        this.config = config
        console.log('Starting...')
    }
    private handleRoutes(): void {
        readdirSync(join(__dirname, 'routes')).forEach(dir => {
            const routes = readdirSync(join(__dirname, `routes/${dir}`)).filter(file => file.endsWith('.js'))
            for (const file of routes) {
                const getFileName = require(join(__dirname, `routes/${dir}/${file}`))
                this.app.use(`/api/v${getFileName.infos.version}/${getFileName.infos.route}`, getFileName.infos.router)
                console.log(`Route chargée : /api/v${getFileName.infos.version}/${getFileName.infos.route}`);
            }
        })
    }
    private handleMiddlewares(): void {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(function (req: IObject, res: IObject, next: Function) {
            const origin = req.headers.origin
            console.log(process.env);
            console.log(process.env.ALLOWED_DOMAINS);
            if (process.env.ALLOWED_DOMAINS!.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin)
            } else {
                console.log('Domain unauthorized: ' + origin)
            }
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Access-Control-Allow-Credentials', 'true')
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            next()
        })
        if (process.env.NODE_ENV !== 'production') {
            this.app.use(morgan)
        }
    }
    public start(): void {
        this.handleMiddlewares();
        this.handleRoutes();
        this.app.use(async function (err: Error, req: IObject, res: IObject, next: Function) {
            if (err.message.match('File too large')) return res.json(error('[ERROR_FILE_SIZE] File is too large.'))
            else console.error(err)
        });
        this.app.use('/static', express.static(join(__dirname, '../public')));

        this.app.listen(this.port, () => {
            console.log(`Started on port ${this.port}`)
        })
        this.app.all('*', (req: IObject, res: IObject) => {
            res.status(404).json(checkAndChange(new Error("404 not found")))
        })
    }
}