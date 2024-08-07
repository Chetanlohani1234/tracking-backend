const Controller = require ("../controllers/userController")
const express = require("express");
const app = express();

app.post("/signup", Controller.userSignUp)
app.post("/login",Controller.loginUser)


module.exports = (app);
