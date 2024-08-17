const directgrnController = require("../controllers/directgrnController");
const express = require("express");
const app = express();

app.post('/add', directgrnController.createGRN);
app.get('/getAll', directgrnController.getAllGRNs);
app.get('/getById/:id', directgrnController.getGRNById);
app.put('/updateById/:id', directgrnController.updateGRN);
app.delete('/delete/:id', directgrnController.deleteGRN);


module.exports = (app);
