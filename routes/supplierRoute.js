const Controller = require("../controllers/SupplierController");

const express = require("express");
const app = express();

app.post('/add', Controller.createSupplier);

// Get all suppliers
app.get('/getAll', Controller.getAllSuppliers);

// Get a single supplier by ID
app.get('/getById/:id', Controller.getSupplierById);

// Update a supplier by ID
app.post('/updateById/:id', Controller.updateSupplierById);

// Delete a supplier by ID
app.delete('/delete/:id', Controller.deleteSupplierById);

module.exports = (app);