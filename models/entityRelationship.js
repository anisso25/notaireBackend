'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class EntityRelationship extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Entity, { as: 'FromEntity' });
			this.belongsTo(models.Entity, { as: 'ToEntity' });
			this.hasMany(models.EntityRelationshipAttribute);
		}
	}
	EntityRelationship.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			FromEntityId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			ToEntityId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			defaultTemplate: {
				allowNull: true,
				type: DataTypes.TEXT,
			},
			order: {
				allowNull: false,
				type: DataTypes.INTEGER.UNSIGNED,
				defaultValue: 0,
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			deletedAt: {
				allowNull: true,
				type: DataTypes.DATE,
			},
		},
		{
			sequelize,
			paranoid: true,
		}
	);
	return EntityRelationship;
};
