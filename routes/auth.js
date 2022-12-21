const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

//Signup
router.post("/signup", authController.register);
router.post("/login", authController.login)

module.exports = router;
