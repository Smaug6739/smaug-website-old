const marked = require("marked");
const sharp = require('sharp');

import db from '../../models/db';
marked.setOptions({
	renderer: new marked.Renderer(),
	highlight: function (code: string, lang: string) {
		const hljs = require('highlight.js');
		const language = hljs.getLanguage(lang) ? lang : 'plaintext';
		return hljs.highlight(code, { language }).value;
	},
	pedantic: false,
	gfm: true,
	breaks: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	xhtml: false
});
sharp.cache(false);

export default class ResourceClass {
	public get(id: string) {
		return new Promise((resolve, reject) => {
			if (!id) return reject(new Error('[MISSING_ARGUMENT] Resource id must be provided'))
			db.query('SELECT * FROM resources WHERE id = ? LIMIT 1', [id], (err, result) => {
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
			db.query('SELECT * FROM resources ORDER BY `date_insert` DESC LIMIT 9 OFFSET ?', [skip], (err, result) => {
				if (err) return reject(new Error(err.message))
				resolve(result)
			})
		})
	}
	public add(
		name: string,
		category: string,
		description: string,
		content: string,
		author: string,
	): Promise<boolean | Error> {
		return new Promise((resolve, reject) => {
			let orderNumber = 0;
			if (!name) return reject(new Error('[MISSING_ARGUMENT] : name must be provided'));
			if (!category) return reject(new Error('[MISSING_ARGUMENT] : category must be provided'))
			if (!description) return reject(new Error('[MISSING_ARGUMENT] : description must be provided'))
			if (!content) return reject(new Error('[MISSING_ARGUMENT] : content must be provided'))
			if (!author) return reject(new Error('[MISSING_ARGUMENT] : author must be provided'))
			const date_insert = Date.now();
			const contentHTML = marked(content)
			db.query('INSERT INTO resources (`name`, `category`, `description`, `content`, `author`, `date_insert`) VALUES(?,?,?,?,?,?)', [name, category, description, contentHTML, author, date_insert], (err, result) => {
				if (err) return reject(new Error(err.message));
				else resolve(true)
			})
		})
	}
	public put(
		id: string,
		name: string,
		category: string,
		description: string,
		content: string,
		author: string,
	) {
		return new Promise((resolve, reject) => {
			if (!id) return reject(new Error('[MISSING_ARGUMENT] : id must be provided'))
			db.query('SELECT * FROM resources WHERE id = ? LIMIT 1', [id], (err, result) => {
				if (err) return reject(new Error(err.message))
				if (!result || !result.length) return reject(new Error('[ERROR] : Invalid id'))
				else {
					if (!name) name = result[0].name
					if (!category) category = result[0].category
					if (!description) description = result[0].description
					if (!content) content = result[0].content
					if (!author) content = result[0].author
					const contentHTML = marked(content)
					db.query('UPDATE resources SET name=?, category=?, description=?, content=?, author=? WHERE id = ?', [name, category, description, contentHTML, author, id], (err, result) => {
						if (err) return reject(new Error(err.message))
						resolve(true)
					})
				}
			})
		})
	}
	public delete(id: string) {
		return new Promise((resolve, reject) => {
			if (!id) return reject(new Error('[MISSING_ARGUMENT] : id must be provided'))
			db.query('DELETE FROM resources WHERE id = ?', [id], (err, r) => {
				if (err) return reject(new Error(err.message))
				else resolve(true)
			})
		})
	}

}