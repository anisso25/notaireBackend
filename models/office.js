'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Office extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.hasMany(models.User);
			this.hasMany(models.Instance);
		}
	}
	Office.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			address: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			reference: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
				defaultValue: 1,
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
	return Office;
};
