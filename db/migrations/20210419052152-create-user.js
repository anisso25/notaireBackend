'use strict';
const { roles: UserRoles } = require('../../utils/userValues.utils');
const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			OfficeId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Offices', key: 'id' },
			},
			type: {
				allowNull: false,
				type: Sequelize.ENUM,
				values: Object.values(UserRoles),
				defaultValue: UserRoles.Employee,
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING,
				unique: true,
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW'),
			},
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
		});

		const officeId = await queryInterface.bulkInsert(
			'Offices',
			[
				{
					name: 'مكتب المسير العام',
				},
			],
			{ returning: true }
		);

		await queryInterface.bulkInsert('Users', [
			{
				OfficeId: officeId,
				type: UserRoles.SuperAdmin,
				name: 'المسير العام',
				email: 'super_admin@yopmail.com',
				password: await bcrypt.hash('password', 8),
			},
		]);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Users');
	},
};
