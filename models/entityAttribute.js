'use strict';
const { Model } = require('sequelize');
const {
	attributeTypes: EntityAttributeTypes,
} = require('../utils/entityValues.utils');

module.exports = (sequelize, DataTypes) => {
	class EntityAttribute extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Entity);
			this.hasMany(models.InstanceAttribute);
		}
	}
	EntityAttribute.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			EntityId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			type: {
				allowNull: false,
				type: DataTypes.ENUM,
				values: Object.values(EntityAttributeTypes),
			},
			values: {
				allowNull: true,
				type: DataTypes.JSON,
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
	return EntityAttribute;
};
