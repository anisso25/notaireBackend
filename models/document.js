'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Document extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Office);
			this.belongsTo(models.Template);
			this.belongsTo(models.User);
			this.hasMany(models.DocumentInstance);
			this.hasMany(models.DocumentInputText);
			this.hasMany(models.AttachedFile);
		}
	}
	Document.init(
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
			UserId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			TemplateId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			reference: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			date: {
				allowNull: false,
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			isFinalised: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
				defaultValue: false,
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
	return Document;
};
