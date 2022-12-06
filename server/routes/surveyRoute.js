const express = require("express");
const Router = express.Router();

const {
  postAnswers,
  postQuestions,
  getSurvey,
  getSurveyDetails,
  getSurveyQuestionaire,
  getSurveyList,
  redirectToLongUrl,
  updateStatus,
  getFilteredSurveyList
} = require("../controllers/surveyController");
const { verifyToken } = require("../middlewares/auth");


Router.get("/list/", verifyToken, getSurveyList);
Router.post("/questions/", verifyToken, postQuestions); //for owner
Router.post("/answers/:surveyID", postAnswers); //for all users
Router.get("/getData/:surveyID", verifyToken, getSurveyDetails);
Router.get("/surveyData/:surveyID", verifyToken, getSurvey);
Router.get("/filteredList/", verifyToken, getFilteredSurveyList);
Router.patch("/updateStatus/:_id", verifyToken, updateStatus)
Router.get("/questionaire/:surveyID", getSurveyQuestionaire);
Router.get("/:code", redirectToLongUrl);

module.exports = Router;
