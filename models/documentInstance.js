'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DocumentInstance extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Document);
			this.belongsTo(models.TemplateEntity);
			this.belongsTo(models.Instance);
			this.hasMany(models.DocumentInstanceRelationship, {
				onDelete: 'CASCADE',
			});
		}
	}
	DocumentInstance.init(
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
			TemplateEntityId: {
				allowNull: false,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			InstanceId: {
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
		},
		{
			sequelize,
		}
	);
	return DocumentInstance;
};
