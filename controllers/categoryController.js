const Category = require("../models/categoryModel");

const reponse = require("../services/responseService");

const response = {success: false, data: null , message: ""};


module.exports.addCategory = async (req, res) => {
    try {
        const { category,type , parentId } = req.body;

        const newCategory = new Category({ category,type, parentId });
        const savedCategory = await newCategory.save();

        response.success = true;
        response.message = "Category added successfully";
        response.data = savedCategory;
        res.status(201).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.getAllCategories = async (req, res) => {
    try {
        const { type } = req.query;
        const categories = await Category.find({type:type}).populate("parentId");
        response.success = true;
        response.message = "Categories retrieved successfully";
        response.data = categories;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.getCategoryById = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const category = await Category.findById(categoryId).populate("parentId");

        if (!category) {
            response.success = false;
            response.message = "Category not found";
            response.data = null;
            return res.status(404).json(response);
        }

        response.success = true;
        response.message = "Category retrieved successfully";
        response.data = category;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.updateCategory = async (req, res) => {
    try {
       
        const { categoryId } = req.params;
        const { category } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { category },
            { new: true}
        );

        if (!updatedCategory) {
            response.success = false;
            response.message = "Category not found";
            response.data = null;
            return res.status(404).json(response);
        }

        response.success = true;
        response.message = "Category updated successfully";
        response.data = updatedCategory;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const { type } = req.query;
        const { categoryId } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            response.success = false;
            response.message = "Category not found";
            response.data = null;
            return res.status(404).json(response);
        }

        response.success = true;
        response.message = "Category deleted successfully";
        response.data = deletedCategory;
        res.status(200).json(response);
    } catch (error) {
        response.success = false;
        response.message = "Internal Server Error";
        response.data = null;
        res.status(500).json(response);
    }
}




