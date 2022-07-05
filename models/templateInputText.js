'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class TemplateInputText extends Model {
		static associate(models) {
			this.belongsTo(models.Template);
			this.belongsTo(models.TemplateEntity);
			this.hasMany(models.DocumentInputText);
		}
	}
	TemplateInputText.init(
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
			TemplateEntityId: {
				allowNull: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			defaultValue: {
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
	return TemplateInputText;
};
