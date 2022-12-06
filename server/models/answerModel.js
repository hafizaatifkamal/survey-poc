const mongoose = require("mongoose");
const moment = require("moment");


const answerModel = mongoose.Schema({
    type: { type: String, enum: ["text", "mcq", "boolean", "Mmcq", "rating"] },
    que: { type: String },
    ans: [{ type: String }]
})

const answerSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
    },
    surveyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Survey",
    },
    answers: {
        type: Object,
    },
    createdAt: {
        type: Date,
        default: moment().format(),
    }

})



module.exports = mongoose.model("answers", answerSchema)