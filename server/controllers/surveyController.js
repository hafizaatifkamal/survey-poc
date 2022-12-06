require("dotenv").config();
const moment = require("moment");
const answerModel = require("../models/answerModel");
const surveyModel = require("../models/survey.model");
const validUrl = require("valid-url");
const shortid = require("shortid");
const baseUrl = process.env.SURVEYLINK;

const postQuestions = async (req, res) => {
    try {
        const newQuestions = await surveyModel({
            surveyName: req.body.surveyName,
            status: req.body.status,
            owner: req?.user?.user_id,
            questions: req.body?.questions,
            dueDate: req.body?.dueDate,
            active: true
        }).save();

        if (newQuestions && newQuestions._id) {
            const { longUrl, shortUrl, urlCode } = await generateURL(newQuestions?._id);
            const getData = await surveyModel.findOne({ _id: String(newQuestions?._id) });
            const updateURL = await surveyModel.findOneAndUpdate({ _id: String(newQuestions?._id) },
                {
                    urlCode: urlCode,
                    longUrl: longUrl,
                    shortUrl: shortUrl,
                },
                {
                    new: true
                });

            const resData = {
                code: 200,
                message: "question Created",
                data: newQuestions,
            };
            return res.status(200).send(resData);
        } else {
            return res.status(400).send({ code: 400, message: "Failed to create Questions", err: null, data: null })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            code: 500,
            message: "Failed to create Questions",
            err: error,
            data: null,
        });
    }
};

// const postAnswers = async (req, res) => {
//     try {
//         console.log(req.body.answers)
//         const surveyID = req.params.surveyID;
//         const quesExist = await surveyModel.findById(surveyID);
//         if (quesExist && quesExist?._id) {
//             const answers = await answerModel({
//                 surveyId: quesExist._id,
//                 owner: quesExist.owner,
//                 answers: req.body.answers,
//             });
//             answers.save();
//             return res.status(200).send({
//                 code: 200,
//                 message: "Answer submitted successfully",
//                 data: answers
//             });
//         } else {
//             return res.status(400).send({
//                 code: 400,
//                 message: "Survey Doesn't Exist",
//                 err: null,
//                 data: null,
//             });
//         }

//     } catch (error) {
//         console.log(error);
//         return res.status(500).send({
//             code: 500,
//             message: "Failed to Upload answers",
//             err: error,
//             data: null,
//         });
//     }
// };


const postAnswers = async (req, res) => {
    try {
        // console.log(req.body.answers)
        const surveyID = req.params.surveyID;
        const quesExist = await surveyModel.findById(surveyID);
        if (quesExist && quesExist?._id) {
            const ansPack = [];

            const ans = [];

            // const newAnswers = req.body.answers.forEach((val, index) => {
            //     // console.log(val);
            //     // console.log(index);
            //     if (val.questionType === "Mmcq") {

            //         let i = 0;
            //         while (i < val.answer.length) {
            //             ans.push(val.answer[i]);
            //             i++;
            //         }
            //         ansPack.push({ questionType: val.questionType, questionId: val.questionId, answer: ans });
            //         // console.log(ans)
            //         console.log(ansPack);
            //     }
            //     else {
            //         //  questionType: val.questionType,
            //     }
            // })

            console.log(req.body.answers)
            const answers = await answerModel({
                surveyId: quesExist._id,
                owner: quesExist.owner,
                answers: req.body.answers,
            });
            answers.save();
            return res.status(200).send({
                code: 200,
                message: "Answer submitted successfully",
                data: answers
            });
        } else {
            return res.status(400).send({
                code: 400,
                message: "Survey Doesn't Exist",
                err: null,
                data: null,
            });
        }

    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            code: 500,
            message: "Failed to Upload answers",
            err: error,
            data: null,
        });
    }
};




const getSurvey = async (req, res) => {
    try {
        const affirmativeArr = [];
        const singleMcqArr = [];
        const multipleMcqArr = [];
        let surveyData = await surveryForm.find({ _id: req.params.questionaireID });
        surveyData.forEach(async (data, i) => {
            let total = data.answers.length / data.questions.length;
            const individualCount = 0;
            const totalOptionsCount = 0;
            let answer_len = data.answers.length;
            for (j = 0; j < answer_len; j++) {
                if (
                    data.answers[j].answerType[0] === "singleMCQ" &&
                    data.questions[j]._id == data.answers[j].question_id &&
                    data.questions[j].questionType == data.answers[j].answerType[0]
                ) {
                    data.answerTypeCount[0] = data.answerTypeCount[0] + 1;
                    totalOptionsCount = totalOptionsCount + 1;
                    if (
                        data.answers[j].selectedAnswers[0].answer_id ==
                        data.questions[j].singleMcqOptions._id
                    ) {
                        individualCount = individualCount + 1;
                        singleMcqArr.push((individualCount / totalOptionsCount) * 100);
                    } else {
                        singleMcqArr.push((individualCount / totalOptionsCount) * 100);
                    }
                } else if (
                    data.answers[j].answerType[0] === "multipleMCQ" &&
                    data.questions[j]._id == data.answers[j].question_id &&
                    data.questions[j].questionType == data.answers[j].answerType[0]
                ) {
                    data.answerTypeCount[1] = data.answerTypeCount[1] + 1;
                    totalOptionsCount = totalOptionsCount + 1;
                    if (
                        data.answers[j].selectedAnswers[0].answer_id ==
                        data.questions[j].multipleMcqOptions._id
                    ) {
                        individualCount = individualCount + 1;
                        multipleMcqArr.push((individualCount / totalOptionsCount) * 100);
                    } else {
                        multipleMcqArr.push((individualCount / totalOptionsCount) * 100);
                    }
                } else if (
                    data.answers[j].answerType[0] === "Affirmative" &&
                    data.questions[j]._id == data.answers[j].question_id &&
                    data.questions[j].questionType == data.answers[j].answerType[0]
                ) {
                    data.answerTypeCount[3] = data.answerTypeCount[3] + 1;
                    totalOptionsCount = totalOptionsCount + 1;
                    if (
                        data.answers[j].selectedAnswers[0].answer_id ==
                        data.questions[j].affirmativeOptions._id
                    ) {
                        individualCount = individualCount + 1;
                        affirmativeArr.push((individualCount / totalOptionsCount) * 100);
                    } else {
                        affirmativeArr.push((individualCount / totalOptionsCount) * 100);
                    }
                } else {
                    data.answerTypeCount[2] = data.answerTypeCount[2] + 1;
                }
            }
            // console.log(multipleMcqArr);
        });
        // console.log(numOfUsers);
        // surveyData.forEach(async (data, i) => {
        //     console.log(data.answers[4].question_id);
        //     const questionType = await surveryForm.findById({ _id: data?.answers[i]?.question_id })
        //    // console.log(questionType)
        //     //  if(data.answers)
        // })

        const total_stats = { singleMcqArr, multipleMcqArr, affirmativeArr };
        surveyData = { ...surveyData, stats: total_stats };
        return res.status(200).send({
            code: 200,
            message: "data fetched successfully",
            err: null,
            data: surveyData,
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            code: 500,
            message: "Failed to fetch survey data",
            err: error,
            data: null,
        });
    }
};

const getSurveyDetails = async (req, res) => {
    try {
        const _id = req.params.surveyID;

        const getResponseData = await answerModel.find(
            { surveyId: _id },
            { _id: 0, answers: 1 }
        );
        // console.log(getResponseData)
        const finalData = [];
        for (let i = 0; i < getResponseData.length; i++) {
            let data = {
                ans: getResponseData[i].answers,
            };
            let data1, data2;

            const newObj = Object.assign({}, data1, getResponseData[i].answers);

            var size = Object.keys(newObj).length;
            for (let i = 0; i < size; i++) {
                const newObj1 = Object.assign({}, data2, newObj[i])
                //delete newObj1;
                finalData.push(newObj1);
            }
        }
        let result = [];

        // console.log(finalData)
        finalData.forEach(item => {
            //console.log(item);
            if (item.hasOwnProperty('ans') && (item.type === 'mcq' || item.type === 'boolean') && (item.ans[0] !== undefined || item.ans[0] !== null || item.ans[0] !== "")) {
                let resObj = result.find(resObj => (resObj.que === item.que && resObj.ans === item.ans[0])
                );
                resObj ? resObj.Count++ : result.push({ 'que': item.que, 'type': item.type, 'ans': item.ans[0], 'Count': 1 });

            }
            else if (item.hasOwnProperty('ans') && item.type === 'text' && (item.ans[0] !== undefined || item.ans[0] !== null || item.ans[0] !== "")) {
                let resObj = result.find(resObj => (resObj.que === item.que)
                );
                resObj ? resObj.Count++ : result.push({ 'que': item.que, 'type': item.type, 'Count': 1 });
            }
            // else if (item.hasOwnProperty('ans') && item.type === 'Mmcq' && (item.ans[0] !== undefined || item.ans[0] !== null || item.ans[0] !== "")) {
            //     // console.log(item)

            //     const options = [];
            //     let resObj = result.find(resObj => (resObj.que === item.que))
            //     let i = 0;
            //     if (resObj === undefined) {
            //         result.push({ 'que': item.que, 'type': item.type, 'Count': [], 'ans': item.ans })
            //     }
            //     resObj = result.find(resObj => (resObj.que === item.que))
            //     while (i < item.ans.length) {
            //         const resOps = options.find(resOps => (resOps.que === item.que && resOps.ans[i] === item.ans[i]))
            //         if (resObj.que === item.que && resObj.ans[i] === item.ans[i]) {
            //             if (resOps) {
            //                 resOps.Count++

            //             }
            //             else {
            //                 options.push({ 'que': item.que, 'ans': item.ans[i], 'type': item.type, 'Count': 1 })
            //             }


            //         }
            //         i++;
            //     }
            //     resObj.Count = options
            // }
            else if(item.hasOwnProperty('ans') && item.type === 'Mmcq' && (item?.ans?.length !== 0)) {
                for (let i =0; i< item?.ans?.length; i++){
                    let resObj = result.find(resObj => (resObj.que === item.que && resObj.ans === item.ans[i])
                    );
                    resObj ? resObj.Count++ : result.push({ 'que': item.que, 'type': item.type, 'ans': item.ans[i], 'Count': 1 });
                }
                
            }

        });

        let totalCountData = [];
        finalData.forEach(item => {
            if (item.hasOwnProperty('ans') && (item.ans !== undefined || item.ans !== null || item.ans !== "")) {
                let resObj = totalCountData.find(resObj => (resObj.que === item.que)
                );

                resObj ? resObj.Count++ : totalCountData.push({ 'que': item.que, 'type': item.type, 'Count': 1 });
            }
            // else {
            //     totalCountData.push({ 'que': item.que, 'type': item.type, 'Count': 0 });
            // }
        });

        return res.status(200).send({
            code: 200,
            message: "data fetched successfully",
            data: { finalData: result, answerList: finalData, totalCountData, totalResponse: getResponseData.length },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            code: 500,
            message: "Failed to fetch survey data",
            err: error,
            data: null,
        });
    }
};

const getSurveyQuestionaire = async (req, res) => {
    try {
        const _id = req.params.surveyID;

        const getResponseData = await surveyModel.findById(_id);
        return res.status(200).send({
            code: 200,
            message: "data fetched successfully",
            data: getResponseData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            code: 500,
            message: "Failed to fetch survey data",
            err: error,
            data: null,
        });
    }
};

const getSurveyList = async (req, res) => {
    try {
        const userId = req.user.user_id;
        const getResponseData = await surveyModel
            .find(
                { owner: userId });
        return res.status(200).send({
            code: 200,
            message: "data fetched successfully",
            data: getResponseData,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            code: 500,
            message: "Failed to fetch survey list",
            err: error,
            data: null,
        });
    }
};

const getFilteredSurveyList = async (req, res) => {
    try {
        const query = req.query.status;
        const userId = req.user.user_id;
        let data = null;
        if (query === "true") {
            data = await surveyModel.find({ owner: userId, active: true })
        }
        else {
            data = await surveyModel.find({ owner: userId, active: false })
        }
        return res.status(200).send({
            code: 200,
            message: "data fetched successfully",
            data: data,
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: "Failed to fetch survey Active/Inactive data",
            err: error,
            data: null,
        });

    }
}

const updateStatus = async (req, res) => {
    try {
        console.log(req.body)
        const status = await surveyModel.findByIdAndUpdate(
            { _id: req.params._id },
            { active: req.body.active },
            {
                new: true
            }
        )
        console.log()
        return res.status(200).send({
            code: 200,
            message: "Status updated successfully",
            data: status,
        });
    } catch (error) {
        return res.status(500).send({
            code: 500,
            message: "Failed to update active status",
            err: error,
            data: null,
        });
    }
}

async function generateURL(id) {
    // if valid, we create the url code
    const urlCode = shortid.generate();
    // if (!validUrl.isUri(baseUrl)) {
    //     return res.status(401).json("Invalid base URL");
    // }
    const longUrl = `${baseUrl}/${id}`;
    const shortUrl = baseUrl + "/" + urlCode;
    return { longUrl, shortUrl, urlCode };
}

const redirectToLongUrl = async (req, res) => {
    try {
        const url = await surveyModel.findOne({
            urlCode: req.params.code,
        });
        if (url) {
            // when valid we perform a redirect
            return res.status(200).send({ code: 200, message: "Fetched Successfully", data: url });
        } else {
            // else return a not found 404 status
            return res.status(404).send({ code: 404, message: "No URL Found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            code: 500,
            message: "Failed to fetch survey data",
            err: error,
            data: null,
        });
    };
}

module.exports = {
    postQuestions,
    postAnswers,
    getSurvey,
    getSurveyDetails,
    getSurveyQuestionaire,
    getSurveyList,
    redirectToLongUrl,
    getFilteredSurveyList,
    updateStatus
};
