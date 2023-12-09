const jwt = require("jsonwebtoken");
const { User } = require("../../db/models");

const { TokenExpiredError } = jwt;

const isEmailUnique = async (req, res, next) => {
  try {
    const { email } = req.body;

    const existing = await User.findOne({ where: { email } });

    if (existing) {
      return res.status(409).json({
        success: false,
        errorMessage: "Account with the email already exists",
      });
    }

    next();
  } catch (e) {
    console.error(e);
    return res.status(500);
  }
};

const verifyJwtToken = (req, res, next) => {
  let accessToken = req.headers["x-access-token"];

  if (!accessToken) {
    return res.status(403).json({
      success: false,
      errorMessage: "No access token provided",
    });
  }

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err && err instanceof TokenExpiredError) {
      return res.status(401).json({ message: "Access Token was expired" });
    }

    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized" + err,
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { isEmailUnique, verifyJwtToken };
