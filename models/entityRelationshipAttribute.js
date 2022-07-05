'use strict';
const { Model } = require('sequelize');
const {
	attributeTypes: EntityAttributeTypes,
} = require('../utils/entityValues.utils');

module.exports = (sequelize, DataTypes) => {
	class EntityRelationshipAttribute extends Model {
		static associate(models) {
			this.belongsTo(models.EntityRelationship);
			this.hasMany(models.InstanceRelationshipAttribute);
		}
	}
	EntityRelationshipAttribute.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			EntityRelationshipId: {
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
	return EntityRelationshipAttribute;
};
