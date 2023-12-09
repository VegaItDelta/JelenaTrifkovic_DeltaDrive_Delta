'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    static associate(models) {
      Rating.belongsTo(models.User, {
        foreignKey: "userId",
        allowNull: false,
      });
      Rating.belongsTo(models.Vehicle, {
        foreignKey: "vehicleId",
        allowNull: false,
      });
    }
  }
  Rating.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rating',
    timestamps: true,
    underscored: false,
  });
  return Rating;
};