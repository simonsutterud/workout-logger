const express = require("express");

const workoutController = require("../controllers/workoutController");
const authController = require("../controllers/authController");

const router = express.Router();

router.get("/", authController.protect, workoutController.getAllWorkouts);

router.get(
  "/:username",
  authController.protect,
  workoutController.getWorkoutsByUser
);

router.get(
  "/:username/:id",
  authController.protect,
  workoutController.getWorkoutById
);

router.post("/", authController.protect, workoutController.newWorkout);

router.patch("/:id", authController.protect, workoutController.updateWorkout);

router.delete("/:id", authController.protect, workoutController.deleteWorkout);

module.exports = router;
