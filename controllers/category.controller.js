const { Category: CategoryModel } = require('../models');
const { Op } = require('sequelize');

const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');

const {
	directories: ResourceDirectories,
	urls: ResourceUrls,
} = require('../utils/tool.utils');
const path = require('path');
const fs = require('fs');

/******************************************************************************
 *                              Category Controller
 ******************************************************************************/
class CategoryController {
	getAllCategories = async (req, res, next) => {
		let { orderBy, orderDir, page, perPage, search } = req.query;

		orderBy =
			orderBy && ['name', 'createdAt'].includes(orderBy)
				? orderBy
				: 'createdAt';
		orderDir =
			orderDir && ['desc', 'asc'].includes(orderDir.toLowerCase())
				? orderDir
				: 'desc';
		perPage =
			perPage != undefined && perPage != '' && !isNaN(perPage)
				? parseInt(perPage)
				: 10;
		page = page != undefined && page != '' && !isNaN(page) ? parseInt(page) : 1;

		let where = {};
		if (search) where['name'] = { [Op.like]: `%${search.trim()}%` };

		let categories = await CategoryModel.findAndCountAll({
				where,
				order: [[orderBy, orderDir]],
				offset: (page - 1) * perPage,
				limit: perPage,
				distinct: true,
			}).catch((e) => next(e)),
			count = categories.count;

		return res.status(200).send({
			success: true,
			categories: {
				totalRows: count,
				totalPages: Math.ceil(count / perPage),
				currentPage: page,
				rows: categories.rows.map((category) => {
					return this.formatCategoryObject(category);
				}),
			},
		});
	};

	saveIcon = async (file) => {
		let filename = Date.now() + '-' + file.originalname;
		fs.writeFileSync(
			path.resolve(ResourceDirectories.category_icon, filename),
			file.buffer
		);
		return filename;
	};

	createCategory = async (req, res, next) => {
		this.checkValidation(req);

		req.body.icon = await this.saveIcon(req.file);
		let category = await CategoryModel.create(req.body).catch((e) => next(e));

		if (!category) throw new HttpException(500, 'Something went wrong!');

		return res.send({
			success: true,
			message: 'Category was created.',
			category: this.formatCategoryObject(category),
		});
	};

	updateCategory = async (req, res, next) => {
		this.checkValidation(req);

		let category = await CategoryModel.findByPk(req.params.id).catch((e) =>
			next(e)
		);

		if (!category)
			return res
				.status(404)
				.send({ success: false, message: 'Category not found!' });

		if (req.file != undefined) {
			req.body.icon = await this.saveIcon(req.file);
			if (category.icon) {
				let icon_path = path.resolve(
					ResourceDirectories.category_icon,
					category.icon
				);
				fs.unlink(icon_path, (err) => {
					if (err) console.log('File not found: ' + icon_path);
				});
			}
		}
		Object.assign(category, req.body);
		await category.save();

		return res.status(200).send({
			success: true,
			message: 'Category updated successfully.',
			category: this.formatCategoryObject(category),
		});
	};

	deleteCategory = async (req, res, next) => {
		let category = await CategoryModel.findByPk(req.params.id).catch((e) =>
			next(e)
		);

		if (!category)
			return res
				.status(404)
				.send({ success: false, message: 'Category not found!' });

		if (category.icon) {
			let icon_path = path.resolve(
				ResourceDirectories.category_icon,
				category.icon
			);

			fs.unlink(icon_path, (err) => {
				if (err) console.log('File not found: ' + icon_path);
			});
		}

		category.destroy().catch((e) => next(e));

		return res
			.status(200)
			.send({ success: true, message: 'Category has been deleted.' });
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};

	formatCategoryObject = (category) => {
		let icon = new RegExp(/https?:\/\//).test(category.icon)
			? category.icon
			: `${ResourceUrls.category_icon}/${category.icon}`;
		return {
			id: category.id,
			name: category.name,
			icon: icon,
		};
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new CategoryController();
