const grnController = require("../controllers/grnController");
const express = require("express");
const app = express();

app.post('/add', grnController.createGRN);
app.get('/getAll', grnController.getAllGRNs);
app.get('/getById/:id', grnController.getGRNById);
app.put('/updateById/:id', grnController.updateGRN);
app.delete('/delete/:id', grnController.deleteGRN);


module.exports = (app);
