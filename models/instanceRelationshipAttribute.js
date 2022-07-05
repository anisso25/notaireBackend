'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class InstanceRelationshipAttribute extends Model {
		static associate(models) {
			this.belongsTo(models.InstanceRelationship);
			this.belongsTo(models.EntityRelationshipAttribute);
		}
	}
	InstanceRelationshipAttribute.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			InstanceRelationshipId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			EntityRelationshipAttributeId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			value: {
				allowNull: true,
				type: DataTypes.STRING,
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
	return InstanceRelationshipAttribute;
};
