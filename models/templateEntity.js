'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TemplateEntity extends Model {
		static associate(models) {
			this.belongsTo(models.Template);
			this.hasMany(models.TemplateInputText);
			this.belongsTo(models.Entity);
			this.hasMany(models.DocumentInstance);
		}
	}
	TemplateEntity.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			TemplateId: {
				allowNull: false,
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
			customTemplate: {
				allowNull: true,
				type: DataTypes.TEXT,
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
	return TemplateEntity;
};
