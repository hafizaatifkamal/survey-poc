const mongoose = require("mongoose");
const moment = require("moment");

const surveyModel = new mongoose.Schema({
  surveyName: {
    type: String,
  },
  status: {
    type: String,
    enum: ["DRAFT", "COMPLETED"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questions: [
    {
      title: { type: String },
      questionType: { type: String, enum: ["text", "mcq", "boolean", "Mmcq"] },
      options: [
        {
          optionText: { type: String },
        },
      ],
    },
  ],
  urlCode: {
    type: String,
  },
  longUrl: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: moment().format(),
  },
  dueDate: {
    type: Date,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  rating: { type: Number }
});

module.exports = mongoose.model("Survey", surveyModel);
