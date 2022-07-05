'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Documents', {
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
			UserId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Users', key: 'id' },
			},
			TemplateId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Templates', key: 'id' },
			},
			reference: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			date: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW'),
			},
			isFinalised: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Documents');
	},
};
