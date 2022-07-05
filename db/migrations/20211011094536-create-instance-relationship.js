'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('InstanceRelationships', {
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
			FromInstanceId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Instances', key: 'id' },
			},
			ToInstanceId: {
				allowNull: false,
				type: Sequelize.BIGINT.UNSIGNED,
				references: { model: 'Instances', key: 'id' },
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

		await queryInterface.sequelize.query(
			'CREATE TRIGGER before_insert_check_from_not_equal_to ' +
				'BEFORE INSERT ' +
				'ON InstanceRelationships ' +
				'FOR EACH ROW ' +
				'BEGIN ' +
				'IF (NEW.FromInstanceId = NEW.ToInstanceId) THEN ' +
				"SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'FromInstanceId cannot be equal to ToInstanceId';" +
				'END IF;' +
				'END;'
		);

		await queryInterface.sequelize.query(
			'CREATE TRIGGER before_update_check_from_not_equal_to ' +
				'BEFORE UPDATE ' +
				'ON InstanceRelationships ' +
				'FOR EACH ROW ' +
				'BEGIN ' +
				'IF (NEW.FromInstanceId = NEW.ToInstanceId) THEN ' +
				"SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'FromInstanceId cannot be equal to ToInstanceId';" +
				'END IF;' +
				'END;'
		);
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTrigger(
			'InstanceRelationships',
			'before_insert_check_from_not_equal_to'
		);

		await queryInterface.dropTrigger(
			'InstanceRelationships',
			'before_update_check_from_not_equal_to'
		);

		await queryInterface.dropTable('InstanceRelationships');
	},
};
