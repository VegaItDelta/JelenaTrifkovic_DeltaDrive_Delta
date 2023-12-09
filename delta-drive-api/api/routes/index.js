const auth = require("./auth");
const vehicle = require("./vehicle");
const booking = require("./booking");
const {verifyJwtToken} = require("../middlewares/auth");

const configureRoutes = (app) => {
  app.use("/auth", auth);
  app.use("/api/v1/vehicle", [verifyJwtToken], vehicle);
  app.use("/api/v1/booking", [verifyJwtToken], booking);
};

module.exports = { configureRoutes };
