'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, {
        foreignKey: "userId",
        allowNull: false,
      });
      Booking.belongsTo(models.Vehicle, {
        foreignKey: "vehicleId",
        allowNull: false,
      });
    }
  }
  Booking.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    latitudeStart: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitudeStart: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    latitudeEnd: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitudeEnd: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    totalPriceEUR: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Booking',
    timestamps: true,
    underscored: false,
  });
  return Booking;
};