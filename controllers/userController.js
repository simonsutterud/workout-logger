const User = require("../models/userModel");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findOneAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
};
