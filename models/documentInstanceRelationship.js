'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class DocumentInstanceRelationship extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.DocumentInstanceRelationship, {
				as: 'Parent',
				foreignKey: 'ParentId',
			});
			this.hasMany(models.DocumentInstanceRelationship, {
				as: 'Children',
				foreignKey: 'ParentId',
				onDelete: 'CASCADE',
			});
			this.belongsTo(models.DocumentInstance);
			this.belongsTo(models.InstanceRelationship);
		}
	}
	DocumentInstanceRelationship.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			ParentId: {
				allowNull: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			DocumentInstanceId: {
				allowNull: true,
				type: DataTypes.BIGINT.UNSIGNED,
			},
			InstanceRelationshipId: {
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
	return DocumentInstanceRelationship;
};
