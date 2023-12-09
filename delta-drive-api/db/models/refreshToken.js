"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        foreignKey: "userId",
        allowNull: false,
      });
    }

    static createToken = async function (user, t) {
      const expiredAt = new Date();

      expiredAt.setSeconds(
        expiredAt.getSeconds() + process.env.REFRESH_TOKEN_EXPIRY
      );

      const newToken = uuidv4();

      const refreshToken = await this.create({
        token: newToken,
        userId: user.id,
        expiryDate: expiredAt.getTime(),
      }, { transaction: t });

      return refreshToken.token;
    };

    static getOrCreateToken = async function (user, t) {
      const fetched = await RefreshToken.findOne({
        where: {
          userId: user.id,
        },
        transaction: t,
      });

      if (fetched) {
        return fetched.token;
      } else {
        await RefreshToken.createToken(user, t);
      }
    };

    static verifyExpiration = (token) => {
      return token.expiryDate.getTime() < new Date().getTime();
    };
  }
  RefreshToken.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "RefreshToken",
      timestamps: true,
      updatedAt: false,
    }
  );
  return RefreshToken;
};
