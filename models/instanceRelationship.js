'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class InstanceRelationship extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.EntityRelationship);
			this.belongsTo(models.Instance, { as: 'FromInstance' });
			this.belongsTo(models.Instance, { as: 'ToInstance' });
			this.hasMany(models.DocumentInstanceRelationship);
			this.hasMany(models.InstanceRelationshipAttribute);
			this.hasMany(models.AttachedFile);
		}
	}
	InstanceRelationship.init(
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
			FromInstanceId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			ToInstanceId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
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
	return InstanceRelationship;
};
