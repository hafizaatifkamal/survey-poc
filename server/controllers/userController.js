require("dotenv").config();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const privateKey = "Valuebound"

const userLogin = async (req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, email, role: user.role },
                privateKey,
                {
                    expiresIn: "7d",
                }
            );
            // save user token
            user.token = token;
            return res.status(201).send({ code: 201, data: user, error: null, message: "Logged In successfully" });
        }
        else {
            return res.status(403).send({ code: 403, message: "Wrong email ID or Password" });
        }
        return res.status(400).send("Invalid Credentials");
    } catch (err) {
        console.log(err);
        return res.status(400).send({ code: 400, error: err, data: null, message: "Unable to login" })
    }
}

const userSignup = async (req, res) => {
    try {
        // Get user input
        const { firstName, surname, email, password } = req.body;
        // Validate user input
        if (!(email && password && firstName && surname)) {
            res.status(400).send("All input is required");
        }
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        // Create user in our database
        const user = await User.create({
            firstName,
            surname,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            role: "ADMIN"
        });
        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            privateKey,
            // process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;
        console.log(user);

        // return new user
        return res.status(201).send({ error: null, data: user, message: "Signed Up successfully" });
    } catch (err) {
        console.log(err);
        return res.status(400).send({ error: err, data: null, message: "Unable to signup" })
    }
}

module.exports = { userLogin, userSignup }