const Listing = require("../models/listing");

module.exports = {
  createJob: async (req) => {
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
    job.save();
    console.log(job._id)
    return job
  },
};
