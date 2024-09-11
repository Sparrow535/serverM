const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const connectDB = require("./config/db");
require("./models/User");
require("./services/passport");

dotenv.config();
connectDB();

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/user", userRoutes);
app.use("/task", taskRoutes);

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT);
