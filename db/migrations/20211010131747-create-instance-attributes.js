'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('InstanceAttributes', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			InstanceId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Instances', key: 'id' },
			},
			EntityAttributeId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'EntityAttributes', key: 'id' },
			},
			value: {
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
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('InstanceAttributes');
	},
};
