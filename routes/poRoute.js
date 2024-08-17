const Controller = require("../controllers/poController");
const express = require("express");
const app = express();


// Define routes and link to controller functions
app.post('/add', Controller.createPurchaseOrder);
app.get('/getAll', Controller.getAllPurchaseOrders);
app.get('/getById/:id', Controller.getPurchaseOrderById);
app.post('/updateById/:id', Controller.updatePurchaseOrder);

app.put('/updatePo/:id',Controller.updatePO);


app.delete('/delete/:id', Controller.deletePurchaseOrder);

module.exports = (app);