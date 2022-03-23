const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    /*     token, */
    data: {
      user,
    },
  });
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    createSendToken(newUser, 201, req, res);
  } catch (error) {
    res.status(500).json({
      status: "fail",
      data: error.message,
    });
  }
};

module.exports.login = async (req, res, next) => {
  const usesEmail = req.body.email != undefined;

  try {
    let user;
    if (usesEmail) {
      user = await User.findOne({
        email: req.body.email,
      }).select("+password");
    } else {
      user = await User.findOne({
        username: req.body.username,
      }).select("+password");
    }

    if (
      !user ||
      !(await user.correctPassword(req.body.password, user.password))
    ) {
      throw new Error("Incorrect email or password");
    }

    createSendToken(user, 200, req, res);
  } catch (error) {
    res.status(403).json({
      status: "fail",
      data: error.message,
    });
  }
};

module.exports.protect = async (req, res, next) => {
  try {
    // 1) Get token and check if it's there
    let token;

    console.log("COOKIES:" + req.cookies);

    if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token) throw new Error("You are not logged in");

    // 2) Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error(
        "The user which this token belongs to does not exist anymore"
      );
    }

    // Grant access to protected route
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    res.status(401).json({
      status: "fail",
      data: error.message,
    });
  }
};

module.exports.me = async (req, res, next) => {
  try {
    // 1) Get token and check if it's there
    let token;

    if (req.cookies.jwt) token = req.cookies.jwt;

    if (!token) throw new Error("You are not logged in");

    // 2) Verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error(
        "The user which this token belongs to does not exist anymore"
      );
    }

    res.status(200).json({
      status: "success",
      /*     token, */
      data: {
        currentUser,
      },
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      data: error.message,
    });
  }
};

module.exports.logOut = async (req, res, next) => {
  try {
    // 1) Get token and check if it's there
    let token;

    if (req.cookies.jwt) token = req.cookies.jwt;

    req.cookies.jwt = null;
    res.clearCookie("jwt");

    res.status(200).json({
      status: "success",
      message: "Successfully logged out",
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      data: error.message,
    });
  }
};
