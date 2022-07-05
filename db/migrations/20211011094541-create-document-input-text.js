'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('DocumentInputTexts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			DocumentId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Documents', key: 'id' },
			},
			TemplateInputTextId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'TemplateInputTexts', key: 'id' },
			},
			value: {
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
		await queryInterface.dropTable('DocumentInstances');
	},
};
