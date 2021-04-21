import { Router } from 'express';
import * as AuthCtrl from '../../controllers/auth';
import { Iroute } from '../../types';
const AuthRouter: Router = Router();

AuthRouter.post('/', AuthCtrl.auth)

export const infos: Iroute = {
    route: "auth",
    version: 1,
    router: AuthRouter
};