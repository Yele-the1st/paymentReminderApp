const { validationResult, Result } = require("express-validator");

const Listing = require("../models/listing");

exports.getJobs = (req, res, next) => {
  Listing.find()
    .then((jobs) => {
      res.status(200).json({ message: "Fetched Jobs Succesfully", jobs: jobs });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postJob = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation faled, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const {
    clientFirstName,
    clientLastName,
    clientCompany,
    clientEmail,
    jobTitle,
    jobDetails,
    completionDate,
    feeAmount,
    imageUrl,
  } = req.body;
  const job = new Listing({
    clientFirstName,
    clientLastName,
    clientCompany,
    clientEmail,
    jobTitle,
    jobDetails,
    completionDate,
    feeAmount,
    imageUrl,
  });
  job
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Resource created successful",
        job: result._id,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getJob = (req, res, next) => {
  const jobId = req.params.jobId;
  Listing.findById(jobId)
    .then((job) => {
      if (!job) {
        const error = new Error("could not find Job");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: "Job fetched.", job: job });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
