const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

//GET /admin/jobs
router.get("/jobs", adminController.getJobs);

//POST /admin/job
router.post("/job", adminController.postJob);

// router.get("/admin/:jobId");

module.exports = router;
