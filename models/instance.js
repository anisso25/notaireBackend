'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Instance extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Office);
			this.belongsTo(models.Entity);
			this.belongsTo(models.User);
			this.hasMany(models.InstanceAttribute);
			this.hasMany(models.InstanceRelationship, {
				as: 'InstanceRelationshipFroms',
				foreignKey: 'ToInstanceId',
			});
			this.hasMany(models.InstanceRelationship, {
				as: 'InstanceRelationshipTos',
				foreignKey: 'FromInstanceId',
			});
			this.hasMany(models.DocumentInstance);
			this.hasMany(models.AttachedFile);
		}
	}
	Instance.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			OfficeId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			EntityId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			UserId: {
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
	return Instance;
};
