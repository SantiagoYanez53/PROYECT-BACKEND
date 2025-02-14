const createError = require("http-errors")
const User = require ("../models/user.models")
const jwt = require ("../lib/jwt")
const encrypt = require("../lib/encrypt")

async function login (email, password) {
    const user =  await User.findOne({ email: email})

    if(!user) {
        throw createError(401, "Invalid data")
    }

    const isPasswordValid = await encrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw createError(401, "Invalid data")
    }

    const token = jwt.sign({ id: user._id })
    return token
}

module.exports = {
    login,
};