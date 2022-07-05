'use strict';
const {
	attributeTypes: EntityAttributeTypes,
} = require('../../utils/entityValues.utils');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('EntityRelationshipAttributes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			EntityRelationshipId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'EntityRelationships', key: 'id' },
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			type: {
				allowNull: false,
				type: Sequelize.ENUM,
				values: Object.values(EntityAttributeTypes),
			},
			values: {
				allowNull: true,
				type: Sequelize.JSON,
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
		await queryInterface.dropTable('EntityRelationshipAttributes');
	},
};
