import { unlink } from 'fs'
import { join } from 'path'
import ProjectClass from '../assets/classes/project';
import { IObject } from '../types';
import { checkAndChange, error, success } from '../utils/functions';
const Projects = new ProjectClass();

export function getProjects(req: IObject, res: IObject): void {
	Projects.getAll(req.params.page)
		.then((result: any) => res.status(201).json(success(result)))
		.catch((err: Error) => res.json(error(err.message)))
}
export function getProject(req: IObject, res: IObject): void {
	Projects.get(req.params.projectId)
		.then((result: any) => res.status(201).json(success(result)))
		.catch((err: Error) => res.json(error(err.message)))
}
export function add(req: IObject, res: IObject): void {
	let miniature = ''
	let source_code = ''
	if (req.files && req.files.miniature) miniature = req.files.miniature[0].filename
	if (req.files && req.files.source) source_code = req.files.source[0].filename
	Projects.add(
		req.body.name,
		req.body.order,
		req.body.version,
		req.body.description,
		req.body.content,
		req.body.category,
		miniature,
		req.body.github,
		req.body.bugs,
		req.body.link,
		req.body.license,
		source_code
	)
		.then(() => res.status(201).json(success('success')))
		.catch((err) => {
			console.log(err)
			if (miniature) unlink(join(__dirname, `../../public/uploads/projects/images/${miniature}`), (e) => { if (e) { console.log(e) } })
			if (source_code) unlink(join(__dirname, `../../public/uploads/projects/archives/${source_code}`), (e) => { if (e) { console.log(e) } })
			res.json(error(err.message))
		})

}

export function update(req: IObject, res: IObject) {
	let miniature = ''
	let source_code = ''
	if (req.files && req.files.miniature) miniature = req.files.miniature[0].filename
	if (req.files && req.files.source) source_code = req.files.source[0].filename
	Projects.put(
		req.params.projectId,
		req.body.name,
		req.body.order,
		req.body.version,
		req.body.description,
		req.body.content,
		req.body.category,
		miniature,
		req.body.github,
		req.body.bugs,
		req.body.link,
		req.body.license,
		source_code
	)
		.then((result: any) => {
			res.status(201).json(success('success'))
			if (miniature && result.oldImage) unlink(join(__dirname, `../../public/uploads/projects/images/${result.oldImage}`), (e) => { if (e) { console.log(e) } })
			if (source_code && result.oldArchive) unlink(join(__dirname, `../../public/uploads/projects/archives/${result.oldArchive}`), (e) => { if (e) { console.log(e) } })
		})
		.catch((err) => {
			if (miniature) unlink(join(__dirname, `../../public/uploads/projects/images/${miniature}`), (e) => { if (e) { console.log(e) } })
			if (source_code) unlink(join(__dirname, `../../public/uploads/projects/archives/${source_code}`), (e) => { if (e) { console.log(e) } })
			res.json(error(err.message))
		})
}

export function deleteProject(req: IObject, res: IObject) {
	Projects.delete(req.params.projectId)
		.then((result: any) => {
			res.status(201).json(success('success'))
			if (result.oldImage) unlink(join(__dirname, `../../public/uploads/projects/images/${result.oldImage}`), (e) => { if (e) { console.log(e) } })
			if (result.oldArchive) unlink(join(__dirname, `../../public/uploads/projects/archives/${result.oldArchive}`), (e) => { if (e) { console.log(e) } })
		})
		.catch((err: Error) => {
			res.json(error(err.message))
		})
}