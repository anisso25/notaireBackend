'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('EntityRelationships', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			FromEntityId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Entities', key: 'id' },
			},
			ToEntityId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Entities', key: 'id' },
			},
			defaultTemplate: {
				allowNull: true,
				type: Sequelize.TEXT,
			},
			order: {
				allowNull: false,
				type: Sequelize.INTEGER.UNSIGNED,
				defaultValue: 0,
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
		await queryInterface.dropTable('EntityRelationships');
	},
};
