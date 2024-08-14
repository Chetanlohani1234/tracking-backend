const Controller = require("../controllers/uomController");
const express = require("express");
const app = express();

// Route to add a category
app.post('/add', Controller.addUom);

// Route to get all categories
app.get('/getAll', Controller.getAllUOM);

// Route to get a category by ID
app.get('/getById/:categoryId', Controller.getUomById);

// Route to update a category by ID
app.put('/updateById/:categoryId', Controller.updateUom);

// Route to delete a category by ID
app.delete('/delete/:categoryId', Controller.deleteUom);


module.exports = (app);