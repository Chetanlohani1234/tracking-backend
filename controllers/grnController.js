const GRN = require('../models/grnModel');
const PurchaseOrder = require('../models/poModel.js')
const {updatePurchaseOrder} = require('../controllers/poController.js')

// Create a new GRN
// exports.createGRN = async (req, res) => {
//     try {
//         const { invoice,items } = req.body;

//         const newGRN = new GRN({
//             invoice,
//             items
//         });

//         await newGRN.save();
//         // Update the Purchase Order items with the received quantity
//         const purchaseOrder = await PurchaseOrder.findById(invoice);

//         if (purchaseOrder) {
//             purchaseOrder.items.forEach(poItem => {
//                 const grnItem = items.find(item => String(item.itemId) === String(poItem.itemId));

//                 if (grnItem) {
//                     poItem.received = (poItem.received || 0) + grnItem.receive;
//                     poItem.pending = poItem.quantity - poItem.received;
//                 }
//             });

//             await purchaseOrder.save();
//         }

//         res.status(201).json(newGRN);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating GRN', error });
//     }
// };

// Create a GRN

exports.createGRN = async (req, res) => {
    try {
        const { invoice, id, items } = req.body;

        // Validate the request body
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid items data' });
        }

        // Create and save the GRN
        const grnItems = items.map(item => ({
            itemId: item.itemId,
            name: item.name,
            uom: item.uom,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            pending: item.pending || 0,
            receive: item.receive || 0,
            price: item.price,
            taxPercent: item.taxPercent,
            taxAmount: item.taxAmount,
            total: item.total
        }));

        const grn = new GRN({
            invoice,
            id,
            items: grnItems
        });

        const savedGrn = await grn.save();

        // Update the Purchase Order based on the GRN items
        await updatePurchaseOrder(id, grnItems);

        return res.status(201).json({
            message: 'GRN created successfully',
            grn: savedGrn
        });
    } catch (error) {
        console.error('Error creating GRN:', error);
        return res.status(500).json({ message: error.message });
    }
};








// Get all GRNs
exports.getAllGRNs = async (req, res) => {
    try {
        const grns = await GRN.find().populate('invoice').populate('items.itemId');
        res.status(200).json(grns);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching GRNs', error });
    }
};

// Get GRN by ID
exports.getGRNById = async (req, res) => {
    try {
        const grn = await GRN.findById(req.params.id).populate('invoice').populate('items.itemId');
        if (!grn) return res.status(404).json({ message: 'GRN not found' });
        res.status(200).json(grn);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching GRN', error });
    }
};

// Update GRN
exports.updateGRN = async (req, res) => {
    try {
        const updatedGRN = await GRN.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGRN) return res.status(404).json({ message: 'GRN not found' });
        res.status(200).json(updatedGRN);
    } catch (error) {
        res.status(500).json({ message: 'Error updating GRN', error });
    }
};

// Delete GRN
exports.deleteGRN = async (req, res) => {
    try {
        const deletedGRN = await GRN.findByIdAndDelete(req.params.id);
        if (!deletedGRN) return res.status(404).json({ message: 'GRN not found' });
        res.status(200).json({ message: 'GRN deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting GRN', error });
    }
};