'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class AttachedFile extends Model {
		static associate(models) {
			this.belongsTo(models.Instance);
			this.belongsTo(models.InstanceRelationship);
			this.belongsTo(models.Document);
		}
	}
	AttachedFile.init(
		{
			filename: {
				allowNull: false,
				type: DataTypes.STRING,
				primaryKey: true,
			},
			InstanceId: {
				allowNull: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			InstanceRelationshipId: {
				allowNull: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			DocumentId: {
				allowNull: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			title: {
				allowNull: false,
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
		},
		{
			sequelize,
		}
	);
	return AttachedFile;
};
