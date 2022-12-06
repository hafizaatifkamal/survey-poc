const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        trim: false,
        lowercase: false,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    token: { type: String },
    role: { type: String, required: true, enum: ['ADMIN', 'USER'] }
})

module.exports = mongoose.model("User", userSchema)