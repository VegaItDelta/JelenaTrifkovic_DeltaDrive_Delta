const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/auth");
const { isEmailUnique } = require("../middlewares/auth");

router.post("/sign-up", [isEmailUnique], signUp);
router.post("/sign-in", signIn);

module.exports = router;
