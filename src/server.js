const cors = require("cors");
const express = require("express");
const userRoute = require ("./routes/user.route");
const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.route");

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/auth", authRoute);

app.get("/", (req,res) => {
    res.json({
        message: "Users_Project APIv1"
    })
})

module.exports = app 