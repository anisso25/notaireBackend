'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Entity extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Entity, {
				as: 'Parent',
				foreignKey: 'ParentId',
			});
			this.hasMany(models.Entity, {
				as: 'Children',
				foreignKey: 'ParentId',
			});
			this.hasMany(models.EntityRelationship, {
				as: 'EntityRelationshipFroms',
				foreignKey: 'ToEntityId',
			});
			this.hasMany(models.EntityRelationship, {
				as: 'EntityRelationshipTos',
				foreignKey: 'FromEntityId',
			});
			this.hasMany(models.Instance);
			this.hasMany(models.EntityAttribute);
		}
	}
	Entity.init(
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
			isAbstract: {
				allowNull: false,
				type: DataTypes.BOOLEAN,
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING,
			},
			defaultTemplate: {
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
	return Entity;
};
