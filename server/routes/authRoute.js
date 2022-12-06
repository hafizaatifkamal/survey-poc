const express = require("express");
const Router = express.Router();

//const { verifyToken } = require("../middlewares/auth")

const {
    userSignup,
    userLogin
} = require("../controllers/userController");

Router.post("/register", userSignup);
Router.post("/login", userLogin);

module.exports = Router;