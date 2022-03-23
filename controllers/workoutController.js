const Workout = require("../models/workoutModel");
const User = require("../models/userModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllWorkouts = async (req, res, next) => {
  const workouts = await Workout.find();

  res.status(200).json({
    status: "success",
    results: workouts.length,
    data: {
      workouts,
    },
  });
};

exports.getWorkoutsByUser = async (req, res, next) => {
  const workouts = await Workout.find({ username: req.params.username });

  res.status(200).json({
    status: "success",
    results: workouts.length,
    data: {
      workouts,
    },
  });
};

exports.getWorkoutById = catchAsync(async (req, res, next) => {
  const workout = await Workout.find({ _id: req.params.id });

  if (!workout) return next(new AppError("No workout with that ID!", 404));

  res.status(200).json({
    status: "success",
    data: {
      workout,
    },
  });
});

exports.deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findOneAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        workout,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      data: {
        error: err.message,
      },
    });
  }
};

exports.newWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.create({
      title: req.body.title,
      description: req.body.description,
      photo: req.body.photo,
      type: req.body.type,
      sets: req.body.sets,
      username: req.body.username,
    });

    console.log(workout);

    await User.findOne({ username: req.body.username }, (err, user) => {
      if (err) throw new Error("Error");
      if (user) {
        // The below two lines will add the newly saved workout's
        // ObjectID to the the User's workouts array field
        user.workouts.push(workout);
        user.save();
      }
    }).clone();

    res.status(200).json({
      status: "success",
      data: {
        workout,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: {
        error: err.message,
      },
    });
  }
};

exports.updateWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedWorkout = {
      title: req.body.title,
      /* description: req.body.description,
      photo: req.body.photo,
      type: req.body.type, */
      sets: req.body.sets,
    };

    console.log(req.body.sets);

    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      updatedWorkout,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: "success",
      data: {
        workout,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      data: {
        error: err.message,
      },
    });
  }
};
