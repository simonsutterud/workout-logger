const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

const userRouter = require("./routes/userRoutes");
const workoutRouter = require("./routes/workoutRoutes");

mongoose
  .connect(process.env.DATABASE_URL, {
    keepAlive: true,
  })
  .then(console.log("DB connected!"))
  .catch((err) => console.log(err));

const app = express();

app.set("trust proxy", 1);

app.use(express.static(path.join(__dirname, "client/build")));

app.use(mongoSanitize());

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.ip);
  next();
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/workouts", workoutRouter);

app.all("/api/*", (req, res, next) =>
  res.status(404).json({
    message: "fail",
    data: "This route has not yet been defined!",
    url: req.url,
  })
);

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname + "/client/build/index.html"))
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
