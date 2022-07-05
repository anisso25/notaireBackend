const { body } = require('express-validator');
const { Category: CategoryModel } = require('../../models');
const { Op } = require('sequelize');

exports.createCategorySchema = [
	body('name')
		.exists()
		.withMessage('Name is required')
		.isString()
		.withMessage('Invalid name')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long')
		.custom(async (name) => {
			await CategoryModel.findOne({
				where: {
					name,
				},
			}).then((category) => {
				if (category) return Promise.reject('Category Already defined');
			});
		}),
	body('icon')
		.custom((value, { req }) => {
			if (req.file == undefined)
				return Promise.reject('You must select an icon.');
			if (
				req.file != undefined &&
				!/image\/(jpeg|jpg|png|gif|svg\+xml)/.test(req.file.mimetype)
			)
				return Promise.reject('Only image are allowed!');
			return true;
		})
		.withMessage('Invalid request!'),
];

exports.updateCategorySchema = [
	body('name')
		.optional()
		.isString()
		.withMessage('Invalid name')
		.isLength({ min: 2 })
		.withMessage('Must be at least 2 chars long')
		.custom(async (name, { req }) => {
			await CategoryModel.findOne({
				where: {
					name,
					id: { [Op.not]: req.params.id },
				},
			}).then((category) => {
				if (category) return Promise.reject('Category Already defined');
			});
		}),
	body('icon')
		.optional()
		.custom((value, { req }) => {
			if (
				req.file != undefined &&
				!/image\/(jpeg|jpg|png|gif|svg\+xml)/.test(req.file.mimetype)
			)
				return Promise.reject('Only image are allowed!');
			return true;
		}),
	body()
		.custom((value) => {
			return !!Object.keys(value).length;
		})
		.withMessage('Please provide any field to update')
		.custom((value) => {
			const updates = Object.keys(value);
			const allowUpdates = ['name', 'icon'];
			return updates.every((update) => allowUpdates.includes(update));
		})
		.withMessage('Invalid request!'),
];
