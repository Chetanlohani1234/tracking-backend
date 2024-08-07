const Controller = require("../controllers/userConsumer")
const express = require("express");
const app = express();

app.post("/data",Controller.allUser);
app.get("/Alldata",Controller.getAllUsers);
app.get("/GetDatabyID/:userId",Controller.getUserById);
app.post("/UpdatebyID/:userId",Controller.updateUser);
app.delete('/delete/:userId', Controller.deleteUser);


module.exports = (app);