const { query, body } = require('express-validator');

const {
	Instance: InstanceModel,
	InstanceRelationship: InstanceRelationshipModel,
	Document: DocumentModel,
} = require('../../models');

exports.filenameAttachedFileSchema = [
	query('filename')
		.exists()
		.withMessage('Filename is required')
		.isString()
		.withMessage('Invalid filename')
		.notEmpty()
		.withMessage('Filename must be filled'),
];

exports.addAttachedFileSchema = [
	body('title')
		.exists()
		.withMessage('Title is required')
		.isString()
		.withMessage('Invalid title')
		.notEmpty()
		.withMessage('Title must be filled'),

	body('InstanceId')
		.if(body('InstanceRelationshipId').not().exists())
		.if(body('DocumentId').not().exists())
		.exists()
		.withMessage('InstanceId is required')
		.isInt()
		.withMessage('Invalid Instance id')
		.bail()
		.custom(async (InstanceId, { req }) => {
			await InstanceModel.findOne({
				where: { id: InstanceId, OfficeId: req.currentUser.OfficeId },
			}).then(async (instance) => {
				if (!instance) return Promise.reject('Instance not found!');
			});
		}),

	body('InstanceRelationshipId')
		.if(body('InstanceId').not().exists())
		.if(body('DocumentId').not().exists())
		.exists()
		.withMessage('InstanceRelationshipId is required')
		.isInt()
		.withMessage('Invalid InstanceRelationship id')
		.bail()
		.custom(async (InstanceRelationshipId, { req }) => {
			await InstanceRelationshipModel.findOne({
				where: {
					id: InstanceRelationshipId,
				},
				include: [
					{
						model: InstanceModel,
						as: 'FromInstance',
						paranoid: false,
						where: {
							OfficeId: req.currentUser.OfficeId,
						},
					},
				],
			}).then(async (instanceRelationship) => {
				if (!instanceRelationship)
					return Promise.reject('InstanceRelationship not found!');
			});
		}),

	body('DocumentId')
		.if(body('InstanceId').not().exists())
		.if(body('InstanceRelationshipId').not().exists())
		.exists()
		.withMessage('DocumentId is required')
		.isInt()
		.withMessage('Invalid Document id')
		.bail()
		.custom(async (DocumentId, { req }) => {
			await DocumentModel.findOne({
				where: { id: DocumentId, OfficeId: req.currentUser.OfficeId },
			}).then(async (document) => {
				if (!document) return Promise.reject('Document not found!');
			});
		}),

	body('file').custom((value, { req }) => {
		if (req.file == undefined)
			return Promise.reject('You must select an file.');
		return true;
	}),
];

exports.updateAttachedFileSchema = [
	body('title')
		.exists()
		.withMessage('Title is required')
		.isString()
		.withMessage('Invalid title')
		.notEmpty()
		.withMessage('Title must be filled'),
];
