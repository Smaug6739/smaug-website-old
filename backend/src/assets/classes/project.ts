import db from '../../models/db';

export default class ProjectClass {
	public get(id: string) {
		return new Promise((resolve, reject) => {
			if (!id) return reject(new Error('[MISSING_ARGUMENT] Project id must be provided'))
			db.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [id], (err, result) => {
				if (err) return reject(new Error(err.message))
				resolve(result[0])
			})
		})
	}
	public getAll(page: string) {
		return new Promise((resolve, reject) => {
			if (!page) return reject(new Error('[MISSING_ARGUMENT] Page must be provided'))
			const pageNumber = parseInt(page)
			const skip = (pageNumber * 9) - 9
			db.query('SELECT * FROM projects LIMIT 9 OFFSET ?', [skip], (err, result) => {
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
		order: string,
		version: string,
		description: string,
		content: string,
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
			let orderNumber = 0;
			if (!name) return reject(new Error('[MISSING_ARGUMENT] : name must be provided'))
			if (order) orderNumber = parseInt(order)
			if (!version) return reject(new Error('[MISSING_ARGUMENT] : version must be provided'))
			if (!description) return reject(new Error('[MISSING_ARGUMENT] : description must be provided'))
			if (!content) return reject(new Error('[MISSING_ARGUMENT] : content must be provided'))
			if (!image) image = 'default.png'
			if (categorie) categorieNumber = parseInt(categorie)
			if (!github) github = ''
			if (!bugs) bugs = ''
			if (!link) link = ''
			if (!license) license = ''
			if (!source_code) source_code = '';
			const date_insert = Date.now()
			db.query('INSERT INTO projects  (`name`, `order`, `version`, `description`, `content`, `categorie`, `image`, `github`, `bugs`, `link`, `license`, `source_code`, `date_insert`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [name, orderNumber, version, description, content, categorieNumber, image, github, bugs, link, license, source_code, date_insert], (err, result) => {
				if (err) return reject(new Error(err.message))
				resolve(true)
			})
		})
	}
	public put(
		id: string,
		name: string,
		order: string,
		version: string,
		description: string,
		content: string,
		categorie?: string,
		image?: string,
		github?: string,
		bugs?: string,
		link?: string,
		license?: string,
		source_code?: string
	) {
		return new Promise((resolve, reject) => {
			if (!id) return reject(new Error('[MISSING_ARGUMENT] : id must be provided'))
			db.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [id], (err, result) => {
				if (err) return reject(new Error(err.message))
				else {
					let orderNumber = 0;
					let categorieNumber = 0;
					if (!name) name = result[0].name
					if (!order) orderNumber = result[0].order
					if (order) orderNumber = parseInt(order)
					if (!version) version = result[0].version
					if (!description) description = result[0].description
					if (!content) content = result[0].content
					if (!categorie) categorieNumber = result[0].categorie
					if (categorie) categorieNumber = parseInt(categorie)
					if (!image) image = result[0].image
					if (!github) github = result[0].github
					if (!bugs) bugs = result[0].bugs
					if (!link) link = result[0].link
					if (!license) license = result[0].license
					if (!source_code) source_code = result[0].source_code
					db.query('UPDATE projects SET `name`=?, `order`=?, `version`=?, `description`=?,`content`=?,`categorie`=?, `image`=?, `github`=?, `bugs`=?, `link`=?, `license`=?, `source_code`=? WHERE id = ?',
						[name, orderNumber, version, description, content, categorieNumber, image, github, bugs, link, license, source_code, result[0].id], (err, r) => {
							if (err) return reject(new Error(err.message))
							resolve({
								oldImage: result[0].image,
								oldArchive: result[0].source_code
							})
						})
				}
			})

		})
	}
	public delete(id: string) {
		return new Promise((resolve, reject) => {
			if (!id) return reject(new Error('[MISSING_ARGUMENT] : id must be provided'))
			db.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [id], (err, result) => {
				if (err) return reject(new Error(err.message))
				else {
					db.query('DELETE FROM projects WHERE id = ?', [id], (err, r) => {
						if (err) return reject(new Error(err.message))
						else resolve({
							oldImage: result[0].images,
							oldArchive: result[0].source_code
						})
					})
				}
			})

		})
	}
}