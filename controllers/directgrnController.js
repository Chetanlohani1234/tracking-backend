// directgrnController.js

const directgrn = require('../models/directgrnModel'); // Adjust the path as needed

// Create a new GRN
const createGRN = async (req, res) => {
    try {
        const newGRN = new directgrn(req.body);
        const savedGRN = await newGRN.save();
        res.status(201).json(savedGRN);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all GRNs
const getAllGRNs = async (req, res) => {
    try {
        const grns = await directgrn.find().populate('invoice').populate({path: 'invoice',populate: {path: 'supplier', model: 'Supplier' }}).populate('items.itemId').populate({path: 'items.itemId',populate: {path: 'category', model: 'Category' }}).populate({path: 'items.itemId',populate: {path: 'subcategory', model: 'Category' }});
        res.json(grns);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a specific GRN by ID
const getGRNById = async (req, res) => {
    try {
        const grn = await directgrn.findById(req.params.id).populate('invoice').populate('items.itemId.uom').populate({path: 'invoice',populate: {path: 'supplier', model: 'Supplier' }}).populate('items.itemId').populate({path: 'items.itemId',populate: {path: 'category', model: 'Category' }}).populate({path: 'items.itemId',populate: {path: 'subcategory', model: 'Category' }});
        if (!grn) return res.status(404).json({ message: 'GRN not found' });
        res.json(grn);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a GRN by ID
const updateGRN = async (req, res) => {
    try {
        const updatedGRN = await directgrn.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGRN) return res.status(404).json({ message: 'GRN not found' });
        res.json(updatedGRN);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a GRN by ID
const deleteGRN = async (req, res) => {
    try {
        const deletedGRN = await directgrn.findByIdAndDelete(req.params.id);
        if (!deletedGRN) return res.status(404).json({ message: 'GRN not found' });
        res.json({ message: 'GRN deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Export all controller functions
module.exports = {
    createGRN,
    getAllGRNs,
    getGRNById,
    updateGRN,
    deleteGRN
};
