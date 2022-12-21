require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');
const passportJWT = require('passport-jwt');
const bodyParser = require('body-parser');

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth")
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/admin", adminRoutes);
app.use("/auth", authRoutes);

//connecting to DB & Starting Server
const PORT = process.env.PORT || 1000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(PORT);
    console.log("Connection to DB has been established successfully.");
    console.log(`server up on ${PORT}`);
  })
  .catch((err) => {
    console.log("Unable to connect to the database:", err);
  });
