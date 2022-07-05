'use strict';

const {
	Instance: InstanceModel,
	InstanceAttribute: InstanceAttributeModel,
} = require('../../models');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const officeId = 2,
			userId = 2;

		// Person
		const persons = [
			[
				'سليماني',
				'علال',
				'بوزريعة',
				'1985-12-12',
				'1123',
				'4',
				'رجل',
				'عنوان علال',
			],
			[
				'بسلول',
				'خولة',
				'عين طاية',
				'2001-01-31',
				'2541',
				'4',
				'إمرأة',
				'عنوان خولة',
			],
			[
				'بوخالفة',
				'زكرياء',
				'أدرار',
				'1999-02-22',
				'0012',
				'4',
				'رجل',
				'عنوان زكرياء',
			],
			[
				'نصري',
				'جميلة',
				'عين وسارة',
				'1975-06-05',
				'31231',
				'4',
				'إمرأة',
				'عنوان جميلة',
			],
			[
				'حمداش',
				'علي سعيد',
				'البيض',
				'1964-11-05',
				'2119',
				'4',
				'رجل',
				'عنوان علي سعيد',
			],
			[
				'حمداش',
				'وردة',
				'البيض',
				'1973-11-27',
				'1211',
				'4',
				'إمرأة',
				'عنوان وردة',
			],
			[
				'آل مجزم',
				'عبد الله',
				'دبي',
				'1988-02-27',
				'3211',
				'232',
				'رجل',
				'عنوان عبد الله',
			],
			[
				'الغنيس',
				'لطيفة',
				'سوسة',
				'1973-11-27',
				'1298',
				'225',
				'إمرأة',
				'عنوان لطيفة',
			],
		];

		for (let person of persons) {
			let attributeId = 1;
			await InstanceModel.create(
				{
					OfficeId: officeId,
					UserId: userId,
					EntityId: 2, // personEntityId
					InstanceAttributes: person.map((value) => {
						return {
							EntityAttributeId: attributeId++,
							value,
						};
					}),
				},
				{
					include: [InstanceAttributeModel],
				}
			);
		}

		// Company
		const companies = [
			[
				'شركة ذات ﻣﺴﺆوﻟﯿﺔ ﻣﺤﺪودة (ش ذ م م)',
				'ديفلوباتيك',
				'100.000,00',
				'مدية',
				'16752ب383',
				'2015-02-22',
				'232322676552',
			],
			[
				'شركة ذات أسهم (ش ذ أ)',
				'الإبتسامة',
				'990.000.000,00',
				'عنابة',
				'2887آ763',
				'1999-07-22',
				'323273200737',
			],
		];

		for (let company of companies) {
			let attributeId = 9;
			await InstanceModel.create(
				{
					OfficeId: officeId,
					UserId: userId,
					EntityId: 3, // companyEntityId
					InstanceAttributes: company.map((value) => {
						return {
							EntityAttributeId: attributeId++,
							value,
						};
					}),
				},
				{
					include: [InstanceAttributeModel],
				}
			);
		}

		// Company-Person
		await queryInterface.bulkInsert('InstanceRelationships', [
			{
				EntityRelationshipId: 1,
				FromInstanceId: 9,
				ToInstanceId: 1,
			},
			{
				EntityRelationshipId: 1,
				FromInstanceId: 10,
				ToInstanceId: 2,
			},
		]);

		await queryInterface.bulkInsert('InstanceRelationshipAttributes', [
			{
				InstanceRelationshipId: 1,
				EntityRelationshipAttributeId: 1,
				value: 'شريك مؤسس',
			},
			{
				InstanceRelationshipId: 2,
				EntityRelationshipAttributeId: 1,
				value: 'مساعد المؤسس',
			},
		]);

		// Procuration Person-Person
		await queryInterface.bulkInsert('InstanceRelationships', [
			{
				EntityRelationshipId: 2,
				FromInstanceId: 1,
				ToInstanceId: 2,
			},
			{
				EntityRelationshipId: 2,
				FromInstanceId: 2,
				ToInstanceId: 3,
			},
		]);

		await queryInterface.bulkInsert('InstanceRelationshipAttributes', [
			{
				InstanceRelationshipId: 3,
				EntityRelationshipAttributeId: 2,
				value: 'الأستاذين عبادو سعيد وجديدي معراج شركة مدنية للتوثيق',
			},
			{
				InstanceRelationshipId: 3,
				EntityRelationshipAttributeId: 3,
				value: '2020-01-28',
			},
			{
				InstanceRelationshipId: 3,
				EntityRelationshipAttributeId: 4,
				value: 'ABC365',
			},
			{
				InstanceRelationshipId: 3,
				EntityRelationshipAttributeId: 5,
				value: '2020-02-02',
			},
			{
				InstanceRelationshipId: 3,
				EntityRelationshipAttributeId: 6,
				value: '1223YE7',
			},
		]);

		await queryInterface.bulkInsert('InstanceRelationshipAttributes', [
			{
				InstanceRelationshipId: 4,
				EntityRelationshipAttributeId: 2,
				value: 'نفس المكتب',
			},
			{
				InstanceRelationshipId: 4,
				EntityRelationshipAttributeId: 3,
				value: '2019-11-02',
			},
			{
				InstanceRelationshipId: 4,
				EntityRelationshipAttributeId: 4,
				value: 'YE763',
			},
			{
				InstanceRelationshipId: 4,
				EntityRelationshipAttributeId: 5,
				value: '2019-11-15',
			},
			{
				InstanceRelationshipId: 4,
				EntityRelationshipAttributeId: 6,
				value: 'EZU3763',
			},
		]);

		// ID doc
		const idDocs = [
			[
				'بطاقة التعريف الوطنية بيومترية',
				'32532',
				'2001-12-01',
				'2011-12-01',
				'بلدية الحراش',
			],
			[
				'جواز السفر بيومتري',
				'2358723',
				'1998-11-05',
				'2008-11-05',
				'سفارة فرنسا',
			],
			[
				'رخصة السياقة بيومترية',
				'42431',
				'2021-07-22',
				'2031-07-2',
				'بلدية القصر',
			],
			[
				'بطاقة التعريف الوطنية عادية',
				'43113',
				'2010-12-01',
				'2020-12-01',
				'ولاية أدرار',
			],
		];

		for (let idDoc of idDocs) {
			let attributeId = 16;
			await InstanceModel.create(
				{
					OfficeId: officeId,
					UserId: userId,
					EntityId: 4, // idDocumentEntityId
					InstanceAttributes: idDoc.map((value) => {
						return {
							EntityAttributeId: attributeId++,
							value,
						};
					}),
				},
				{
					include: [InstanceAttributeModel],
				}
			);
		}

		await queryInterface.bulkInsert('InstanceRelationships', [
			{
				EntityRelationshipId: 3,
				FromInstanceId: 1,
				ToInstanceId: 11,
			},
			{
				EntityRelationshipId: 3,
				FromInstanceId: 1,
				ToInstanceId: 12,
			},
			{
				EntityRelationshipId: 3,
				FromInstanceId: 2,
				ToInstanceId: 13,
			},
			{
				EntityRelationshipId: 3,
				FromInstanceId: 3,
				ToInstanceId: 14,
			},
		]);

		// Car
		const cars = [
			['AU', 'Volkswagen', 'Tiguan', 'XAUDHH222', '1234-00-16', '2019'],
			['XA', 'Renault', 'Megan', '23527DD', '09333-99-16', '1999'],
			['SUV', 'Audi', 'A3', '763NBC', '19872-21-09', '2021'],
			['XA', 'Suzuki', 'Maruti', '23762HHD', '26352-11-26', '2011'],
		];

		for (let car of cars) {
			let attributeId = 21;
			await InstanceModel.create(
				{
					OfficeId: officeId,
					UserId: userId,
					EntityId: 5, // carEntityId
					InstanceAttributes: car.map((value) => {
						return {
							EntityAttributeId: attributeId++,
							value,
						};
					}),
				},
				{
					include: [InstanceAttributeModel],
				}
			);
		}

		// Fridha
		const fridhas = [
			['زبير', 'سعدان', '1999-01-22', '125233', 'مدية', '1999-02-22', '23232'],
			['أحمد', 'وارو', '1999-06-22', '23232', 'عنابة', '1999-07-22', '328532'],
		];

		for (let fridha of fridhas) {
			let attributeId = 27;
			await InstanceModel.create(
				{
					OfficeId: officeId,
					UserId: userId,
					EntityId: 6, // fridhaEntityId
					InstanceAttributes: fridha.map((value) => {
						return {
							EntityAttributeId: attributeId++,
							value,
						};
					}),
				},
				{
					include: [InstanceAttributeModel],
				}
			);
		}

		// Visa/Residence card
		const visaResidenceCards = [
			['بطاقة إقامة', '32532', '2021-12-01', '2025-12-01'],
			['تأشيرة', '2358723', '2021-11-05', '2023-11-05'],
		];

		for (let visaResidenceCard of visaResidenceCards) {
			let attributeId = 34;
			await InstanceModel.create(
				{
					OfficeId: officeId,
					UserId: userId,
					EntityId: 7, // visaResidenceCardId
					InstanceAttributes: visaResidenceCard.map((value) => {
						return {
							EntityAttributeId: attributeId++,
							value,
						};
					}),
				},
				{
					include: [InstanceAttributeModel],
				}
			);
		}

		await queryInterface.bulkInsert('InstanceRelationships', [
			{
				EntityRelationshipId: 4,
				FromInstanceId: 7,
				ToInstanceId: 21,
			},
			{
				EntityRelationshipId: 4,
				FromInstanceId: 7,
				ToInstanceId: 22,
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('InstanceRelationships', null, {});
		await queryInterface.bulkDelete('InstanceAttributes', null, {});
		await queryInterface.bulkDelete('Instances', null, {});
	},
};
