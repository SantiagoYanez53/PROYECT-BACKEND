//en este apartado se haran los estandares para poder hacer un usuario
const mongoose = require("mongoose");
const modelName = "user";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    user: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 100,
    },
    profilePic: {
        type: String,
        required: false,
        minLength: 10,
        maxLength:1000,
    },
    email: {
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    password: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        dafault: Date.now,
    },
});

module.exports = mongoose.model(modelName, schema);