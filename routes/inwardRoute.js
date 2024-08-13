const Controller = require("../controllers/inwardController");
const express = require("express");
const app = express();

app.post('/add',Controller.createInward);
app.get('/getAll',Controller.getAllInward);
app.get('/getById/:id',Controller.getInwardById);
app.put('/updateById/:id',Controller.updateInward);
app.delete('/delete/:id',Controller.deleteInward);

module.exports = (app);