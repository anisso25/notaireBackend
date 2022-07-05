const { body } = require('express-validator');
const { Entity: EntityModel } = require('../../models');

const {
	attributeTypes: EntityAttributeTypes,
} = require('../../utils/entityValues.utils');

exports.createEntitySchema = [
	body('ParentId')
		.optional()
		.custom(async (ParentId) => {
			await EntityModel.findByPk(ParentId).then((entity) => {
				if (!entity) return Promise.reject('Entity not found');
				if (!entity.isAbstract)
					return Promise.reject('Parent Entity must be Abstract');
			});
		}),
	body('name')
		.exists()
		.withMessage('name is required')
		.isString()
		.withMessage('Invalid name')
		.isLength({ min: 1 })
		.withMessage('Must be at least 1 chars long'),
	body('isAbstract')
		.exists()
		.withMessage('Is Abstract is required')
		.isBoolean()
		.withMessage('Invalid Is Abstract value'),

	body('Attributes')
		.if((isNotAbstract, { req }) => !req.body.isAbstract)
		.optional()
		.isArray()
		.withMessage('Attributes should be an array'),
	body('Attributes.*.type')
		.if((isNotAbstract, { req }) => !req.body.isAbstract)
		.exists()
		.withMessage('Attribute Type is required')
		.isIn(Object.values(EntityAttributeTypes))
		.withMessage('Invalid Attribute type'),
	body('Attributes.*.name')
		.if((isNotAbstract, { req }) => !req.body.isAbstract)
		.exists()
		.withMessage('Attribute Name is required')
		.isString()
		.withMessage('Invaid attribute name')
		.isLength({ min: 1 })
		.withMessage('Must be at least 1 chars long'),

	body('Relations')
		.if((isNotAbstract, { req }) => !req.body.isAbstract)
		.optional()
		.isArray()
		.withMessage('Relations should be an array'),
	body('Relations.*.FromEntityId')
		.if((isNotAbstract, { req }) => !req.body.isAbstract)
		.optional()
		.custom(async (FromEntityId, { req }) => {
			await EntityModel.findByPk(FromEntityId).then((entity) => {
				if (req.body.ParentId != undefined && req.body.ParentId == FromEntityId)
					return Promise.reject('Cannot add relationship with parent entity');
				if (!entity) return Promise.reject('Entity not found');
			});
		}),
	body('Relations.*.ToEntityId')
		.if((isNotAbstract, { req }) => !req.body.isAbstract)
		.optional()
		.custom(async (ToEntityId, { req }) => {
			await EntityModel.findByPk(ToEntityId).then((entity) => {
				if (req.body.ParentId != undefined && req.body.ParentId == FromEntityId)
					return Promise.reject('Cannot add relationship with parent entity');
				if (!entity) return Promise.reject('Entity not found');
			});
		}),
];

exports.updateEntitySchema = [
	body('name')
		.optional()
		.isString()
		.withMessage('Invalid name')
		.isLength({ min: 1 })
		.withMessage('Must be at least 1 chars long'),
];
