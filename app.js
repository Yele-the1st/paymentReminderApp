require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");

const app = express();

app.use(express.json());

app.use("/admin", adminRoutes);

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
