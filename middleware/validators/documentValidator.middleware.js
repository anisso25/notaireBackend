const { body, oneOf } = require('express-validator');

const { Category: CategoryModel } = require('../../models');

exports.createDocumentSchema = [
	body('CategoryId')
		.exists()
		.withMessage('CategoryId is required')
		.bail()
		.custom(async (CategoryId) => {
			await CategoryModel.findByPk(CategoryId).then((category) => {
				if (!category) return Promise.reject('Category not found');
			});
		}),
];

exports.updateDocumentSchema = [
	body('reference')
		.optional()
		.isLength({ min: 1 })
		.withMessage('Must be at least 1 char long'),
	body('date')
		.optional()
		.isDate({ format: 'YYYY-MM-DD', strictMode: true })
		.withMessage('Invalid Date'),

	body('addResource')
		.optional()
		.isObject()
		.withMessage('addResource should be an object'),

	body('addResource.TemplateEntityId')
		.if(body('addResource').exists())
		.if((value, { req }) => req.body.addResource.isRoot)
		.exists()
		.withMessage('TemplateEntityId is required')
		.isInt()
		.withMessage('Invalid TemplateEntity id'),

	body('addResource.InstanceId')
		.if(body('addResource').exists())
		.if((value, { req }) => req.body.addResource.isRoot)
		.exists()
		.withMessage('InstanceId is required')
		.isInt()
		.withMessage('Invalid Instance id'),

	body('addResource.InstanceRelationshipId')
		.if(body('addResource').exists())
		.if((value, { req }) => !req.body.addResource.isRoot)
		.exists()
		.withMessage('InstanceRelationshipId is required')
		.isInt()
		.withMessage('Invalid InstanceRelationship id'),

	body('addResource.DocumentInstanceId')
		.if(body('addResource').exists())
		.if(
			(value, { req }) =>
				!req.body.addResource.isRoot && req.body.addResource.parentIsRoot
		)
		.exists()
		.withMessage('DocumentInstanceId is required')
		.isInt()
		.withMessage('Invalid DocumentInstance id'),

	body('addResource.ParentId')
		.if(body('addResource').exists())
		.if(
			(value, { req }) =>
				!req.body.addResource.isRoot && !req.body.addResource.parentIsRoot
		)
		.exists()
		.withMessage('ParentId is required')
		.isInt()
		.withMessage('Invalid Parent id'),

	body('deleteResource')
		.optional()
		.isObject()
		.withMessage('deleteResource should be an object'),

	body('deleteResource.id')
		.if(body('deleteResource').exists())
		.exists()
		.withMessage('id is required')
		.isInt()
		.withMessage('Invalid id'),

	body('editDocumentInputText')
		.optional()
		.isObject()
		.withMessage('Invalid Edit InputText object'),
	body('editDocumentInputText.id')
		.if(body('editDocumentInputText').exists())
		.exists()
		.withMessage('InputText id is required')
		.isInt()
		.withMessage('Invalid InputText id'),
	body('editDocumentInputText.value')
		.optional({ nullable: true })
		.isString()
		.withMessage('Invalid Text'),

	body()
		.custom((value) => {
			return !!Object.keys(value).length;
		})
		.withMessage('Please provide any field to update')
		.custom((value) => {
			const updates = Object.keys(value);
			const allowUpdates = [
				'reference',
				'date',
				'addResource',
				'deleteResource',
				'editDocumentInputText',
			];
			return updates.every((update) => allowUpdates.includes(update));
		})
		.withMessage('Invalid request!'),
];
