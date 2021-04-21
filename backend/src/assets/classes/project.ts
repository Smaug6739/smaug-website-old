import db from '../../models/db';

export default class ProjectClass {
	public getProject(projectId: string) {
		return new Promise((resolve, reject) => {
			if (!projectId) return reject(new Error('Project id must be provided'))
			db.query('SELECT * FROM projects WHERE id = ? LIMIT = 1', [projectId], (err, result) => {
				if (err) return reject(new Error(err.message))
				resolve(result)
			})
		})
	}
	public getProjects(page: string) {
		return new Promise((resolve, reject) => {

		})
	}
	public add(
		name: string,
		version: string,
		description: string,
		categorie?: string,
		image?: string,
		github?: string,
		bugs?: string,
		link?: string,
		license?: string,
		source_code?: string
	): Promise<boolean | Error> {
		return new Promise((resolve, reject) => {
			let categorieNumber = 0;
			if (!name) return reject(new Error('MISSING_ARGUMENT : name must be provided'))
			if (!version) return reject(new Error('MISSING_ARGUMENT : version must be provided'))
			if (!description) return reject(new Error('MISSING_ARGUMENT : description must be provided'))
			if (!image) image = 'default.png'
			if (categorie) categorieNumber = parseInt(categorie)
			else categorieNumber = 0
			if (!github) github = ''
			if (!bugs) bugs = ''
			if (!link) link = ''
			if (!license) license = ''
			if (!source_code) source_code = '';
			const date_insert = Date.now()
			db.query('INSERT INTO projects  (`name`, `version`, `description`, `categorie`, `image`, `github`, `bugs`, `link`, `license`, `source_code`, `date_insert`) VALUES(?,?,?,?,?,?,?,?,?,?,?)', [name, version, description, categorieNumber, image, github, bugs, link, license, source_code, date_insert], (err, result) => {
				if (err) console.log(err);

				//if (err) return reject(new Error(err.message))
				resolve(true)
			})
		})
	}
}