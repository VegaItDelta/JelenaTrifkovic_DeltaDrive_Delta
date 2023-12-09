const express = require("express");
const {search, requestBooking, rateDriver} = require("../controllers/vehicle");
const router = express.Router();

router.get("/search", search);
router.post("/:vehicleId/request-booking", requestBooking);
router.post("/:vehicleId/booking/:bookingId/rate", rateDriver);

module.exports = router;
