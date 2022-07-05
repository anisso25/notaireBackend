'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Template extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Category);
			this.hasMany(models.TemplateEntity);
			this.hasMany(models.TemplateInputText);
		}
	}
	Template.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			CategoryId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			isPublished: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			content: {
				allowNull: false,
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
	return Template;
};
