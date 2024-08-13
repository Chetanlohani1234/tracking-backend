const PurchaseOrder = require('../models/poModel'); // Adjust the path as needed

// Create a new Purchase Order
exports.createPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = new PurchaseOrder(req.body);
        await purchaseOrder.save();
        res.status(201).json(purchaseOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Purchase Orders
exports.getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find().populate('supplier').populate('Items');
        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a Purchase Order by ID
exports.getPurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('supplier').populate('Items');
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }
        res.status(200).json(purchaseOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a Purchase Order
exports.updatePurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('supplier').populate('Items');
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }
        res.status(200).json(purchaseOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a Purchase Order
exports.deletePurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findByIdAndDelete(req.params.id);
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }
        res.status(200).json({ message: 'Purchase Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
