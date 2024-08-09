const Controller = require("../controllers/itemController");
const express = require("express");
const app = express();

const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// Create a new item
app.post('/add', Controller.createItem);

// Get items by subcategory (and optional parentId)
app.get('/getAll', Controller.getItems);

// Get a single item by ID
app.get('/getById/:id', Controller.getItemById);

// Update an item by ID
app.put('/updateById/:id', Controller.updateItemById);

// Delete an item by ID
app.delete('/delete/:id', Controller.deleteItemById);

module.exports = (app);