'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('TemplateInputTexts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			TemplateId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Templates', key: 'id' },
			},
			TemplateEntityId: {
				allowNull: true,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'TemplateEntities', key: 'id' },
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			defaultValue: {
				allowNull: true,
				type: Sequelize.TEXT,
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
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('TemplateInputTexts');
	},
};
