const Listing = require("../models/listing");
const adminServices = require("../services/admin");

exports.getJobs = (req, res, next) => {
  Listing.find()
    .then((jobs) => {
      res.status(200).json({ message: "Fetched Jobs Succesfully", jobs: jobs });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postJob = async (req, res, next) => {
  try {
    const job = await adminServices.createJob(req);
    return res.status(201).json({
      message: "job created successfully",
      job: job,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
