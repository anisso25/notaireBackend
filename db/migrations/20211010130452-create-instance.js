'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Instances', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT.UNSIGNED
      },
      OfficeId: {
				allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Offices', key: 'id' },
      },
      EntityId: {
				allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Entities', key: 'id' },
      },
      UserId: {
				allowNull: false,
        type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Users', key: 'id' },
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
    await queryInterface.dropTable('Instances');
  }
};
