'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('DocumentInstanceRelationships', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			ParentId: {
				allowNull: true,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'DocumentInstanceRelationships', key: 'id' },
				onDelete: 'CASCADE',
			},
			DocumentInstanceId: {
				allowNull: true,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'DocumentInstances', key: 'id' },
				onDelete: 'CASCADE',
			},
			InstanceRelationshipId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'InstanceRelationships', key: 'id' },
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
		await queryInterface.dropTable('DocumentInstanceRelationships');
	},
};
