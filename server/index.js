const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
const ReviewModel = require("./models/Reviews")
const PropertyModel = require("./models/Properties");
const ReportModel = require("./models/Reports");
const Axios = require("axios");
// import "/client/src/pages/writeReview.js"


const cors = require("cors");

app.use(express.json());
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(
  process.env.REACT_APP_MONGO_URI
);

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  await newUser.save();

  res.json(user);
});

app.get("/getReviews", (req, res) => {
  ReviewModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createReview", async(req, res) => {
  const review = req.body;
  const newReview = new ReviewModel(review);
  await newReview.save();

  res.json(review);
});

app.get("/getProperties", (req, res) => {
  PropertyModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createProperty", async(req, res) => {
  const property = req.body;
  const newProperty = new PropertyModel(property);
  await newProperty.save();

  res.json(newProperty);
});

app.put("/updateProperty/:id", async(req, res) => {
  const {id} = req.params;
  const updatedData = req.body;
  const updatedProperty = await PropertyModel.findByIdAndUpdate(id, updatedData, {
    new: true
  });
  res.json(updatedProperty);
});

app.get("/getReports", (req, res) => {
  ReportModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createReport", async(req, res) => {
  const report = req.body;
  const newReport = new ReportModel(report);
  await newReport.save();

  res.json(newReport);
});

app.listen(3001, () => {
  console.log("Listening on port 3001");
});