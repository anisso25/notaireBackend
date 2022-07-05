const {
	Template: TemplateModel,
	Entity: EntityModel,
	EntityAttribute: EntityAttributeModel,
	EntityRelationship: EntityRelationshipModel,
	EntityRelationshipAttribute: EntityRelationshipAttributeModel,
	TemplateInputText: TemplateInputTextModel,
	Document: DocumentModel,
	Instance: InstanceModel,
	InstanceAttribute: InstanceAttributeModel,
	InstanceRelationship: InstanceRelationshipModel,
	InstanceRelationshipAttribute: InstanceRelationshipAttributeModel,
	DocumentInstance: DocumentInstanceModel,
	DocumentInstanceRelationship: DocumentInstanceRelationshipModel,
	DocumentInputText: DocumentInputTextModel,
	Office: OfficeModel,
	AttachedFile: AttachedFileModel,
} = require('../models');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');
const {
	includeAllAssociations: templateIncludeAllAssociations,
	formatTemplateObject,
} = require('./template.controller');
const { formatInstanceObject } = require('./instance.controller');
const { formatAttachedFileObject } = require('./attachedFile.controller');
const { generateDocumentContent } = require('../libs/generateDocumentContent');

/******************************************************************************
 *                              Document Controller
 ******************************************************************************/
class DocumentController {
	includeOfInstanceRelationship = () => {
		return [
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
				include: [
					{ model: EntityModel, paranoid: false },
					{
						model: InstanceAttributeModel,
						paranoid: false,
						include: [{ model: EntityAttributeModel, paranoid: false }],
					},
					{ model: AttachedFileModel },
				],
			},
			{ model: AttachedFileModel },
		];
	};

	includeOfDocumentInstanceRelationship = () => {
		return [
			{
				model: InstanceRelationshipModel,
				paranoid: false,
				include: this.includeOfInstanceRelationship(),
			},
		];
	};

	includeAllAssociations = () => {
		return [
			{
				model: OfficeModel,
				paranoid: false,
			},
			{
				model: DocumentInstanceModel,
				include: [
					{
						model: InstanceModel,
						as: 'Instance',
						paranoid: false,
						include: [
							{ model: EntityModel, paranoid: false },
							{
								model: InstanceAttributeModel,
								paranoid: false,
								include: [{ model: EntityAttributeModel, paranoid: false }],
							},
							{ model: AttachedFileModel },
						],
					},
					{
						model: DocumentInstanceRelationshipModel,
						include: this.includeOfDocumentInstanceRelationship(),
					},
				],
			},
			{
				model: DocumentInputTextModel,
				include: [TemplateInputTextModel],
			},
			{ model: AttachedFileModel },
		];
	};

	getAllDocuments = async (req, res, next) => {
		let { orderBy, orderDir, page, perPage, search, CategoryId } = req.query;

		if (!CategoryId || CategoryId == '')
			return res
				.status(400)
				.send({ success: false, message: 'CategoryId is required!' });

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

		let where = { OfficeId: req.currentUser.OfficeId };
		if (search) {
			const query = { [Op.like]: `%${search.trim()}%` };

			where[Op.or] = [{ reference: query }];
		}

		let documents = await DocumentModel.findAndCountAll({
				where,
				include: [
					{
						model: TemplateModel,
						paranoid: false,
						required: true,
						where: { CategoryId },
					},
				],
				order: [[orderBy, orderDir]],
				offset: (page - 1) * perPage,
				limit: perPage,
				distinct: true,
			}).catch((e) => next(e)),
			count = documents.count;

		return res.status(200).send({
			success: true,
			documents: {
				totalRows: count,
				totalPages: Math.ceil(count / perPage),
				currentPage: page,
				rows: documents.rows.map((document) => {
					return this.formatDocumentObjectForListing(document);
				}),
			},
		});
	};

	getDocumentById = async (req, res, next) => {
		this.checkValidation(req);

		const document = await DocumentModel.findOne({
			where: {
				id: req.params.id,
				OfficeId: req.currentUser.OfficeId,
			},
			include: this.includeAllAssociations(),
		}).catch((e) => next(e));

		if (!document)
			return res
				.status(404)
				.send({ success: false, message: 'Document not found!' });

		document.Template = await TemplateModel.findByPk(document.TemplateId, {
			paranoid: false,
			include: templateIncludeAllAssociations(),
		});

		return res.status(200).send({
			success: true,
			document: await this.formatDocumentObject(document),
		});
	};

	createDocument = async (req, res, next) => {
		this.checkValidation(req);

		const template = await TemplateModel.findOne({
			where: { CategoryId: req.body.CategoryId, isPublished: true },
			include: templateIncludeAllAssociations(),
		}).catch((e) => next(e));

		if (!template)
			return res.status(404).send({
				success: false,
				message: 'No template found for this category!',
			});

		const OfficeId = req.currentUser.OfficeId;

		let office = req.currentUser.Office,
			check_ref_uniqueness,
			reference;

		do {
			reference = this.referenceMaker(office.reference);
			check_ref_uniqueness = await DocumentModel.findOne({
				paranoid: false,
				where: { reference, OfficeId },
			}).catch((e) => e);
			office.reference = parseInt(office.reference) + 1;
		} while (check_ref_uniqueness != null);

		req.body = {
			...req.body,
			OfficeId,
			UserId: req.currentUser.id,
			TemplateId: template.id,
			reference: reference,
		};

		const document = await DocumentModel.create(req.body).catch((e) => next(e));

		if (!document) throw new HttpException(500, 'Something went wrong!');
		await office.save();

		document.DocumentInputTexts = [];
		for (const templateInputText of template.TemplateInputTexts) {
			let documentInputText = await DocumentInputTextModel.create({
				DocumentId: document.id,
				TemplateInputTextId: templateInputText.id,
				value: templateInputText.defaultValue,
			}).catch((e) => next(e));

			documentInputText.TemplateInputText = templateInputText;

			document.DocumentInputTexts.push(documentInputText);
		}

		// init for formatDocumentObject
		document.Template = template;
		document.DocumentInstances = [];
		document.AttachedFiles = [];
		document.Office = office;

		return res.send({
			success: true,
			message: 'Document was created.',
			document: await this.formatDocumentObject(document),
		});
	};

	updateDocument = async (req, res, next) => {
		this.checkValidation(req);

		let document = await DocumentModel.findOne({
			where: {
				id: req.params.id,
				OfficeId: req.currentUser.OfficeId,
			},
			include: this.includeAllAssociations(),
		}).catch((e) => next(e));

		if (!document)
			return res
				.status(404)
				.send({ success: false, message: 'Document not found!' });

		if (document.isFinalised == true)
			return res.status(400).send({
				success: false,
				message: "Document is finalised can't be edited!",
			});

		document.Template = await TemplateModel.findByPk(document.TemplateId, {
			paranoid: false,
			include: templateIncludeAllAssociations(),
		});

		let body = req.body;

		if (body.reference != undefined) {
			const check_ref_uniqueness = await DocumentModel.findOne({
				paranoid: false,
				where: {
					id: { [Op.ne]: document.id },
					reference: body.reference,
					OfficeId: req.currentUser.OfficeId,
				},
			}).catch((e) => e);

			if (check_ref_uniqueness != null)
				return res
					.status(404)
					.send({ success: false, message: 'Reference already in use!' });

			document.reference = body.reference;
		}

		if (body.date !== undefined) document.date = body.date;

		if (body.addResource !== undefined) {
			if (body.addResource.isRoot) {
				let findInstance = await InstanceModel.findByPk(
					body.addResource.InstanceId,
					{
						include: [
							{ model: EntityModel, paranoid: false },
							{
								model: InstanceAttributeModel,
								paranoid: false,
								include: [{ model: EntityAttributeModel, paranoid: false }],
							},
							{ model: AttachedFileModel },
						],
					}
				);

				if (!findInstance) throw new HttpException(404, 'Instance not found!');

				let addedDocumentInstance = await DocumentInstanceModel.create({
					DocumentId: document.id,
					TemplateEntityId: body.addResource.TemplateEntityId,
					InstanceId: body.addResource.InstanceId,
				}).catch((e) => next(e));

				if (!addedDocumentInstance)
					throw new HttpException(500, 'Something went wrong!');

				addedDocumentInstance.Instance = findInstance;
				addedDocumentInstance.DocumentInstanceRelationships = [];

				document.DocumentInstances.push(addedDocumentInstance);
			} else {
				await DocumentInstanceRelationshipModel.create({
					InstanceRelationshipId: body.addResource.InstanceRelationshipId,
					DocumentInstanceId: body.addResource.parentIsRoot
						? body.addResource.DocumentInstanceId
						: undefined,
					ParentId: body.addResource.parentIsRoot
						? undefined
						: body.addResource.ParentId,
				}).catch((e) => next(e));

				// Because it's eager loading
				if (body.addResource.parentIsRoot) {
					let documentInstance = document.DocumentInstances.find(
						(o) => o.id == body.addResource.DocumentInstanceId
					);

					if (documentInstance)
						documentInstance.DocumentInstanceRelationships =
							await documentInstance.getDocumentInstanceRelationships({
								include: this.includeOfDocumentInstanceRelationship(),
							});
				}
			}
		}

		if (body.deleteResource !== undefined) {
			if (body.deleteResource.isRoot) {
				let deletedDocumentInstance = document.DocumentInstances.find(
					(instance) => instance.id == body.deleteResource.id
				);
				if (deletedDocumentInstance != null) {
					await deletedDocumentInstance.destroy();

					document.DocumentInstances = document.DocumentInstances.filter(
						(documentInstance) => documentInstance.id != body.deleteResource.id
					);
				}
			} else {
				await DocumentInstanceRelationshipModel.destroy({
					where: { id: body.deleteResource.id },
				});

				// Because it's eager loading
				document.DocumentInstances = document.DocumentInstances.map(
					(documentInstance) => {
						documentInstance.DocumentInstanceRelationships =
							documentInstance.DocumentInstanceRelationships.filter(
								(o) => o.id != body.deleteResource.id
							);

						return documentInstance;
					}
				);
			}
		}

		if (body.editDocumentInputText !== undefined) {
			let editedInputText = document.DocumentInputTexts.find(
				(inputText) => inputText.id == body.editDocumentInputText.id
			);
			if (editedInputText != null) {
				if (body.editDocumentInputText.value !== undefined)
					editedInputText.value = body.editDocumentInputText.value;
				await editedInputText.save();
			}
		}

		await document.save();

		return res.send({
			success: true,
			message: 'Document updated successfully.',
			document: await this.formatDocumentObject(document),
		});
	};

	deleteDocument = async (req, res, next) => {
		this.checkValidation(req);

		const result = await DocumentModel.destroy({
			where: {
				id: req.params.id,
				OfficeId: req.currentUser.OfficeId,
			},
		}).catch((e) => next(e));

		if (!result)
			return res
				.status(404)
				.send({ success: false, message: 'Document not found!' });

		return res
			.status(200)
			.send({ success: true, message: 'Document has been deleted.' });
	};

	cloneDocumentInstanceRelationships = async (
		documentInstanceRelationships,
		parent,
		parentIsDocumentInstance = false
	) => {
		for (let documentInstanceRelationship of documentInstanceRelationships) {
			const clonedDocumentInstanceRelationship =
				await DocumentInstanceRelationshipModel.create({
					ParentId: parentIsDocumentInstance ? null : parent.id,
					DocumentInstanceId: parentIsDocumentInstance ? parent.id : null,
					InstanceRelationshipId:
						documentInstanceRelationship.InstanceRelationshipId,
				});

			await this.cloneDocumentInstanceRelationships(
				await documentInstanceRelationship.getChildren(),
				clonedDocumentInstanceRelationship
			);
		}
	};

	cloneDocument = async (req, res, next) => {
		this.checkValidation(req);

		let document = await DocumentModel.findOne({
			where: {
				id: req.params.id,
				OfficeId: req.currentUser.OfficeId,
			},
			include: this.includeAllAssociations(),
		}).catch((e) => next(e));

		if (!document)
			return res
				.status(404)
				.send({ success: false, message: 'Document not found!' });

		if (!document.isFinalised)
			return res.status(400).send({
				success: false,
				message: 'Document must be finalised to be cloned',
			});

		const template = await TemplateModel.findByPk(document.TemplateId, {
			paranoid: false,
			include: templateIncludeAllAssociations(),
		});

		document.Template = template;

		let OfficeId = req.currentUser.OfficeId,
			office = req.currentUser.Office,
			check_ref_uniqueness,
			reference;

		do {
			reference = this.referenceMaker(office.reference);
			check_ref_uniqueness = await DocumentModel.findOne({
				paranoid: false,
				where: { reference, OfficeId },
			}).catch((e) => e);
			office.reference = parseInt(office.reference) + 1;
		} while (check_ref_uniqueness != null);

		let clonedDocument = await DocumentModel.create({
			OfficeId,
			UserId: req.currentUser.id,
			TemplateId: document.Template.id,
			reference: reference,
			isFinalised: false,
		}).catch((e) => next(e));

		if (!clonedDocument) throw new HttpException(500, 'Something went wrong!');
		await office.save();

		for (const documentInstance of document.DocumentInstances) {
			const clonedDocumentInstance = await DocumentInstanceModel.create({
				DocumentId: clonedDocument.id,
				TemplateEntityId: documentInstance.TemplateEntityId,
				InstanceId: documentInstance.InstanceId,
			});

			await this.cloneDocumentInstanceRelationships(
				documentInstance.DocumentInstanceRelationships,
				clonedDocumentInstance,
				true
			);
		}

		for (const documentInputText of document.DocumentInputTexts) {
			await DocumentInputTextModel.create({
				DocumentId: clonedDocument.id,
				TemplateInputTextId: documentInputText.TemplateInputTextId,
				value: documentInputText.value,
			});
		}

		clonedDocument = await DocumentModel.findByPk(clonedDocument.id, {
			include: this.includeAllAssociations(),
		}).catch((e) => next(e));

		clonedDocument.Template = template;

		return res.status(200).send({
			success: true,
			document: await this.formatDocumentObject(clonedDocument),
		});
	};

	makeDocumentAsFinalised = async (req, res, next) => {
		this.checkValidation(req);

		let document = await DocumentModel.findOne({
			where: {
				id: req.params.id,
				OfficeId: req.currentUser.OfficeId,
			},
			include: this.includeAllAssociations(),
		}).catch((e) => next(e));

		if (!document)
			return res
				.status(404)
				.send({ success: false, message: 'Document not found!' });

		document.Template = await TemplateModel.findByPk(document.TemplateId, {
			paranoid: false,
			include: templateIncludeAllAssociations(),
		});

		document.isFinalised = true;
		document.save();

		return res.status(200).send({
			success: true,
			document: await this.formatDocumentObject(document),
		});
	};

	checkValidation = (req) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// when we use oneOf validation function we have a different format of errors object,
			// we want to unify the structure
			let returnedErrors = errors.errors;
			if (
				returnedErrors != undefined &&
				returnedErrors.length == 1 &&
				Array.isArray(returnedErrors[0].nestedErrors)
			)
				returnedErrors = returnedErrors[0].nestedErrors;
			throw new HttpException(400, 'Validation faild', {
				errors: returnedErrors,
			});
		}
	};

	formatDocumentInstanceRelationships = async (
		documentInstanceRelationships
	) => {
		let formattedData = [];

		for (let documentInstanceRelationship of documentInstanceRelationships) {
			formattedData.push({
				id: documentInstanceRelationship.id,

				InstanceRelationship: await documentInstanceRelationship
					.getInstanceRelationship({
						paranoid: false,
						include: this.includeOfInstanceRelationship(),
					})
					.then(async (instanceRelationship) => {
						return {
							id: instanceRelationship.id,
							EntityRelationship: {
								id: instanceRelationship.EntityRelationship.id,
								name: instanceRelationship.EntityRelationship.name,
								order: instanceRelationship.EntityRelationship.order,
							},
							Instance: await formatInstanceObject(
								instanceRelationship.ToInstance,
								{
									withoutRelationships: true,
								}
							),
							attributes:
								instanceRelationship.InstanceRelationshipAttributes.reduce(
									(o, i) => (
										(o[i.EntityRelationshipAttribute.name] = i.value), o
									),
									{}
								),
							attachedFiles: instanceRelationship.AttachedFiles.map(
								(attachedFile) => formatAttachedFileObject(attachedFile)
							),
						};
					}),

				documentInstanceRelationships:
					await this.formatDocumentInstanceRelationships(
						await documentInstanceRelationship.getChildren()
					),
			});
		}

		formattedData.sort((first, second) => {
			return (
				second.InstanceRelationship.EntityRelationship.order -
				first.InstanceRelationship.EntityRelationship.order
			);
		});

		return formattedData.length ? formattedData : undefined;
	};

	formatDocumentObject = async (document) => {
		let documentContent = document.Template.content;

		documentContent = await generateDocumentContent(document, documentContent);

		let documentInstances = [];
		for (let documentInstance of document.DocumentInstances)
			documentInstances.push({
				id: documentInstance.id,
				TemplateEntityId: documentInstance.TemplateEntityId,
				Instance: await formatInstanceObject(documentInstance.Instance, {
					withoutRelationships: true,
				}),
				documentInstanceRelationships:
					await this.formatDocumentInstanceRelationships(
						documentInstance.DocumentInstanceRelationships
					),
			});

		let documentInputTexts = [];
		for (let documentInputText of document.DocumentInputTexts)
			documentInputTexts.push({
				id: documentInputText.id,
				TemplateInputText: {
					id: documentInputText.TemplateInputTextId,
				},
				value: documentInputText.value,
			});

		return {
			...this.formatDocumentObjectForListing(document),
			content: documentContent,
			documentInstances: documentInstances,
			documentInputTexts: documentInputTexts,
			attachedFiles: document.AttachedFiles.map((attachedFile) =>
				formatAttachedFileObject(attachedFile)
			),
			Template: formatTemplateObject(document.Template, {
				withoutContent: true,
			}),
		};
	};

	formatDocumentObjectForListing = (document) => {
		return {
			id: document.id,
			reference: document.reference,
			date: document.date.toISOString().split('T')[0],
			isFinalised: document.isFinalised,
		};
	};

	pad = (num) => (num <= 999 ? `00${num}`.slice(-3) : num);
	referenceMaker = (reference) => {
		return `${new Date(Date.now()).getFullYear()}/${this.pad(reference)}`;
	};
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new DocumentController();
