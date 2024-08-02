const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();
const authmiddleware = require("../middlewares/authmiddleware")

router.post("/register",userController.UserRegistration)
router.post("/login",userController.UserLogin)
router.get("/logout",authmiddleware,userController.UserLogout)

module.exports = router;