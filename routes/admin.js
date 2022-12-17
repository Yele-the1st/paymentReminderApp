const express = require("express");
const { body } = require("express-validator");

const adminController = require("../controllers/admin");

const router = express.Router();

//GET /admin/jobs
router.get("/jobs", adminController.getJobs);

//POST /admin/job
router.post(
  "/job",
  [
    body("clientFirstName", "Name has to be between 2 to 20 characters max")
      .trim()
      .isLength({ min: 2, max: 20 }),
    body("clientLastName", "Name has to be between 2 to 20 characters max")
      .isString()
      .trim()
      .isLength({ min: 2, max: 20 }),
    body("clientCompany", "Name has to be between 2 to 20 characters max")
      .isString()
      .trim()
      .isLength({ min: 2, max: 20 }),
    body("clientEmail")
      .isEmail()
      .withMessage("please enter a valid email address.")
      .normalizeEmail({ gmail_remove_dots: false }),
    body("jobTitle", "Title has to be between 4 to 30 characters max")
      .isString()
      .trim()
      .isLength({ min: 4, max: 30 }),
    body("jobDetails", "Details has to be between 2 to 400 characters max")
      .isString()
      .trim()
      .isLength({ min: 4, max: 400 }),
    body("completionDate").trim().isLength({ min: 4 }),
    body("feeAmount").isFloat(),
  ],
  adminController.postJob
);

// router.get("/admin/:jobId");
router.get("/:jobId", adminController.getJob)

module.exports = router;
