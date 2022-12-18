const fs = require("fs");
const path = require("path");

const { validationResult, Result } = require("express-validator");
const listing = require("../models/listing");

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

exports.postJob = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed, entered data is incorrect");
    error.statusCode = 422;
    throw error;
  }
  if (!req.file) {
    const error = new Error("No image provided.");
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
  } = req.body;
  const imageUrl = req.file.path;
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

exports.updateJob = (req, res, next) => {
  const jobId = req.params.jobId;
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
  } = req.body;
  let imageUrl = req.body.imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error("No file picked");
    error.statusCode = 422;
    throw error;
  }
  Listing.findById(jobId)
    .then((job) => {
      if (!job) {
        const error = new Error("Could not find Job.");
        error.statusCode = 404;
        throw error;
      }
      if (imageUrl !== job.imageUrl) {
        clearImage(job.imageUrl);
      }
      job.clientFirstName = clientFirstName;
      job.clientLastName = clientLastName;
      job.clientCompany = clientCompany;
      job.clientEmail = clientEmail;
      job.jobTitle = jobTitle;
      job.jobDetails = jobDetails;
      job.completionDate = completionDate;
      job.feeAmount = feeAmount;
      job.imageUrl = imageUrl;
      return job.save();
    })
    .then((results) => {
      res.status(200).json({ message: "Job  updated", job: results });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteJob = (req, res, next) => {
  const jobId = req.params.jobId;
  Listing.findById(jobId)
    .then((job) => {
      if (!job) {
        const error = new Error("Could not find Job.");
        error.statusCode = 404;
        throw error;
      }
      // Check logged in user
      clearImage(job.imageUrl);
      return Listing.findByIdAndRemove(jobId);
    })
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "Deleted Job" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    });
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
