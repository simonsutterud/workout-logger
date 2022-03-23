const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your e-mail address"],
    validate: [validator.isEmail, "Please enter a valid e-mail address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: 8,
    select: false,
  },
  photo: String,
  workouts: [{ type: Schema.ObjectId, ref: "Workout" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  correctPassword
) {
  return await bcrypt.compare(candidatePassword, correctPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
