const mongoose = require("mongoose");
const setSchema = require("./setModel");

const workoutSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "Styrke",
  },
  title: {
    type: String,
    default: `no change-`,
  },
  description: String,
  date: {
    type: Date,
    default: Date.now(),
  },
  photo: String,
  sets: {
    type: [setSchema],
    required: [true, "A workout must contain at least one set!"],
  },
  username: String,
});

workoutSchema.pre("save", function () {
  if (this.title === `no change-`)
    this.title = `${this.type}, ${new Date(Date.now()).toLocaleDateString(
      "no-NO"
    )}`;
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
