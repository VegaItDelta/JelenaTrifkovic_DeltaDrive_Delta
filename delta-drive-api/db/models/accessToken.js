"use strict";
const { Model } = require("sequelize");
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class AccessToken extends Model {
    static associate(models) {
      AccessToken.belongsTo(models.User, {
        foreignKey: "userId",
        allowNull: false,
      });
    }

    static createToken = async function (user, t) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "2d",
      });

      const expiredAt = new Date();

      expiredAt.setSeconds(
          expiredAt.getSeconds() + process.env.REFRESH_TOKEN_EXPIRY
      );

      const accessToken = await this.create({
        token,
        userId: user.id,
        expiryDate: expiredAt.getTime(),
      }, { transaction: t});

      return accessToken.token;
    };

    static getOrCreateToken = async function (user, t) {
      const fetched = await AccessToken.findOne({
        where: {
          userId: user.id,
        },
        transaction: t,
      });

      if (fetched) {
        return fetched.token;
      } else {
        await AccessToken.createToken(user, t);
      }
    };
  }
  AccessToken.init(
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
      modelName: "AccessToken",
      timestamps: true,
      updatedAt: false,
    }
  );
  return AccessToken;
};
