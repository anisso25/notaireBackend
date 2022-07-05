const { body, param } = require('express-validator');
const moment = require('moment');
const _ = require('lodash');

const {
	Instance: InstanceModel,
	Entity: EntityModel,
	EntityAttribute: EntityAttributeModel,
	EntityRelationship: EntityRelationshipModel,
	EntityRelationshipAttribute: EntityRelationshipAttributeModel,
	Country: CountryModel,
	Wilaya: WilayaModel,
} = require('../../models');

const {
	attributeTypes: EntityAttributeTypes,
} = require('../../utils/entityValues.utils');

const type_matcher = async (attribute, value) => {
	switch (attribute.type) {
		case EntityAttributeTypes.String:
			return typeof value === 'string' || value instanceof String;
		case EntityAttributeTypes.Enum:
			return attribute.values.includes(value);
		case EntityAttributeTypes.Date:
			return moment(value, 'YYYY-MM-DD', true).isValid();
		case EntityAttributeTypes.Country:
			return (await CountryModel.findByPk(value).catch((e) => e)) != null;
		case EntityAttributeTypes.Wilaya:
			return (await WilayaModel.findByPk(value).catch((e) => e)) != null;
	}
};

exports.createInstanceSchema = [
	body('EntityId')
		.exists()
		.withMessage('EntityId is required')
		.custom(async (EntityId) => {
			await EntityModel.findByPk(EntityId).then((entity) => {
				if (!entity) return Promise.reject('Entity not found');
				else if (entity.isAbstract)
					return Promise.reject(
						'Cannot create an instance of an abstract entity'
					);
			});
		}),
	body('Attributes')
		.optional()
		.isArray()
		.withMessage('Attributes should be an array'),
	body('Attributes.*.EntityAttributeId')
		.exists()
		.withMessage('EntityAttributeId is required')
		.custom(async (value, { req }) => {
			await EntityAttributeModel.findOne({
				where: { EntityId: req.body.EntityId, id: value },
			}).then(async (entityAttribute) => {
				if (!entityAttribute)
					return Promise.reject('Entity Attribute not belonging to Entity');
				let i = req.body.Attributes.findIndex(
					(v) => v.EntityAttributeId == value
				);
				if (i >= 0) {
					let check = await type_matcher(
						entityAttribute,
						req.body.Attributes[i].value
					);
					if (!check)
						return Promise.reject(
							`Type error, value must be of type: '${entityAttribute.type}'`
						);
				}
			});
		}),
	body('Relations')
		.optional()
		.isArray()
		.withMessage('Relations should be an array'),
	body('Relations.*.EntityRelationshipId')
		.exists()
		.withMessage('EntityRelationshipId is required')
		.custom(async (EntityRelationshipId, { req }) => {
			await EntityRelationshipModel.findByPk(EntityRelationshipId).then(
				async (entityRelationship) => {
					if (!entityRelationship)
						return Promise.reject('EntityRelationship not found');

					req.validatorData = {
						...req.validatorData,
						entityRelationships: {
							...req.validatorData?.entityRelationships,
							[entityRelationship.id]: entityRelationship,
						},
					};
				}
			);
		}),
	body('Relations.*.FromInstanceId')
		.optional()
		.custom(async (FromInstanceId, { req, path, location }) => {
			await InstanceModel.findByPk(FromInstanceId).then(
				async (fromInstance) => {
					if (!fromInstance) return Promise.reject('Instance not found');

					const entityRelationshipId = _.get(
							req[location],
							path.replace('FromInstanceId', 'EntityRelationshipId')
						),
						entityRelationships = req.validatorData?.entityRelationships;

					if (
						entityRelationships == undefined ||
						entityRelationships[entityRelationshipId] == undefined ||
						entityRelationships[entityRelationshipId].FromEntityId !=
							fromInstance.EntityId ||
						entityRelationships[entityRelationshipId].ToEntityId !=
							req.body.EntityId
					)
						return Promise.reject(
							'FromInstanceId not compatible with EntityRelationship'
						);
				}
			);
		}),
	body('Relations.*.ToInstanceId')
		.optional()
		.custom(async (ToInstanceId, { req, path, location }) => {
			await InstanceModel.findByPk(ToInstanceId).then(async (toInstance) => {
				if (!toInstance) return Promise.reject('Instance not found');

				const entityRelationshipId = _.get(
						req[location],
						path.replace('ToInstanceId', 'EntityRelationshipId')
					),
					entityRelationships = req.validatorData?.entityRelationships;

				if (
					entityRelationships == undefined ||
					entityRelationships[entityRelationshipId] == undefined ||
					entityRelationships[entityRelationshipId].FromEntityId !=
						req.body.EntityId ||
					entityRelationships[entityRelationshipId].ToEntityId !=
						toInstance.EntityId
				)
					return Promise.reject(
						'ToInstanceId not compatible with EntityRelationship'
					);
			});
		}),

	body('Relations.*.Attributes')
		.optional()
		.isArray()
		.withMessage('Relations Attributes should be an array'),
	body('Relations.*.Attributes.*.EntityRelationshipAttributeId')
		.exists()
		.withMessage('EntityRelationshipAttributeId is required')
		.custom(async (EntityRelationshipAttributeId, { req, path, location }) => {
			await EntityRelationshipAttributeModel.findOne({
				where: {
					EntityRelationshipId: _.get(
						req[location],
						path.split('.Attributes')[0]
					).EntityRelationshipId,
					id: EntityRelationshipAttributeId,
				},
			}).then(async (entityRelationshipAttribute) => {
				if (!entityRelationshipAttribute)
					return Promise.reject(
						'Entity Relationship Attribute not belonging to EntityRelationship'
					);

				let value = _.get(
					req[location],
					path.replace('EntityRelationshipAttributeId', 'value')
				);

				if (value != undefined) {
					let check = await type_matcher(entityRelationshipAttribute, value);
					if (!check)
						return Promise.reject(
							`Type error, value must be of type: '${entityRelationshipAttribute.type}'`
						);
				}
			});
		}),
];

exports.updateInstanceSchema = [
	param('id').custom(async (id, { req }) => {
		let instance = await InstanceModel.findByPk(id);
		if (!instance) return Promise.reject('Instance not found');

		req.validatorData = { ...req.validatorData, instance };
	}),

	body('Attributes')
		.optional()
		.isArray()
		.withMessage('Attributes should be an array'),
	body('Attributes.*.EntityAttributeId')
		.exists()
		.withMessage('EntityAttributeId is required')
		.if((value, { req }) => req.validatorData?.instance != undefined)
		.custom(async (value, { req }) => {
			await EntityAttributeModel.findOne({
				where: { EntityId: req.validatorData.instance.EntityId, id: value },
			}).then(async (entityAttribute) => {
				if (!entityAttribute)
					return Promise.reject('Entity Attribute not belonging to Entity');
				let i = req.body.Attributes.findIndex(
					(v) => v.EntityAttributeId == value
				);
				if (i >= 0) {
					let check = await type_matcher(
						entityAttribute,
						req.body.Attributes[i].value
					);
					if (!check)
						return Promise.reject(
							`Type error, value must be of type: '${entityAttribute.type}'`
						);
				}
			});
		}),
	body('Relations')
		.optional()
		.isArray()
		.withMessage('Relations should be an array'),
	body('Relations.*.EntityRelationshipId')
		.exists()
		.withMessage('EntityRelationshipId is required')
		.custom(async (EntityRelationshipId, { req }) => {
			await EntityRelationshipModel.findByPk(EntityRelationshipId).then(
				async (entityRelationship) => {
					if (!entityRelationship)
						return Promise.reject('EntityRelationship not found');

					req.validatorData = {
						...req.validatorData,
						entityRelationships: {
							...req.validatorData?.entityRelationships,
							[entityRelationship.id]: entityRelationship,
						},
					};
				}
			);
		}),
	body('Relations.*.FromInstanceId')
		.optional()
		.if((value, { req }) => req.validatorData?.instance != undefined)
		.custom(async (FromInstanceId, { req, path, location }) => {
			if (FromInstanceId == req.validatorData.instance.id)
				return Promise.reject('Cannot link an instance to itself');

			await InstanceModel.findByPk(FromInstanceId).then(
				async (fromInstance) => {
					if (!fromInstance) return Promise.reject('Instance not found');

					const entityRelationshipId = _.get(
							req[location],
							path.replace('FromInstanceId', 'EntityRelationshipId')
						),
						entityRelationships = req.validatorData?.entityRelationships;

					if (
						entityRelationships == undefined ||
						entityRelationships[entityRelationshipId] == undefined ||
						entityRelationships[entityRelationshipId].FromEntityId !=
							fromInstance.EntityId ||
						entityRelationships[entityRelationshipId].ToEntityId !=
							req.validatorData.instance.EntityId
					)
						return Promise.reject(
							'FromInstanceId not compatible with EntityRelationship'
						);
				}
			);
		}),
	body('Relations.*.ToInstanceId')
		.optional()
		.if((value, { req }) => req.validatorData?.instance != undefined)
		.custom(async (ToInstanceId, { req, path, location }) => {
			if (ToInstanceId == req.validatorData.instance.id)
				return Promise.reject('Cannot link an instance to itself');

			await InstanceModel.findByPk(ToInstanceId).then(async (toInstance) => {
				if (!toInstance) return Promise.reject('Instance not found');

				const entityRelationshipId = _.get(
						req[location],
						path.replace('ToInstanceId', 'EntityRelationshipId')
					),
					entityRelationships = req.validatorData?.entityRelationships;

				if (
					entityRelationships == undefined ||
					entityRelationships[entityRelationshipId] == undefined ||
					entityRelationships[entityRelationshipId].FromEntityId !=
						req.validatorData.instance.EntityId ||
					entityRelationships[entityRelationshipId].ToEntityId !=
						toInstance.EntityId
				)
					return Promise.reject(
						'ToInstanceId not compatible with EntityRelationship'
					);
			});
		}),

	body('Relations.*.Attributes')
		.optional()
		.isArray()
		.withMessage('Relations Attributes should be an array'),
	body('Relations.*.Attributes.*.EntityRelationshipAttributeId')
		.exists()
		.withMessage('EntityRelationshipAttributeId is required')
		.custom(async (EntityRelationshipAttributeId, { req, path, location }) => {
			await EntityRelationshipAttributeModel.findOne({
				where: {
					EntityRelationshipId: _.get(
						req[location],
						path.split('.Attributes')[0]
					).EntityRelationshipId,
					id: EntityRelationshipAttributeId,
				},
			}).then(async (entityRelationshipAttribute) => {
				if (!entityRelationshipAttribute)
					return Promise.reject(
						'Entity Relationship Attribute not belonging to EntityRelationship'
					);

				let value = _.get(
					req[location],
					path.replace('EntityRelationshipAttributeId', 'value')
				);

				if (value != undefined) {
					let check = await type_matcher(entityRelationshipAttribute, value);
					if (!check)
						return Promise.reject(
							`Type error, value must be of type: '${entityRelationshipAttribute.type}'`
						);
				}
			});
		}),
];
