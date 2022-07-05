'use strict';
module.exports = {
up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Categories', {
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
    icon: {
				allowNull: true,
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
    await queryInterface.dropTable('Categories');
	}
};