'use strict';
const {
	attributeTypes: EntityAttributeTypes,
} = require('../../utils/entityValues.utils');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// ======= Client =======
		const clientEntityId = await queryInterface.bulkInsert(
			'Entities',
			[
				{
					name: 'متعاقد',
					isAbstract: true,
				},
			],
			{ returning: true }
		);

		const personEntityId = await queryInterface.bulkInsert(
			'Entities',
			[
				{
					name: 'شخص طبيعي',
					ParentId: clientEntityId,
					isAbstract: false,
					defaultTemplate: `السيد: <span class="custom-tag">_#_entity.1_#_</span> <span class="custom-tag">_#_entity.2_#_</span>&nbsp; المولود بتاريخ <span class="custom-tag">_#_entity.4_#_</span> (<span class="custom-tag">_#_entity.4(string)_#_</span>) ب<span class="custom-tag">_#_entity.3_#_</span>، حسب شهادة ميلاده رقم <span class="custom-tag">_#_entity.5_#_</span>، من جنسية <span class="custom-tag">_#_entity.6.nationality_#_</span>، الساكن ب: <span class="custom-tag">_#_entity.8_#_</span>`,
				},
			],
			{ returning: true }
		);

		await queryInterface.bulkInsert('EntityAttributes', [
			{
				EntityId: personEntityId,
				name: 'اللقب',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: personEntityId,
				name: 'الإسم',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: personEntityId,
				name: 'مكان الميلاد',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: personEntityId,
				name: 'تاريخ الميلاد',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityId: personEntityId,
				name: 'رقم شهادة الميلاد',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: personEntityId,
				name: 'الجنسية',
				type: EntityAttributeTypes.Country,
			},
			{
				EntityId: personEntityId,
				name: 'الجنس',
				type: EntityAttributeTypes.Enum,
				values: JSON.stringify(['رجل', 'إمرأة']),
			},
			{
				EntityId: personEntityId,
				name: 'العنوان',
				type: EntityAttributeTypes.String,
			},
		]);

		const companyEntityId = await queryInterface.bulkInsert(
			'Entities',
			[
				{
					name: 'شخص معنوي',
					ParentId: clientEntityId,
					isAbstract: false,
					defaultTemplate: `<span class="custom-tag">_#_entity.9_#_</span> المسماة <span class="custom-tag">_#_entity.10_#_</span> رأس مالها <span class="custom-tag">_#_entity.11_#_</span> المقر الإجتماعي <span class="custom-tag">_#_entity.12_#_</span> تحت رقم السجل التجاري <span class="custom-tag">_#_entity.13_#_</span> بتاريخ <span class="custom-tag">_#_entity.14(string)_#_</span> (<span class="custom-tag">_#_entity.14_#_</span>) رقمها الجبائي <span class="custom-tag">_#_entity.15_#_</span>`,
				},
			],
			{ returning: true }
		);

		await queryInterface.bulkInsert('EntityAttributes', [
			{
				EntityId: companyEntityId,
				name: 'الطبيعة',
				type: EntityAttributeTypes.Enum,
				values: JSON.stringify([
					'مؤسسة ذات الشخص الوحيد وذات المسؤولية المحدودة (م ذ ش و م م)',
					'شركة ذات ﻣﺴﺆوﻟﯿﺔ ﻣﺤﺪودة (ش ذ م م)',
					'شركة ذات التوصية البسيطة (ش ذ ت ب)',
					'شركة تضامن (ش ت)',
					'شركة ذات أسهم (ش ذ أ)',
					'شركة توصية بالأسهم (ش ت أ)',
				]),
			},
			{
				EntityId: companyEntityId,
				name: 'التسمية',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: companyEntityId,
				name: 'رأس المال',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: companyEntityId,
				name: 'المقر الإجتماعي',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: companyEntityId,
				name: 'رقم السجل التجاري',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: companyEntityId,
				name: 'تاريخ السجل التجاري',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityId: companyEntityId,
				name: 'الرقم الجبائي',
				type: EntityAttributeTypes.String,
			},
		]);

		const companyPersonEntityRelationshipId = await queryInterface.bulkInsert(
			'EntityRelationships',
			[
				{
					name: 'ممثل الشركة',
					FromEntityId: companyEntityId,
					ToEntityId: personEntityId,
					defaultTemplate: `<span class="custom-tag">_#_fromEntity_#_</span> الممثلة ب<span class="custom-tag">_#_toEntity_#_</span>`,
				},
			]
		);

		await queryInterface.bulkInsert('EntityRelationshipAttributes', [
			{
				EntityRelationshipId: companyPersonEntityRelationshipId,
				name: 'الصفة',
				type: EntityAttributeTypes.Enum,
				values: JSON.stringify(['شريك مؤسس', 'مساعد المؤسس']),
			},
		]);

		const procurationPersonEntityRelationshipId =
			await queryInterface.bulkInsert('EntityRelationships', [
				{
					name: 'وكالة خاصة',
					FromEntityId: personEntityId,
					ToEntityId: personEntityId,
					defaultTemplate: `<span class="custom-tag">_#_fromEntity_#_</span> القائم في حقه <span class="custom-tag">_#_toEntity_#_</span>،وهـــذا بموجب وكالة خاصة محررة لدى <span class="custom-tag">_#_entityRelationship.2_#_</span> بتاريخ <span class="custom-tag">_#_entityRelationship.3(string)_#_</span> (<span class="custom-tag">_#_entityRelationship.3_#_</span>) فهرس رقم <span class="custom-tag">_#_entityRelationship.4_#_</span>، مسجلة بمفتشية التسجيل و الطابع في <span class="custom-tag">_#_entityRelationship.5_#_</span> وصل رقم <span class="custom-tag">_#_entityRelationship.6_#_</span>، 
							و قد صرح الوكيل السيد: <span class="custom-tag">_#_toEntity.1_#_</span> <span class="custom-tag">_#_toEntity.2_#_</span> أن هذه الوكالة لازالت صالحة إلى يومنا هذا، و أنها لم تكن محل إلغاء أو فسخ، وأن الطرف الموكل لا زال على قيد الحياة.`,
				},
			]);

		await queryInterface.bulkInsert('EntityRelationshipAttributes', [
			{
				EntityRelationshipId: procurationPersonEntityRelationshipId,
				name: 'مكتب التحرير',
				type: EntityAttributeTypes.String,
			},
			{
				EntityRelationshipId: procurationPersonEntityRelationshipId,
				name: 'تاريخ التحرير',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityRelationshipId: procurationPersonEntityRelationshipId,
				name: 'رقم الفهرس',
				type: EntityAttributeTypes.String,
			},
			{
				EntityRelationshipId: procurationPersonEntityRelationshipId,
				name: 'تاريخ التسجيل',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityRelationshipId: procurationPersonEntityRelationshipId,
				name: 'رقم وصل التسجيل',
				type: EntityAttributeTypes.String,
			},
		]);

		// ======= ID Document =======
		const idDocumentEntityId = await queryInterface.bulkInsert(
			'Entities',
			[
				{
					name: 'وثيقة هوية',
					isAbstract: false,
					defaultTemplate: `<span class="custom-tag">_#_entity.16_#_</span> رقم <span class="custom-tag">_#_entity.17_#_</span> الصادرة بتاريخ <span class="custom-tag">_#_entity.18(string)_#_</span> (<span class="custom-tag">_#_entity.18_#_</span>) عن <span class="custom-tag">_#_entity.20_#_</span>`,
				},
			],
			{ returning: true }
		);

		await queryInterface.bulkInsert('EntityAttributes', [
			{
				EntityId: idDocumentEntityId,
				name: 'النوع',
				type: EntityAttributeTypes.Enum,
				values: JSON.stringify([
					'بطاقة التعريف الوطنية بيومترية',
					'جواز السفر بيومتري',
					'رخصة السياقة بيومترية',
					'بطاقة التعريف الوطنية عادية',
				]),
			},
			{
				EntityId: idDocumentEntityId,
				name: 'الرقم',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: idDocumentEntityId,
				name: 'تاريخ الإصدار',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityId: idDocumentEntityId,
				name: 'تاريخ إنتهاء الصلاحية',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityId: idDocumentEntityId,
				name: 'سلطة الإصدار',
				type: EntityAttributeTypes.String,
			},
		]);

		await queryInterface.bulkInsert('EntityRelationships', [
			{
				name: 'وثيقة الهوية',
				FromEntityId: personEntityId,
				ToEntityId: idDocumentEntityId,
				defaultTemplate: `<span class="custom-tag">_#_fromEntity_#_</span> الحامل ل<span class="custom-tag">_#_toEntity_#_</span>`,
				order: 2,
			},
		]);

		// ======= Car =======
		const carEntityId = await queryInterface.bulkInsert(
			'Entities',
			[
				{
					name: 'سيارة',
					isAbstract: false,
					defaultTemplate: `<ul>
					<li style="text-align:right">
						<p class="dashed-ending">
							<span style="font-family:NotoNaskhArabic;">الطراز: <span class="custom-tag">_#_entity.21_#_</span></span>
						</p>
					</li>
					<li style="text-align:right">
						<p class="dashed-ending">
							<span style="font-family:NotoNaskhArabic;">النوع: <span class="custom-tag">_#_entity.22_#_</span></span>
						</p>
					</li>
					<li style="text-align:right">
						<p class="dashed-ending">
							<span style="font-family:NotoNaskhArabic;">الصنف: <span class="custom-tag">_#_entity.23_#_</span></span>
						</p>
					</li>
					<li style="text-align:right">
						<p class="dashed-ending">
							<span style="font-family:NotoNaskhArabic;">الرقم التسلسلي في الطراز: <span class="custom-tag">_#_entity.24_#_</span></span>
						</p>
					</li>
					<li style="text-align:right">
						<p class="dashed-ending">
							<span style="font-family:NotoNaskhArabic;">رقم التسجيل: <span class="custom-tag">_#_entity.25_#_</span></span>
						</p>
					</li>
					<li style="text-align:right">
						<p class="dashed-ending">
							<span style="font-family:NotoNaskhArabic;">سنة أول إستعمال: <span class="custom-tag">_#_entity.26_#_</span></span>
						</p>
					</li>
				</ul>`,
				},
			],
			{ returning: true }
		);

		await queryInterface.bulkInsert('EntityAttributes', [
			{
				EntityId: carEntityId,
				name: 'الطراز',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: carEntityId,
				name: 'النوع',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: carEntityId,
				name: 'الصنف',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: carEntityId,
				name: 'الرقم التسلسلي في الطراز',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: carEntityId,
				name: 'رقم التسجيل',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: carEntityId,
				name: 'سنة أول إستعمال',
				type: EntityAttributeTypes.String,
			},
		]);

		// ======= Fridha =======
		const fridhaEntityId = await queryInterface.bulkInsert(
			'Entities',
			[
				{
					name: 'فريضة',
					isAbstract: false,
					defaultTemplate: `<p style="text-align:right">
					<p class="dashed-ending">
						<span style="font-family:NotoNaskhArabic;">
							بصفتهم ورثة المرحوم <span class="custom-tag">_#_entity.28_#_</span> <span class="custom-tag">_#_entity.27_#_</span>
						</span>
					</p>
					<p class="dashed-ending">
						<span style="font-family:NotoNaskhArabic;">
							وهذا بموجب عقد فريضة محررة لدى مكتبنا نحن الأستاذ الموقع أدناه بتاريخ <span class="custom-tag">_#_entity.29(string)_#_</span> (<span class="custom-tag">_#_entity.29_#_</span>)
						</span>
					</p>
					<p class="dashed-ending">
						<span style="font-family:NotoNaskhArabic;">
							فهرس رقم <span class="custom-tag">_#_entity.30_#_</span>
						</span>
					</p>
					
					<p class="dashed-ending">
						<span style="font-family:NotoNaskhArabic;">
							و المسجلة بمفتشية التسجيل و الطابع <span class="custom-tag">_#_entity.31_#_</span>
						</span>
					</p>
					
					<p class="dashed-ending">
						<span style="font-family:NotoNaskhArabic;">
							بتاريخ <span class="custom-tag">_#_entity.32_#_</span>
						</span>
					</p>
					
					<p class="dashed-ending">
						<span style="font-family:NotoNaskhArabic;">
							وصل رقم <span class="custom-tag">_#_entity.33_#_</span>
						</span>
					</p>
				<p>`,
				},
			],
			{ returning: true }
		);

		await queryInterface.bulkInsert('EntityAttributes', [
			{
				EntityId: fridhaEntityId,
				name: 'إسم المتوفي',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: fridhaEntityId,
				name: 'لقب المتوفي',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: fridhaEntityId,
				name: 'تاريخ الفريضة',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityId: fridhaEntityId,
				name: 'رقم التسجيل',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: fridhaEntityId,
				name: 'مكان التسجيل',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: fridhaEntityId,
				name: 'تاريخ التسجيل',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityId: fridhaEntityId,
				name: 'رقم الوصل',
				type: EntityAttributeTypes.String,
			},
		]);

		// ======= Visa/Residence card =======
		const visaResidenceCardId = await queryInterface.bulkInsert(
			'Entities',
			[
				{
					name: 'وثيقة أجنبي',
					isAbstract: false,
					defaultTemplate: `<span class="custom-tag">_#_entity.34_#_</span> رقم <span class="custom-tag">_#_entity.35_#_</span> الصالحة إلى غاية <span class="custom-tag">_#_entity.37(string)_#_</span> (<span class="custom-tag">_#_entity.37_#_</span>) `,
				},
			],
			{ returning: true }
		);

		await queryInterface.bulkInsert('EntityAttributes', [
			{
				EntityId: visaResidenceCardId,
				name: 'النوع',
				type: EntityAttributeTypes.Enum,
				values: JSON.stringify(['بطاقة إقامة', 'تأشيرة']),
			},
			{
				EntityId: visaResidenceCardId,
				name: 'الرقم',
				type: EntityAttributeTypes.String,
			},
			{
				EntityId: visaResidenceCardId,
				name: 'تاريخ الإصدار',
				type: EntityAttributeTypes.Date,
			},
			{
				EntityId: visaResidenceCardId,
				name: 'تاريخ إنتهاء الصلاحية',
				type: EntityAttributeTypes.Date,
			},
		]);

		await queryInterface.bulkInsert('EntityRelationships', [
			{
				name: 'وثيقة أجنبي',
				FromEntityId: personEntityId,
				ToEntityId: visaResidenceCardId,
				defaultTemplate: `<span class="custom-tag">_#_fromEntity_#_</span> الحامل ل<span class="custom-tag">_#_toEntity_#_</span>`,
				order: 1,
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('EntityRelationships', null, {});
		await queryInterface.bulkDelete('EntityAttributes', null, {});
		await queryInterface.bulkDelete('Entities', null, {});
	},
};
