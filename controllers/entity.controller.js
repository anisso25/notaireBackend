const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const {
	Entity: EntityModel,
	EntityAttribute: EntityAttributeModel,
	EntityRelationship: EntityRelationshipModel,
	EntityRelationshipAttribute: EntityRelationshipAttributeModel,
} = require('../models');

/******************************************************************************
 *                              Entity Controller
 ******************************************************************************/
class EntityController {
	includeAllAssociations = () => {
		return [
			{ model: EntityAttributeModel },
			{ model: EntityModel, as: 'Parent' },
			{ model: EntityModel, as: 'Children' },
			{
				model: EntityRelationshipModel,
				as: 'EntityRelationshipFroms',
				include: EntityRelationshipAttributeModel,
			},
			{
				model: EntityRelationshipModel,
				as: 'EntityRelationshipTos',
				include: EntityRelationshipAttributeModel,
			},
		];
	};

	createEntity = async (req, res, next) => {
		this.checkValidation(req);

		let body = req.body;

		const entity = await EntityModel.create(body).catch((e) => next(e));

		if (!entity) throw new HttpException(500, 'Something went wrong!');

		if (!entity.isAbstract) {
			entity.EntityAttributes = [];

			if (body.Attributes)
				for (let attribute of body.Attributes) {
					let entityAttribute = await EntityAttributeModel.create({
						EntityId: entity.id,
						name: attribute.name,
						type: attribute.type,
						values: attribute.values,
					}).catch((e) => next(e));
					entity.EntityAttributes.push(entityAttribute);
				}

			entity.EntityRelationshipFroms = [];
			entity.EntityRelationshipTos = [];
			entity.Children = [];

			if (body.Relations)
				for (let relation of body.Relations) {
					let fromThisEntity = relation.ToEntityId != undefined;

					let entityRelationship = await EntityRelationshipModel.create({
						FromEntityId: fromThisEntity ? entity.id : relation.FromEntityId,
						ToEntityId: fromThisEntity ? relation.ToEntityId : entity.id,
					}).catch((e) => next(e));

					if (fromThisEntity)
						entity.EntityRelationshipTos.push(entityRelationship);
					else entity.EntityRelationshipFroms.push(entityRelationship);
				}
		}

		return res.send({
			success: true,
			message: 'Entity was created.',
			entity: this.formatEntityObject(entity),
		});
	};

	getAllEntities = async (req, res, next) => {
		let { orderBy, orderDir, withoutPagination, page, perPage, search } =
			req.query;

		orderBy =
			orderBy && ['createdAt', 'name'].includes(orderBy)
				? orderBy
				: 'createdAt';
		orderDir =
			orderDir && ['desc', 'asc'].includes(orderDir.toLowerCase())
				? orderDir
				: 'desc';
		withoutPagination = ['true', '1'].indexOf(withoutPagination) >= 0;

		if (!withoutPagination) {
			perPage =
				perPage != undefined && perPage != '' && !isNaN(perPage)
					? parseInt(perPage)
					: 10;
			page =
				page != undefined && page != '' && !isNaN(page) ? parseInt(page) : 1;
		}

		let where = {};
		if (search) {
			where = { name: { [Op.like]: `%${search.trim()}%` } };
		}

		let entities = await EntityModel.findAndCountAll({
				where,
				include: this.includeAllAssociations(),
				order: [[orderBy, orderDir]],
				offset: withoutPagination ? undefined : (page - 1) * perPage,
				limit: withoutPagination ? undefined : perPage,
				distinct: true,
			}).catch((e) => next(e)),
			count = entities.count;

		let formattedEntities = entities.rows.map((entity) => {
			return this.formatEntityObject(entity);
		});

		return res.status(200).send({
			success: true,
			entities: withoutPagination
				? formattedEntities
				: {
						totalRows: count,
						totalPages: Math.ceil(count / perPage),
						currentPage: page,
						rows: formattedEntities,
				  },
		});
	};

	getEntityById = async (req, res, next) => {
		this.checkValidation(req);

		const entity = await EntityModel.findByPk(req.params.id, {
			include: this.includeAllAssociations(),
		}).catch((e) => next(e));

		if (!entity)
			return res
				.status(404)
				.send({ success: false, message: 'Entity not found!' });

		return res
			.status(200)
			.send({ success: true, entity: this.formatEntityObject(entity) });
	};

	updateEntity = async (req, res, next) => {
		this.checkValidation(req);

		const entity = await EntityModel.findByPk(req.params.id, {
			include: this.includeAllAssociations(),
		}).catch((e) => next(e));

		if (!entity)
			return res
				.status(404)
				.send({ success: false, message: 'Entity not found!' });

		Object.assign(entity, req.body);
		await entity.save();

		return res.status(200).send({
			success: true,
			message: 'Entity updated successfully.',
			entity: this.formatEntityObject(entity),
		});
	};

	deleteEntity = async (req, res, next) => {
		this.checkValidation(req);

		const result = await EntityModel.destroy({
			where: {
				id: req.params.id,
			},
		}).catch((e) => next(e));

		if (!result)
			return res
				.status(404)
				.send({ success: false, message: 'Entity not found!' });

		await EntityAttributeModel.destroy({ where: { EntityId: req.params.id } });
		await EntityRelationshipModel.destroy({
			where: {
				[Op.or]: [
					{ FromEntityId: req.params.id },
					{ ToEntityId: req.params.id },
				],
			},
		});

		return res
			.status(200)
			.send({ success: true, message: 'Entity has been deleted.' });
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};

	formatEntityObject = (entity) => {
		let data = {
			id: entity.id,
			name: entity.name,
			isAbstract: entity.isAbstract,
			ParentId: entity.ParentId,
		};

		let additionalData = {};
		if (entity.isAbstract)
			additionalData = {
				Children: entity.Children?.map((child) => child.id),
			};
		else
			additionalData = {
				attributes: entity.EntityAttributes.map((entityAttribute) => {
					return {
						id: entityAttribute.id,
						name: entityAttribute.name,
						type: entityAttribute.type,
						values: !entityAttribute.values
							? undefined
							: entityAttribute.values,
					};
				}),
				relationshipFroms: entity.EntityRelationshipFroms.map(
					(entityRelationship) => {
						return {
							id: entityRelationship.id,
							name: entityRelationship.name,
							EntityId: entityRelationship.FromEntityId,
							attributes: entityRelationship.EntityRelationshipAttributes.map(
								(entityRelationshipAttribute) => {
									return {
										id: entityRelationshipAttribute.id,
										name: entityRelationshipAttribute.name,
										type: entityRelationshipAttribute.type,
										values: !entityRelationshipAttribute.values
											? undefined
											: entityRelationshipAttribute.values,
									};
								}
							),
						};
					}
				),
				relationshipTos: entity.EntityRelationshipTos.map(
					(entityRelationship) => {
						return {
							id: entityRelationship.id,
							name: entityRelationship.name,
							EntityId: entityRelationship.ToEntityId,
							attributes: entityRelationship.EntityRelationshipAttributes.map(
								(entityRelationshipAttribute) => {
									return {
										id: entityRelationshipAttribute.id,
										name: entityRelationshipAttribute.name,
										type: entityRelationshipAttribute.type,
										values: !entityRelationshipAttribute.values
											? undefined
											: entityRelationshipAttribute.values,
									};
								}
							),
						};
					}
				),
			};

		return { ...data, ...additionalData };
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new EntityController();
