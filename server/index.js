const express = require("express");
const mongoose = require("mongoose");
const app = express();
const surveyRoute = require("./routes/surveyRoute")
const authRoute = require("./routes/authRoute")
var cors = require('cors')

const PORT = 4000;
app.use(cors())
app.use(express.json());

app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
})

mongoose.connect("mongodb+srv://atifkaaccount:atifkapassword@cluster0.f6kqesi.mongodb.net/surveys?retryWrites=true&w=majority").then(() => {
    console.log(`mongodb connected!`);
}).catch((err) => {
    console.log(err);
});

app.use("/api/survey", surveyRoute);

app.use("/api/auth", authRoute)

// This will be the last route else any after it won't work

// app.use("*", (req, res) => {
//     res.status(404).json({
//         success: "false",
//         message: "Page not found",
//         error: {
//             statusCode: 404,
//             message: "You reached a route that is not defined on this server",
//         },
//     });
// });

module.exports = app;
