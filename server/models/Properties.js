const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  fullAddress: {
    type: String,
    //required: true
  },
  num_revs: {
    type: Number,
    //required: true
  },
  avg_ratings: {
    type: Array,
    default: [],
  },
  landlordName: {
    type: String,
    //required: true,
  },
  streetName: {
    type: String,
    // required: true,
  },
  apartmentNumber: {
    type: String,
  },
  city: {
    type: String,
    // required: true,
  },
  state: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  zipCode: {
    type: String,
    // required: true,
  },
  monthlyCostRange: {
    type: String,
  },
  lat: {
    type: Number,
    //required: true,
  },
  long: {
    type: Number,
    //required: true,
  },
});

const PropertyModel = mongoose.model("properties", PropertySchema);
module.exports = PropertyModel;