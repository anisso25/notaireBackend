const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const {
	attributeTypes: EntityAttributeTypes,
} = require('../utils/entityValues.utils');
const { formatAttachedFileObject } = require('./attachedFile.controller');

const {
	Entity: EntityModel,
	EntityAttribute: EntityAttributeModel,
	EntityRelationship: EntityRelationshipModel,
	EntityRelationshipAttribute: EntityRelationshipAttributeModel,
	Instance: InstanceModel,
	InstanceAttribute: InstanceAttributeModel,
	InstanceRelationship: InstanceRelationshipModel,
	InstanceRelationshipAttribute: InstanceRelationshipAttributeModel,
	AttachedFile: AttachedFileModel,
	Wilaya: WilayaModel,
	Country: CountryModel,
} = require('../models');

/******************************************************************************
 *                              Instance Controller
 ******************************************************************************/
class InstanceController {
	includeAssociationsWithoutRelationships = (whereAttributes) => [
		{ model: EntityModel, paranoid: false },
		{
			model: InstanceAttributeModel,
			include: [{ model: EntityAttributeModel, paranoid: false }],
			where: whereAttributes,
		},
		{ model: AttachedFileModel },
	];

	includeOfInstanceRelationshipFrom = () => [
		{
			model: EntityRelationshipModel,
			paranoid: false,
		},
		{
			model: InstanceRelationshipAttributeModel,
			include: [{ model: EntityRelationshipAttributeModel, paranoid: false }],
		},
		{
			model: InstanceModel,
			as: 'FromInstance',
			paranoid: false,
			include: this.includeAssociationsWithoutRelationships(),
		},
		{ model: AttachedFileModel },
	];

	includeOfInstanceRelationshipTo = () => [
		{
			model: EntityRelationshipModel,
			paranoid: false,
		},
		{
			model: InstanceRelationshipAttributeModel,
			include: [{ model: EntityRelationshipAttributeModel, paranoid: false }],
		},
		{
			model: InstanceModel,
			as: 'ToInstance',
			paranoid: false,
			include: this.includeAssociationsWithoutRelationships(),
		},
		{ model: AttachedFileModel },
	];

	/**
	 * This is the creepiest code that i ever wrote!
	 * @TODO updated
	 **/
	populateCountryAndWilaya = async (instance) => {
		for (const attribute of instance.InstanceAttributes) {
			if (attribute.EntityAttribute.type == EntityAttributeTypes.Country) {
				let country = await CountryModel.findByPk(attribute.value, {
					paranoid: false,
				});
				attribute['value'] =
					country == null
						? null
						: {
								id: country.id,
								name: country.name,
								nationality: country.nationality,
						  };
			}
			if (attribute.EntityAttribute.type == EntityAttributeTypes.Wilaya) {
				let wilaya = await WilayaModel.findByPk(attribute.value, {
					paranoid: false,
				});
				attribute['value'] =
					wilaya == null
						? null
						: {
								id: wilaya.id,
								name: wilaya.name,
						  };
			}
		}

		/*
		if (instance.InstanceRelationshipTos)
			for (const instanceRelationshipTo of instance.InstanceRelationshipTos) {
				if (
					instanceRelationshipTo.ToInstance &&
					instanceRelationshipTo.ToInstance.InstanceAttributes.length != 0
				) {
					for (let attribute of instanceRelationshipTo.ToInstance
						.InstanceAttributes) {
						if (
							attribute.EntityAttribute.type == EntityAttributeTypes.Country
						) {
							let country = await CountryModel.findByPk(attribute.value, {
								paranoid: false,
							});
							attribute['value'] =
								country == null
									? null
									: {
											id: country.id,
											name: country.name,
											nationality: country.nationality,
										};
						}
						if (attribute.EntityAttribute.type == EntityAttributeTypes.Wilaya) {
							let wilaya = await WilayaModel.findByPk(attribute.value, {
								paranoid: false,
							});
							attribute['value'] =
								wilaya == null
									? null
									: {
											id: wilaya.id,
											name: wilaya.name,
										};
						}
					}
				}
			}

		if (instance.InstanceRelationshipFroms)
			for (const instanceRelationshipFrom of instance.InstanceRelationshipFroms) {
				if (
					instanceRelationshipFrom.FromInstance &&
					instanceRelationshipFrom.FromInstance.InstanceAttributes.length != 0
				) {
					for (let attribute of instanceRelationshipFrom.FromInstance
						.InstanceAttributes) {
						if (
							attribute.EntityAttribute.type == EntityAttributeTypes.Country
						) {
							let country = await CountryModel.findByPk(attribute.value, {
								paranoid: false,
							});
							attribute['value'] =
								country == null
									? null
									: {
											id: country.id,
											name: country.name,
											nationality: country.nationality,
										};
						}
						if (attribute.EntityAttribute.type == EntityAttributeTypes.Wilaya) {
							let wilaya = await WilayaModel.findByPk(attribute.value, {
								paranoid: false,
							});
							attribute['value'] =
								wilaya == null
									? null
									: {
											id: wilaya.id,
											name: wilaya.name,
										};
						}
					}
				}
			}
			*/
		return instance;
	};

	createInstance = async (req, res, next) => {
		this.checkValidation(req);

		let body = req.body;

		body.UserId = req.currentUser.id;
		body.OfficeId = req.currentUser.OfficeId;

		let instance = await InstanceModel.create(body).catch((e) => next(e));

		if (!instance) throw new HttpException(500, 'Something went wrong!');

		if (body.Attributes)
			for (let attribute of body.Attributes)
				await InstanceAttributeModel.create({
					InstanceId: instance.id,
					EntityAttributeId: attribute.EntityAttributeId,
					value: attribute.value,
				}).catch((e) => next(e));

		if (body.Relations)
			for (const relation of body.Relations) {
				let fromThisInstance = relation.ToInstanceId != undefined;

				const instanceRelationship = await InstanceRelationshipModel.create({
					EntityRelationshipId: relation.EntityRelationshipId,
					FromInstanceId: fromThisInstance
						? instance.id
						: relation.FromInstanceId,
					ToInstanceId: fromThisInstance ? relation.ToInstanceId : instance.id,
				}).catch((e) => next(e));

				if (relation.Attributes)
					await InstanceRelationshipAttributeModel.bulkCreate(
						relation.Attributes.map((attribute) => {
							return {
								InstanceRelationshipId: instanceRelationship.id,
								EntityRelationshipAttributeId:
									attribute.EntityRelationshipAttributeId,
								value: attribute.value,
							};
						})
					);
			}

		instance = await InstanceModel.findOne({
			where: {
				id: instance.id,
				OfficeId: req.currentUser.OfficeId,
			},
			include: this.includeAssociationsWithoutRelationships(),
		}).catch((e) => next(e));

		return res.send({
			success: true,
			message: 'Instance was created.',
			instance: await this.formatInstanceObject(instance),
		});
	};

	getInstanceById = async (req, res, next) => {
		this.checkValidation(req);

		let instance = await InstanceModel.findOne({
			where: { id: req.params.id, OfficeId: req.currentUser.OfficeId },
			include: this.includeAssociationsWithoutRelationships(),
		}).catch((e) => next(e));

		if (!instance)
			return res
				.status(404)
				.send({ success: false, message: 'Instance not found!' });

		return res.status(200).send({
			success: true,
			instance: await this.formatInstanceObject(instance),
		});
	};

	getAllInstances = async (req, res, next) => {
		let {
			orderBy,
			orderDir,
			page,
			perPage,
			search,
			EntityId,
			ParentInstanceId,
			withoutPagination,
		} = req.query;

		orderBy =
			orderBy && ['createdAt'].includes(orderBy) ? orderBy : 'createdAt';
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

		let where = { OfficeId: req.currentUser.OfficeId },
			whereAttributes;

		if (EntityId) where = { EntityId, ...where };

		if (search && search.length != 0) {
			whereAttributes = {
				[Op.or]: search.map((v) => {
					return v.key
						? {
								'$InstanceAttributes.value$': {
									[Op.like]: `%${v.value?.trim()}%`,
								},
								'$InstanceAttributes.EntityAttributeId$': v.key,
						  }
						: {
								'$InstanceAttributes.value$': {
									[Op.like]: `%${v.value?.trim()}%`,
								},
						  };
				}),
			};
		}

		let whereInclude =
			this.includeAssociationsWithoutRelationships(whereAttributes);

		if (ParentInstanceId) {
			whereInclude = [
				...whereInclude,
				{
					model: InstanceRelationshipModel,
					as: 'InstanceRelationshipFroms',
					include: this.includeOfInstanceRelationshipFrom(),
					where: {
						'$InstanceRelationshipFroms.FromInstanceId$': ParentInstanceId,
					},
				},
			];
		}

		let instances = await InstanceModel.findAndCountAll({
				where,
				include: whereInclude,
				order: [[orderBy, orderDir]],
				offset: withoutPagination ? undefined : (page - 1) * perPage,
				limit: withoutPagination ? undefined : perPage,
				distinct: true,
			}).catch((e) => next(e)),
			count = instances.count;

		// we do this to get all other attributes
		instances = await InstanceModel.findAll({
			where: { id: instances.rows.map((v) => v.id) },
			include: this.includeAssociationsWithoutRelationships(),
		}).catch((e) => next(e));

		let formatedInstances = [];
		for (let instance of instances)
			formatedInstances.push(await this.formatInstanceObject(instance));

		return res.status(200).send({
			success: true,
			instance: withoutPagination
				? formatedInstances
				: {
						totalRows: count,
						totalPages: Math.ceil(count / perPage),
						currentPage: page,
						rows: formatedInstances,
				  },
		});
	};

	deleteInstance = async (req, res, next) => {
		this.checkValidation(req);

		const result = await InstanceModel.destroy({
			where: {
				OfficeId: req.currentUser.OfficeId,
				id: req.params.id,
			},
		}).catch((e) => next(e));

		if (!result)
			return res
				.status(404)
				.send({ success: false, message: 'Instance not found!' });

		await InstanceAttributeModel.destroy({
			where: { InstanceId: req.params.id },
		});
		await InstanceRelationshipModel.destroy({
			where: {
				[Op.or]: [
					{ FromInstanceId: req.params.id },
					{ ToInstanceId: req.params.id },
				],
			},
		});

		return res
			.status(200)
			.send({ success: true, message: 'Instance has been deleted.' });
	};

	updateInstance = async (req, res, next) => {
		this.checkValidation(req);

		let instance = await InstanceModel.findOne({
			where: { id: req.params.id, OfficeId: req.currentUser.OfficeId },
			include: this.includeAssociationsWithoutRelationships(),
		}).catch((e) => next(e));

		if (!instance)
			return res
				.status(404)
				.send({ success: false, message: 'Instance not found!' });

		if (req.body.Attributes)
			for (const attribute of req.body.Attributes) {
				let instanceAttribute = await InstanceAttributeModel.update(
					{ value: attribute.value },
					{
						where: {
							InstanceId: instance.id,
							EntityAttributeId: attribute.EntityAttributeId,
						},
					}
				).catch((e) => next(e));

				if (instanceAttribute.length > 0 && instanceAttribute[0] == 0) {
					await InstanceAttributeModel.create({
						InstanceId: instance.id,
						EntityAttributeId: attribute.EntityAttributeId,
						value: attribute.value,
					}).catch((e) => next(e));
				}
			}

		if (req.body.Relations) {
			let savedRelationships = [];

			for (const relation of req.body.Relations) {
				let fromThisInstance = relation.ToInstanceId != undefined,
					instanceRelationship;

				if (relation.id)
					instanceRelationship = await InstanceRelationshipModel.findOne({
						where: {
							id: relation.id,
							EntityRelationshipId: relation.EntityRelationshipId,
							FromInstanceId: fromThisInstance
								? instance.id
								: relation.FromInstanceId,
							ToInstanceId: fromThisInstance
								? relation.ToInstanceId
								: instance.id,
						},
					}).catch((e) => next(e));
				else
					instanceRelationship = await InstanceRelationshipModel.create({
						EntityRelationshipId: relation.EntityRelationshipId,
						FromInstanceId: fromThisInstance
							? instance.id
							: relation.FromInstanceId,
						ToInstanceId: fromThisInstance
							? relation.ToInstanceId
							: instance.id,
					}).catch((e) => next(e));

				if (instanceRelationship) {
					savedRelationships.push(instanceRelationship.id);

					if (relation.Attributes)
						for (const attribute of relation.Attributes) {
							let instanceRelationshipAttribute =
								await InstanceRelationshipAttributeModel.update(
									{ value: attribute.value },
									{
										where: {
											InstanceRelationshipId: instanceRelationship.id,
											EntityRelationshipAttributeId:
												attribute.EntityRelationshipAttributeId,
										},
									}
								).catch((e) => next(e));

							if (
								instanceRelationshipAttribute.length > 0 &&
								instanceRelationshipAttribute[0] == 0
							) {
								await InstanceRelationshipAttributeModel.create({
									InstanceRelationshipId: instanceRelationship.id,
									EntityRelationshipAttributeId:
										attribute.EntityRelationshipAttributeId,
									value: attribute.value,
								}).catch((e) => next(e));
							}
						}
				}
			}

			await InstanceRelationshipModel.destroy({
				where: {
					id: {
						[Op.notIn]: savedRelationships,
					},
					[Op.or]: [
						{ FromInstanceId: req.params.id },
						{ ToInstanceId: req.params.id },
					],
				},
			});
		}

		await instance.save();

		instance = await InstanceModel.findByPk(instance.id, {
			include: this.includeAssociationsWithoutRelationships(),
		}).catch((e) => next(e));

		return res.status(200).send({
			success: true,
			message: 'Instance updated successfully.',
			instance: await this.formatInstanceObject(instance),
		});
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};

	formatInstanceObject = async (instance, options) => {
		options = {
			...{
				withoutRelationships: false,
			},
			...options,
		};

		instance = await this.populateCountryAndWilaya(instance);

		let relationshipFroms = undefined,
			relationshipTos = undefined;

		if (!options.withoutRelationships) {
			relationshipFroms = [];
			for (let instanceRelationshipFrom of await instance.getInstanceRelationshipFroms(
				{
					include: this.includeOfInstanceRelationshipFrom(),
				}
			))
				relationshipFroms.push({
					id: instanceRelationshipFrom.id,
					EntityRelationship: {
						id: instanceRelationshipFrom.EntityRelationship.id,
						name: instanceRelationshipFrom.EntityRelationship.name,
					},
					instance: await this.formatInstanceObject(
						instanceRelationshipFrom.FromInstance,
						{
							withoutRelationships: true,
						}
					),
					attributes:
						instanceRelationshipFrom.InstanceRelationshipAttributes.reduce(
							(o, i) => ((o[i.EntityRelationshipAttribute.name] = i.value), o),
							{}
						),
					attachedFiles: instanceRelationshipFrom.AttachedFiles.map(
						(attachedFile) => formatAttachedFileObject(attachedFile)
					),
				});

			relationshipTos = [];
			for (let instanceRelationshipTo of await instance.getInstanceRelationshipTos(
				{
					include: this.includeOfInstanceRelationshipTo(),
				}
			))
				relationshipTos.push({
					id: instanceRelationshipTo.id,
					EntityRelationship: {
						id: instanceRelationshipTo.EntityRelationship.id,
						name: instanceRelationshipTo.EntityRelationship.name,
					},
					instance: await this.formatInstanceObject(
						instanceRelationshipTo.ToInstance,
						{
							withoutRelationships: true,
						}
					),
					attributes:
						instanceRelationshipTo.InstanceRelationshipAttributes.reduce(
							(o, i) => ((o[i.EntityRelationshipAttribute.name] = i.value), o),
							{}
						),
					attachedFiles: instanceRelationshipTo.AttachedFiles.map(
						(attachedFile) => formatAttachedFileObject(attachedFile)
					),
				});
		}

		return {
			id: instance.id,
			createdAt: instance.createdAt.toISOString().split('T')[0],
			EntityId: instance.EntityId,
			attributes: instance.InstanceAttributes.reduce(
				(o, i) => ((o[i.EntityAttribute.name] = i.value), o),
				{}
			),
			attachedFiles: instance.AttachedFiles.map((attachedFile) =>
				formatAttachedFileObject(attachedFile)
			),
			relationshipFroms: relationshipFroms,
			relationshipTos: relationshipTos,
		};
	};
}

module.exports = new InstanceController();
