'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class InstanceAttribute extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Instance);
			this.belongsTo(models.EntityAttribute);
		}
	}
	InstanceAttribute.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			InstanceId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			EntityAttributeId: {
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
	return InstanceAttribute;
};
