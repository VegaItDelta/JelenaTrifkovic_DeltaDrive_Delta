"use strict";
const {Model} = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.hasOne(models.AccessToken, {
                foreignKey: "userId",
                allowNull: false,
            });
            User.hasOne(models.RefreshToken, {
                foreignKey: "userId",
                allowNull: false,
            });
            User.hasMany(models.Rating, {
                foreignKey: "userId",
                allowNull: false,
            });
            User.hasMany(models.Booking, {
                foreignKey: "userId",
                allowNull: false,
            });
        }

        static createUser = async function (firstName, lastName, birthday, email, password, t) {
            const hashed = await bcrypt.hash(password, Number(process.env.PASSWORD_SALT));

            const created = await User.create({
                firstName,
                lastName,
                birthday,
                email,
                password: hashed,
            }, { transaction: t });

            return {...created.toJSON(), password: undefined};
        };

        static validateAndGetUser = async function (email, password, t) {
            const fetched = await User.findOne({
                where: {
                    email: email,
                },
                transaction: t,
            });

            if (fetched) {
                const isSame = await bcrypt.compare(password, fetched.password);
                return isSame ? ({ ...fetched.toJSON(), password: undefined }) : null;
            } else return null;
        };
    }

    User.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.BIGINT,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            birthday: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                isEmail: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: "User",
            timestamps: true,
        }
    );
    return User;
};
