import ResourcesClass from '../assets/classes/resources';
import { IObject } from '../types';
import { error, success } from '../utils/functions';
const Resources = new ResourcesClass();

export function getResources(req: IObject, res: IObject): void {
	Resources.getAll(req.params.page)
		.then((result: any) => res.status(201).json(success(result)))
		.catch((err: Error) => res.json(error(err.message)))
}
export function getResource(req: IObject, res: IObject): void {
	Resources.get(req.params.resourceId)
		.then((result: any) => res.status(201).json(success(result)))
		.catch((err: Error) => res.json(error(err.message)))
}
export function add(req: IObject, res: IObject): void {
	Resources.add(
		req.body.name,
		req.body.category,
		req.body.description,
		req.body.content,
		req.body.author
	)
		.then(() => res.status(201).json(success('success')))
		.catch((err) => res.json(error(err.message)))
}

export function update(req: IObject, res: IObject) {
	let miniature = ''
	let source_code = ''
	if (req.files && req.files.miniature) miniature = req.files.miniature[0].filename
	if (req.files && req.files.source) source_code = req.files.source[0].filename
	Resources.put(
		req.params.resourceId,
		req.body.name,
		req.body.category,
		req.body.description,
		req.body.content,
		req.body.author
	)
		.then(() => res.status(201).json(success('success')))
		.catch((err) => res.json(error(err.message)))
}

export function deleteResource(req: IObject, res: IObject) {
	Resources.delete(req.params.resourceId)
		.then(() => res.status(201).json(success('success')))
		.catch((err: Error) => res.json(error(err.message)))
}