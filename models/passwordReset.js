'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User);
    }
  };
  PasswordReset.init({
    UserId: {
      allowNull: false,
      type: DataTypes.BIGINT.UNSIGNED,
    },
    token: {
      allowNull: false,
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
  }, {
    sequelize,
    paranoid: true,
  });
  return PasswordReset;
};
