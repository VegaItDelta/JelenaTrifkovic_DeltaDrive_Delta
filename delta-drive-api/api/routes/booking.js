const express = require("express");
const {listBookings} = require("../controllers/booking");
const router = express.Router();

router.get("/history", listBookings);

module.exports = router;
