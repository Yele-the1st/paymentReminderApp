require("dotenv").config();

const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");

const adminRoutes = require("./routes/admin");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(express.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("imageUrl")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Acess-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/admin", adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

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
