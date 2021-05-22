"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const marked = require("marked");
const sharp = require('sharp');
const fs_1 = require("fs");
const path_1 = require("path");
const db_1 = __importDefault(require("../../models/db"));
const { Paginator } = require('array-paginator');
marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function (code, lang) {
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
class ProjectClass {
    constructor() {
        db_1.default.query('SELECT * FROM projects ORDER BY `order` DESC', (err, result) => {
            if (!err)
                this.pager = new Paginator(result, 9);
        });
    }
    get(id) {
        return new Promise((resolve, reject) => {
            if (!id)
                return reject(new Error('[MISSING_ARGUMENT] Project id must be provided'));
            db_1.default.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [id], (err, result) => {
                if (err)
                    return reject(new Error(err.message));
                resolve(result[0]);
            });
        });
    }
    getAll(page) {
        return new Promise((resolve, reject) => {
            if (!page)
                return reject(new Error('[MISSING_ARGUMENT] Page must be provided'));
            const pageNumber = parseInt(page);
            const skip = (pageNumber * 9) - 9;
            db_1.default.query('SELECT * FROM projects ORDER BY `order` DESC LIMIT 9 OFFSET ?', [skip], (err, result) => {
                if (err)
                    return reject(new Error(err.message));
                resolve(result);
                console.log(result);
            });
        });
        /*return new Promise((resolve, reject) => {
            if (!page) return reject(new Error('[MISSING_ARGUMENT] Page must be provided'))
            return resolve(this.pager.page(parseInt(page)))
        })*/
    }
    add(name, order, version, description, content, category, image, github, bugs, link, license, source_code) {
        return new Promise((resolve, reject) => {
            let orderNumber = 0;
            if (!name)
                return reject(new Error('[MISSING_ARGUMENT] : name must be provided'));
            if (order)
                orderNumber = parseInt(order);
            if (!version)
                return reject(new Error('[MISSING_ARGUMENT] : version must be provided'));
            if (!description)
                return reject(new Error('[MISSING_ARGUMENT] : description must be provided'));
            if (!content)
                return reject(new Error('[MISSING_ARGUMENT] : content must be provided'));
            if (!image)
                image = 'default.png';
            if (!github)
                github = '';
            if (!bugs)
                bugs = '';
            if (!link)
                link = '';
            if (!license)
                license = '';
            if (!source_code)
                source_code = '';
            const date_insert = Date.now();
            const contentHTML = marked(content);
            if (image) {
                sharp(path_1.join(__dirname, `../../../public/uploads/projects/images/${image}`))
                    .resize(200, 200)
                    .toFile(path_1.join(__dirname, `../../../public/uploads/projects/images/${image}.webp`), (err, info) => {
                    if (err)
                        return reject(new Error('sharp error'));
                    else {
                        const oldImagePath = path_1.join(__dirname, `../../../public/uploads/projects/images/${image}`);
                        fs_1.stat(oldImagePath, (err, info) => {
                            if (info)
                                fs_1.unlink(path_1.join(__dirname, `../../../public/uploads/projects/images/${image}`), (e) => { if (e) {
                                    console.log(e);
                                } });
                            image += '.webp';
                            db_1.default.query('INSERT INTO projects  (`name`, `order`, `version`, `description`, `content`, `category`, `image`, `github`, `bugs`, `link`, `license`, `source_code`, `date_insert`) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [name, orderNumber, version, description, contentHTML, category, image, github, bugs, link, license, source_code, date_insert], (err, result) => {
                                if (err)
                                    return reject(new Error(err.message));
                                resolve(true);
                            });
                        });
                    }
                });
            }
        });
    }
    put(id, name, order, version, description, content, category, image, github, bugs, link, license, source_code) {
        return new Promise((resolve, reject) => {
            if (!id)
                return reject(new Error('[MISSING_ARGUMENT] : id must be provided'));
            db_1.default.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [id], (err, result) => {
                if (err)
                    return reject(new Error(err.message));
                else {
                    let orderNumber = 0;
                    if (!name)
                        name = result[0].name;
                    if (!order)
                        orderNumber = result[0].order;
                    if (order)
                        orderNumber = parseInt(order);
                    if (!version)
                        version = result[0].version;
                    if (!description)
                        description = result[0].description;
                    if (!content)
                        content = result[0].content;
                    if (!category)
                        category = result[0].category;
                    if (!image)
                        image = result[0].image;
                    if (!github)
                        github = result[0].github;
                    if (!bugs)
                        bugs = result[0].bugs;
                    if (!link)
                        link = result[0].link;
                    if (!license)
                        license = result[0].license;
                    if (!source_code)
                        source_code = result[0].source_code;
                    const contentHTML = marked(content);
                    if (image) {
                        sharp(path_1.join(__dirname, `../../../public/uploads/projects/images/${image}`))
                            .resize(200, 200)
                            .toFile(path_1.join(__dirname, `../../../public/uploads/projects/images/${image}.webp`), (err, info) => {
                            if (err)
                                return reject(new Error('sharp error'));
                            else {
                                const oldImagePath = path_1.join(__dirname, `../../../public/uploads/projects/images/${image}`);
                                fs_1.stat(oldImagePath, (err, info) => {
                                    if (info)
                                        fs_1.unlink(path_1.join(__dirname, `../../../public/uploads/projects/images/${image}`), (e) => { if (e) {
                                            console.log(e);
                                        } });
                                    image += '.webp';
                                    db_1.default.query('UPDATE projects SET `name`=?, `order`=?, `version`=?, `description`=?,`content`=?,`category`=?, `image`=?, `github`=?, `bugs`=?, `link`=?, `license`=?, `source_code`=? WHERE id = ?', [name, orderNumber, version, description, contentHTML, category, image, github, bugs, link, license, source_code, result[0].id], (err, r) => {
                                        if (err)
                                            return reject(new Error(err.message));
                                        resolve({
                                            oldImage: result[0].image,
                                            oldArchive: result[0].source_code
                                        });
                                    });
                                });
                            }
                        });
                    }
                }
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            if (!id)
                return reject(new Error('[MISSING_ARGUMENT] : id must be provided'));
            db_1.default.query('SELECT * FROM projects WHERE id = ? LIMIT 1', [id], (err, result) => {
                if (err)
                    return reject(new Error(err.message));
                else {
                    db_1.default.query('DELETE FROM projects WHERE id = ?', [id], (err, r) => {
                        if (err)
                            return reject(new Error(err.message));
                        else
                            resolve({
                                oldImage: result[0].image,
                                oldArchive: result[0].source_code
                            });
                    });
                }
            });
        });
    }
}
exports.default = ProjectClass;
