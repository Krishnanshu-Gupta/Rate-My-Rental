const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  overallRating: {
    type: Number,
    //required: true,
  },
  healthAndSafetyRating: {
    type: Number,
    //required: true,
  },
  repairsRating: {
    type: Number,
    //required: true,
  },
  respectRating: {
    type: Number,
    //required: true,
  },
  locationRating: {
    type: Number,
    //required: true,
  },
  amenitiesRating: {
    type: Number,
    //required: true,
  },
  writtenReview: {
    type: String,
    //required: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId, ref: "properties",
    //maybe change to "RateMyRentalsDB/properties"
    //required: true,
  },
  
});

const ReviewModel = mongoose.model("reviews", ReviewSchema);
module.exports = ReviewModel;