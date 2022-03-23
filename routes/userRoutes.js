const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, userController.getAllUsers);

router.get("/me", authController.me);

router.post("/sign-up", authController.registerUser);

router.post("/login", authController.login);

router.get("/log-out", authController.logOut);

router.delete("/:id", authController.protect, userController.deleteUser);

module.exports = router;
