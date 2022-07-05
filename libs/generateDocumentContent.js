const {
	attributeTypes: EntityAttributeTypes,
} = require('../utils/entityValues.utils');
const { dArabicDates } = require('./index');
const {
	Wilaya: WilayaModel,
	Country: CountryModel,
	Instance: InstanceModel,
	InstanceRelationship: InstanceRelationshipModel,
} = require('../models');

const templateEntityBeginTags = `<p style="text-align:right" class="dashed-ending"><span style="font-family:NotoNaskhArabic;">`,
	templateEntityEndTags = `</span></p>`;

var document = null;

const createDocumentInstanceRelationshipsTree = async (
	documentInstanceRelationships,
	fromInstance
) => {
	// I import it here because this script is itself imported at the controller (recursively import)
	const {
		includeOfDocumentInstanceRelationship,
	} = require('../controllers/document.controller');

	let children = [];

	documentInstanceRelationships.sort((first, second) => {
		return (
			second.InstanceRelationship.EntityRelationship.order -
			first.InstanceRelationship.EntityRelationship.order
		);
	});

	for (let documentInstanceRelationship of documentInstanceRelationships)
		children.push({
			documentInstanceRelationship: documentInstanceRelationship,
			FromInstance: fromInstance,
			children: await createDocumentInstanceRelationshipsTree(
				await documentInstanceRelationship.getChildren({
					include: includeOfDocumentInstanceRelationship(),
				}),
				documentInstanceRelationship.InstanceRelationship.ToInstance
			),
		});

	return children;
};

const generateDocumentInstanceRelationshipsContent = async (
	documentInstanceRelationshipsTree
) => {
	let content = '';

	for (const object of documentInstanceRelationshipsTree) {
		if (
			object.documentInstanceRelationship.InstanceRelationship
				.EntityRelationship.defaultTemplate
		) {
			let subContent = await replaceTags(
				object.documentInstanceRelationship.InstanceRelationship,
				object.documentInstanceRelationship.InstanceRelationship
					.EntityRelationship.defaultTemplate
			);

			if (subContent.includes('<span class="custom-tag">_#_fromEntity.'))
				subContent = await replaceTags(
					object.FromInstance,
					subContent.replace(
						/<span class="custom\-tag">_#_fromEntity\./g,
						'<span class="custom-tag">_#_entity.'
					)
				);

			if (
				subContent.includes('<span class="custom-tag">_#_fromEntity_#_</span>')
			)
				if (content.length)
					subContent = subContent.replace(
						'<span class="custom-tag">_#_fromEntity_#_</span>',
						''
					);
				else
					subContent = await replaceTags(
						object.FromInstance,
						subContent.replace(
							'<span class="custom-tag">_#_fromEntity_#_</span>',
							object.FromInstance.Entity.defaultTemplate
						)
					);

			if (subContent.includes('<span class="custom-tag">_#_toEntity.'))
				subContent = await replaceTags(
					object.documentInstanceRelationship.InstanceRelationship.ToInstance,
					subContent.replace(
						/<span class="custom\-tag">_#_toEntity\./g,
						'<span class="custom-tag">_#_entity.'
					)
				);

			if (
				subContent.includes('<span class="custom-tag">_#_toEntity_#_</span>')
			) {
				if (object.children.length)
					subContent = subContent.replace(
						'<span class="custom-tag">_#_toEntity_#_</span>',
						await generateDocumentInstanceRelationshipsContent(object.children)
					);
				else
					subContent = await replaceTags(
						object.documentInstanceRelationship.InstanceRelationship.ToInstance,
						subContent.replace(
							'<span class="custom-tag">_#_toEntity_#_</span>',
							object.documentInstanceRelationship.InstanceRelationship
								.ToInstance.Entity.defaultTemplate
						)
					);
			}

			content += subContent;
		} else {
			content += await replaceTags(
				object.FromInstance,
				object.FromInstance.Entity.defaultTemplate
			);
		}
	}

	return content;
};

const keySeeker = async (currentObject, path) => {
	switch (path) {
		case 'office.name':
			return document.Office.name;
		case 'office.address':
			return document.Office.address;
		case 'document.reference':
			return document.reference;
		case 'document.date':
			return document.date.toISOString().split('T')[0].replace(/\-/g, '/');
		case 'document.date(string)':
			return dArabicDates(document.date.toISOString().split('T')[0]);
		default:
			// Case of templateEntity.ID
			if (/templateEntity\.+/g.test(path)) {
				let splitedPath = path.split('.'),
					id = splitedPath[1],
					templateEntity = document.Template.TemplateEntities.find(
						(o) => o.id == id
					);

				if (templateEntity != undefined) {
					let documentInstances = document.DocumentInstances.filter(
						(v) => v.TemplateEntityId == templateEntity.id
					);
					if (splitedPath.length == 2) {
						if (documentInstances.length > 0) {
							let content = '';

							for (const documentInstance of documentInstances) {
								let documentInstanceContent = '';

								if (documentInstance.DocumentInstanceRelationships.length)
									documentInstanceContent =
										await generateDocumentInstanceRelationshipsContent(
											await createDocumentInstanceRelationshipsTree(
												documentInstance.DocumentInstanceRelationships,
												documentInstance.Instance
											)
										);
								else
									documentInstanceContent = await replaceTags(
										documentInstance.Instance,
										documentInstance.Instance.Entity.defaultTemplate
									);

								content +=
									templateEntityBeginTags +
									documentInstanceContent +
									templateEntityEndTags;
							}

							return content;
						}

						return await replaceTags({}, templateEntity.customTemplate);
					}
				}
			}

			// Case of entity.ID
			if (
				/entity\./g.test(path) &&
				currentObject != undefined &&
				currentObject.constructor?.name == InstanceModel.name
			) {
				let splitedPath = path.split('.'),
					id = /\(string\)/g.test(splitedPath[1])
						? splitedPath[1].replace('(string)', '')
						: splitedPath[1];

				if (splitedPath.length >= 2) {
					let instanceAttribute = currentObject.InstanceAttributes.find(
						(o) => o.EntityAttributeId == id
					);

					if (instanceAttribute != undefined) {
						let value = instanceAttribute.value;
						if (
							instanceAttribute.EntityAttribute.type ==
							EntityAttributeTypes.Date
						) {
							if (path.includes('(string)')) value = dArabicDates(value);
							else value = value.replace(/\-/g, '/');
						}

						if (
							instanceAttribute.EntityAttribute.type ==
							EntityAttributeTypes.Country
						) {
							let country = await CountryModel.findByPk(value, {
								paranoid: false,
							}).catch((e) => e);
							if (country) {
								value =
									splitedPath.length > 2
										? country[splitedPath[2]]
										: country.name;
							}
						}

						if (
							instanceAttribute.EntityAttribute.type ==
							EntityAttributeTypes.Wilaya
						) {
							let wilaya = await WilayaModel.findByPk(value, {
								paranoid: false,
							}).catch((e) => e);
							if (wilaya) {
								value =
									splitedPath.length > 2 ? wilaya[splitedPath[2]] : wilaya.name;
							}
						}

						return value;
					}
				} else
					return await replaceTags(
						currentObject,
						currentObject.Entity.defaultTemplate
					);
			}

			// Case of entityRelationship.ID
			if (
				/entityRelationship\./g.test(path) &&
				currentObject != undefined &&
				currentObject.constructor?.name == InstanceRelationshipModel.name
			) {
				let splitedPath = path.split('.'),
					id = /\(string\)/g.test(splitedPath[1])
						? splitedPath[1].replace('(string)', '')
						: splitedPath[1];

				if (splitedPath.length >= 2) {
					let instanceRelationshipAttribute =
						currentObject.InstanceRelationshipAttributes.find(
							(o) => o.EntityRelationshipAttributeId == id
						);

					if (instanceRelationshipAttribute != undefined) {
						let value = instanceRelationshipAttribute.value;
						if (
							instanceRelationshipAttribute.EntityRelationshipAttribute.type ==
							EntityAttributeTypes.Date
						) {
							if (path.includes('(string)')) value = dArabicDates(value);
							else value = value.replace(/\-/g, '/');
						}

						if (
							instanceRelationshipAttribute.EntityRelationshipAttribute.type ==
							EntityAttributeTypes.Country
						) {
							let country = await CountryModel.findByPk(value, {
								paranoid: false,
							}).catch((e) => e);
							if (country) {
								value =
									splitedPath.length > 2
										? country[splitedPath[2]]
										: country.name;
							}
						}

						if (
							instanceRelationshipAttribute.EntityRelationshipAttribute.type ==
							EntityAttributeTypes.Wilaya
						) {
							let wilaya = await WilayaModel.findByPk(value, {
								paranoid: false,
							}).catch((e) => e);
							if (wilaya) {
								value =
									splitedPath.length > 2 ? wilaya[splitedPath[2]] : wilaya.name;
							}
						}

						return value;
					}
				}
			}

			// Case of templateInputText.ID
			if (/templateInputText\./g.test(path)) {
				let splitedPath = path.split('.'),
					id = splitedPath[1],
					documentInputText = document.DocumentInputTexts.find(
						(o) => o.TemplateInputTextId == id
					);
				if (documentInputText != undefined) {
					if (
						!documentInputText.value &&
						documentInputText.TemplateInputText.TemplateEntityId != null
					) {
						documentInputText.value = await keySeeker(
							{},
							'templateEntity.' +
								documentInputText.TemplateInputText.TemplateEntityId
						);

						// if we save this, the next modification will not be applied
						//await documentInputText.save();
					}

					return documentInputText.value;
				}
			}

			return null;
	}
};

const replaceTags = async (currentObject = {}, content) => {
	let regex = /<span class="custom\-tag">_#_[A-Za-z0-9\.\(\)]+_#_<\/span>/gi;
	let match;
	while ((match = regex.exec(content))) {
		const path = match[0].replace(
			/(<span class="custom\-tag">_#_)|(_#_<\/span>)/gi,
			''
		);
		let value = await keySeeker(currentObject, path);
		if (value != null) {
			content = content.replace(match[0], value);
			//console.log(path, String(value).substring(0, 20));
			// NOTE this will keep itterating over all duplications
			regex.lastIndex -= match[0].length - value.length;
		}
	}
	return content;
};

const generateDocumentContent = async (currentDocument, content) => {
	document = currentDocument;
	return await replaceTags({}, content);
};

module.exports.generateDocumentContent = generateDocumentContent;
