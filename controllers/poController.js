const PurchaseOrder = require('../models/poModel'); // Adjust the path as needed

// Create a new Purchase Order
exports.createPurchaseOrder = async (req, res) => {
    try {
        const purchaseOrder = new PurchaseOrder(req.body);
        await purchaseOrder.save();
        // Format the date
        const formattedOrder = {
            ...purchaseOrder.toObject(),
            date: new Date(purchaseOrder.date).toISOString().split('T')[0] // Extract date in YYYY-MM-DD format
        };
        res.status(201).json(formattedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all Purchase Orders
exports.getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await PurchaseOrder.find().populate('supplier').populate('items.itemId').populate({path: 'items.itemId',populate: {path: 'category', model: 'Category' }}).populate({path: 'items.itemId',populate: {path: 'subcategory', model: 'Category' }});
            // Format dates for all orders
    const formattedOrders = purchaseOrders.map(order => {
        const date = order.date ? new Date(order.date) : null;
        return {
          ...order.toObject(),
          date: date ? date.toISOString().split('T')[0] : null // Extract date in YYYY-MM-DD format or null
        };
      });
        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a Purchase Order by ID
exports.getPurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('supplier').populate('items.itemId').populate({path: 'items.itemId',populate: {path: 'category', model: 'Category' }}).populate({path: 'items.itemId',populate: {path: 'subcategory', model: 'Category' }});;
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }
            // Format the date for the single order
        const date = purchaseOrder.date ? new Date(purchaseOrder.date) : null;
        const formattedOrder = {
        ...purchaseOrder.toObject(),
        date: date ? date.toISOString().split('T')[0] : null // Extract date in YYYY-MM-DD format or null
        };
        res.status(200).json(formattedOrder);
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
            // Format dates for all orders
        const formattedOrder = {
            ...purchaseOrder.toObject(),
            date: new Date(purchaseOrder.date).toISOString().split('T')[0] // Extract date in YYYY-MM-DD format
        };
        res.status(200).json(formattedOrder);
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
