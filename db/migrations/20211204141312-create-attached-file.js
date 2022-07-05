'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('AttachedFiles', {
			filename: {
				allowNull: false,
				type: Sequelize.STRING,
				primaryKey: true,
			},
			InstanceId: {
				allowNull: true,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Instances', key: 'id' },
			},
			InstanceRelationshipId: {
				allowNull: true,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'InstanceRelationships', key: 'id' },
			},
			DocumentId: {
				allowNull: true,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Documents', key: 'id' },
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('AttachedFiles');
	},
};
