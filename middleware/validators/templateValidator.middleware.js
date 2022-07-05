const { body } = require('express-validator');
const { Category: CategoryModel } = require('../../models');

exports.createTemplateSchema = [
	body('CategoryId')
		.exists()
		.withMessage('CategoryId is required')
		.custom(async (CategoryId) => {
			await CategoryModel.findByPk(CategoryId).then((category) => {
				if (!category) return Promise.reject('Category not found');
			});
		}),
];

exports.updateTemplateSchema = [
	body('isPublished')
		.optional()
		.isBoolean()
		.withMessage('Invalid is Published value'),
	body('content').optional(),
	body('TemplateResources')
		.optional()
		.isArray()
		.notEmpty()
		.withMessage('Template Resources should be an array'),
	body('TemplateResources.*.name')
		.exists()
		.withMessage('Template Resources name is required'),
	body('TemplateResources.*.content')
		.exists()
		.withMessage('Template Resources content is required'),
	body('TemplateResources.*.tag')
		.optional()
		.isObject()
		.bail()
		.withMessage('Tag Must be an object')
		.custom((value) => {
			const values = Object.keys(value);
			const requiredFields = ['tagName', 'singular', 'dual', 'plural'];
			return (
				values.length == requiredFields.length &&
				values.sort().toString() == requiredFields.sort().toString()
			);
		})
		.withMessage('Invalid Tag request!'),
];
