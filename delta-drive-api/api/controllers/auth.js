const {User, RefreshToken, AccessToken, sequelize} = require("../../db/models");
const jwt = require("jsonwebtoken");
const {unexpected} = require("../utils/errors/unexpected");
const {AccountFormDataSchema, AccountCredentialSchema} = require("../validators/auth");

const signUp = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {firstName, lastName, birthday, email, password} = req.body;

        AccountFormDataSchema.parse({firstName, lastName, birthday, email, password});

        const created = await User.createUser(firstName, lastName, birthday, email, password, t);

        if (!created) {
            await t.rollback();
            return res.status(409).json({
                success: false,
                errorMessage: "User not created",
            });
        }

        const accessToken = await AccessToken.createToken(created, t);
        const refreshToken = await RefreshToken.createToken(created, t);

        await t.commit();
        return res.status(201).json({
            success: true,
            data: {
                accessToken,
                refreshToken,
                user: created,
            },
        });
    } catch (e) {
        await t.rollback();
        return unexpected(res, e);
    }
};

const signIn = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const {email, password} = req.body;

        AccountCredentialSchema.parse({email, password});

        const fetched = await User.validateAndGetUser(email, password, t);

        if (!fetched) {
            await t.rollback();
            return res.status(401).json({
                success: false,
                errorMessage: "Invalid Credentials",
            });
        }

        const accessToken = await AccessToken.getOrCreateToken(fetched, t);
        const refreshToken = await RefreshToken.getOrCreateToken(fetched, t);

        await t.commit();
        return res.status(201).json({
            success: true,
            data: {
                accessToken,
                refreshToken,
                user: fetched,
            },
        });
    } catch (e) {
        await t.rollback();
        return unexpected(res, e);
    }
};

// const createNewAccessToken = async (req, res) => {
//     const {refreshToken} = req.body;
//
//     if (refreshToken == null) {
//         return res
//             .status(403)
//             .json({success: false, message: "Refresh Token is required"});
//     }
//
//     try {
//         const existing = await RefreshToken.findOne({
//             where: {token: refreshToken},
//         });
//
//         if (!existing) {
//             return res
//                 .status(403)
//                 .json({success: false, message: "Refresh token is not valid"});
//         }
//
//         if (RefreshToken.verifyExpiration(refreshToken)) {
//             await RefreshToken.destroy({where: {id: refreshToken.id}});
//
//             // new signin is needed
//             return res.status(403).json({
//                 message: "Refresh token was expired",
//             });
//         }
//
//         const User = await refreshToken.getUser();
//         const newAccessToken = jwt.sign(
//             {id: User.id},
//             process.env.JWT_SECRET_KEY,
//             {
//                 expiresIn: process.env.JWT_TOKEN_EXPIRY,
//             }
//         );
//
//         return res.status(200).json({
//             accessToken: newAccessToken,
//             refreshToken: refreshToken.token,
//         });
//     } catch (e) {
//         return unexpected(res, e);
//     }
// };

module.exports = {signUp, signIn};
