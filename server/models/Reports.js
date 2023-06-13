const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  reportText: {
    type: String,
    required: true,
  },
  reviewId: {
    type: mongoose.Schema.Types.ObjectId, ref: "reports",
    required: true,
  },
});

const ReportModel = mongoose.model("reports", ReportSchema);
module.exports = ReportModel;
