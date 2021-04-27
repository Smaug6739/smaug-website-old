import { Router } from 'express';
import * as ResourcesCtrl from '../../controllers/resources';
import { Iroute } from '../../types';
import authMid from '../../middlewares/auth'
const ResourceRouter: Router = Router();

ResourceRouter.get('/all/:page', ResourcesCtrl.getResources)
ResourceRouter.get('/:resourceId', ResourcesCtrl.getResource)
ResourceRouter.post('/', authMid, ResourcesCtrl.add)
ResourceRouter.patch('/:resourceId', authMid, ResourcesCtrl.update)
ResourceRouter.delete('/:resourceId', authMid, ResourcesCtrl.deleteResource)

export const infos: Iroute = {
	route: "resources",
	version: 1,
	router: ResourceRouter
};