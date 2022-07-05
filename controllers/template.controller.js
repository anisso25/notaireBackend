const {
	Category: CategoryModel,
	Template: TemplateModel,
	TemplateEntity: TemplateEntityModel,
	TemplateInputText: TemplateInputTextModel,
	Entity: EntityModel,
} = require('../models');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const { formatCategoryObject } = require('./category.controller');

/******************************************************************************
 *                              Template Controller
 ******************************************************************************/
class TemplateController {
	includeAllAssociations = () => {
		return [
			{ model: CategoryModel, required: true },
			{
				model: TemplateEntityModel,
				include: [
					{
						model: EntityModel,
						paranoid: false,
					},
				],
			},
			{ model: TemplateInputTextModel },
		];
	};

	getAllTemplates = async (req, res, next) => {
		let { orderBy, orderDir, page, perPage, CategoryId, isPublished } =
			req.query;

		orderBy =
			orderBy && ['createdAt'].includes(orderBy) ? orderBy : 'createdAt';
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
		if (CategoryId != undefined && CategoryId != '')
			where['CategoryId'] = CategoryId;
		if (isPublished != undefined && isPublished != '')
			where['isPublished'] = isPublished;

		let templates = await TemplateModel.findAndCountAll({
				where,
				include: this.includeAllAssociations(),
				order: [[orderBy, orderDir]],
				offset: (page - 1) * perPage,
				limit: perPage,
				distinct: true,
			}).catch((e) => next(e)),
			count = templates.count;

		return res.status(200).send({
			success: true,
			templates: {
				totalRows: count,
				totalPages: Math.ceil(count / perPage),
				currentPage: page,
				rows: templates.rows.map((template) => {
					return this.formatTemplateObject(template);
				}),
			},
		});
	};

	createTemplate = async (req, res, next) => {
		this.checkValidation(req);

		req.body = {
			...req.body,
			content: '',
		};

		let template = await TemplateModel.create(req.body).catch((e) => next(e));

		if (!template) throw new HttpException(500, 'Something went wrong!');

		template.Category = await CategoryModel.findByPk(req.body.CategoryId);
		template.TemplateEntities = [];

		return res.send({
			success: true,
			message: 'Template was created.',
			template: this.formatTemplateObject(template),
		});
	};

	updateTemplate = async (req, res, next) => {
		this.checkValidation(req);

		let template = await TemplateModel.findByPk(req.params.id, {
			include: [
				{ model: CategoryModel, required: true },
				{ model: TemplateEntityModel },
				{ model: TemplateInputTextModel },
			],
		}).catch((e) => next(e));

		if (!template)
			return res
				.status(404)
				.send({ success: false, message: 'Template not found!' });

		let body = req.body;

		if (
			body.isPublished != undefined &&
			body.isPublished != template.isPublished
		) {
			template.isPublished = body.isPublished;

			if (body.isPublished)
				await TemplateModel.update(
					{
						where: {
							id: { [Op.not]: template.id },
							categoryId: body.CategoryId,
						},
					},
					{ isPublished: false }
				).catch((e) => next(e));
		}

		let TemplateEntities = template.TemplateEntities;

		for (let templateResource of body.TemplateEntities) {
			let tag = templateResource.tag;
			templateResource = await TemplateEntityModel.create({
				...templateResource,
				TemplateId: template.id,
			}).catch((e) => next(e));
			template.TemplateEntities.push(templateResource);
			if (tag) {
				await TemplateTagsByNumberModel.create({
					TemplateEntityId: templateResource.id,
					...tag,
				});
			}
		}

		template.TemplateEntities = TemplateEntities;

		return res.send({
			success: true,
			message: 'Template was updated.',
			template: this.formatTemplateObject(template),
		});
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new HttpException(400, 'Validation faild', errors);
		}
	};

	formatTemplateObject = (template, options) => {
		options = {
			...{
				withoutContent: false,
			},
			...options,
		};

		return {
			id: template.id,
			Category: formatCategoryObject(template.Category),
			isPublished: template.isPublished,
			content: options.withoutContent ? undefined : template.content,
			templateEntities: template.TemplateEntities.map((templateEntity) => {
				return {
					id: templateEntity.id,
					EntityId: templateEntity.EntityId,
					name: templateEntity.name,
					customTemplate: templateEntity.customTemplate,
				};
			}),
			templateInputTexts: template.TemplateInputTexts.map(
				(templateInputText) => {
					return {
						id: templateInputText.id,
						TemplateEntityId: templateInputText.TemplateEntityId,
						name: templateInputText.name,
						defaultValue: templateInputText.defaultValue,
					};
				}
			),
		};
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new TemplateController();
