import { unlink } from 'fs'
import { join } from 'path'
import ProjectClass from '../assets/classes/project';
import { IObject } from '../types';
import { checkAndChange } from '../utils/functions';
import { config } from '../config';
const Projects = new ProjectClass();

export function add(req: IObject, res: IObject): void {
	let miniature = ''
	let source_code = ''
	if (req.files && req.files.miniature.length) miniature = req.files.miniature[0].filename
	if (req.files && req.files.source.length) source_code = req.files.source[0].filename
	Projects.add(
		req.body.name,
		req.body.version,
		req.body.description,
		req.body.categorie,
		miniature,
		req.body.github,
		req.body.bugs,
		req.body.link,
		req.body.license,
		source_code
	)
		.catch(err => {
			if (source_code) unlink(join(__dirname, `../../public/uploads/projects/archives/${source_code}`), (err) => {
				if (err) console.log(err);
			})
			if (source_code) unlink(join(__dirname, `../../public/uploads/projects/images/${miniature}`), (err) => {
				if (err) console.log(err);
			})
		})
}