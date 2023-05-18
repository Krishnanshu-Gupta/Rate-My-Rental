const mongoose = require("mongoose");

const ReviewsSchema = new mongoose.Schema({
  landlordName: {
    type: String,
    required: true,
  },
  streetName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  overallRating: {
    type: Number,
    required: true,
  },
  healthAndSafetyRating: {
    type: Number,
    required: true,
  },
  repairsRating: {
    type: Number,
    required: true,
  },
  respectRating: {
    type: Number,
    required: true,
  },
  locationRating: {
    type: Number,
    required: true,
  },
  writtenReview: {
    type: String,
    required: true,
  },
});

const ReviewsModel = mongoose.model("reviews", ReviewsSchema);
module.exports = ReviewsModel;
