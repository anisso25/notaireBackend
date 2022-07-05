'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Entities', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.BIGINT.UNSIGNED,
			},
			ParentId: {
				allowNull: true,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Entities', key: 'id' },
			},
			isAbstract: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			defaultTemplate: {
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
			deletedAt: {
				allowNull: true,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Entities');
	},
};
