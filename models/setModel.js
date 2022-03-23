const mongoose = require("mongoose");

const setSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  rpe: {
    type: Number,
    min: [1, "RPE must be between 1 and 10"],
    max: [10, "RPE must be between 1 and 10"],
  },
});

const Set = mongoose.model("Set", setSchema);

module.exports = setSchema;
