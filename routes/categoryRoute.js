const Controller = require("../controllers/categoryController");
const express = require("express");
const app = express();

// Route to add a category
app.post('/add', Controller.addCategory);

// Route to get all categories
app.get('/getAllCategories', Controller.getAllCategories);

// Route to get a category by ID
app.get('/getById/:categoryId', Controller.getCategoryById);

// Route to update a category by ID
app.put('/updateById/:categoryId', Controller.updateCategory);

// Route to delete a category by ID
app.delete('/delete/:categoryId', Controller.deleteCategory);


module.exports = (app);