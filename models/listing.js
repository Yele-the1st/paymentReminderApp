const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  clientFirstName: {
    type: String,
    required: true,
  },

  clientLastName: {
    type: String,
    required: true,
  },
  clientCompany: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  jobDetails: {
    type: String,
    required: true,
  },
  completionDate: {
    type: String,
    required: true,
  },
  feeAmount: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('Listing', listingSchema);
