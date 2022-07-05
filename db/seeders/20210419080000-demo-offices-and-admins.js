'use strict';

const { roles: UserRoles } = require('../../utils/userValues.utils');
const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		[1, 2, 3].forEach(async (count) => {
			let officeId = await queryInterface.bulkInsert(
				'Offices',
				[
					{
						name: 'الموثق ' + count,
						address: 'عنوان الموثق ' + count,
					},
				],
				{ returning: true }
			);

			await queryInterface.bulkInsert('Users', [
				{
					OfficeId: officeId,
					type: UserRoles.Admin,
					name: 'مسير المكتب ' + count,
					email: 'admin_' + count + '@yopmail.com',
					password: await bcrypt.hash('password', 8),
				},
			]);
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('Users', null, {});
		await queryInterface.bulkDelete('Offices', null, {});
	},
};
