'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DocumentInputText extends Model {
		static associate(models) {
			this.belongsTo(models.Document);
			this.belongsTo(models.TemplateInputText);
		}
	}
	DocumentInputText.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			DocumentId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			TemplateInputTextId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			value: {
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
	return DocumentInputText;
};
