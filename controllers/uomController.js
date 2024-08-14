const Category = require("../models/uomModel");

const reponse = require("../services/responseService");

const response = {success: false, data: null , message: ""};


module.exports.addUom = async (req, res) => {
    try {
        const { uom } = req.body;

        const newCategory = new Category({ uom });
        const savedCategory = await newCategory.save();

        response.success = true;
        response.message = "UOM added successfully";
        response.data = savedCategory;
        res.status(201).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.getAllUOM = async (req, res) => {
    try {
        //const { type } = req.query;
        const categories = await Category.find();
        response.success = true;
        response.message = "UOM retrieved successfully";
        response.data = categories;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.getUomById = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId);

        if (!category) {
            response.success = false;
            response.message = "Category not found";
            response.data = null;
            return res.status(404).json(response);
        }

        response.success = true;
        response.message = "UOM retrieved successfully";
        response.data = category;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.updateUom = async (req, res) => {
    try {
       
        const { categoryId } = req.params;
        const { uom } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { uom },
            { new: true}
        );

        if (!updatedCategory) {
            response.success = false;
            response.message = "Category not found";
            response.data = null;
            return res.status(404).json(response);
        }

        response.success = true;
        response.message = "Uom updated successfully";
        response.data = updatedCategory;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.deleteUom = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            response.success = false;
            response.message = "Category not found";
            response.data = null;
            return res.status(404).json(response);
        }

        response.success = true;
        response.message = "UOM deleted successfully";
        response.data = deletedCategory;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}




