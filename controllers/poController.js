const PurchaseOrder = require('../models/poModel'); // Adjust the path as needed
const GRN = require('../models/grnModel');

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

// exports.getAllPurchaseOrders = async (req, res) => {
//     try {
//       const purchaseOrders = await PurchaseOrder.find()
//         .populate('supplier')
//         .populate({
//           path: 'items.itemId',
//           populate: {
//             path: 'category subcategory',
//             model: 'Category'
//           }
//         })
//         .lean(); // Use lean() for better performance if you don't need mongoose documents
  
//       // Fetch GRNs related to each Purchase Order item
//       const orderIds = purchaseOrders.map(order => order._id);
  
//       const items = await GRN.find({
//         invoice: { $in: orderIds }
//       }).populate('items.itemId').lean();
  
//       // Combine GRN data with Purchase Orders
//       const combinedOrders = purchaseOrders.map(order => {
//         const itemsWithGRN = order.items.map(item => {
//           const grnForItem = items.filter(grn => grn.items.some(grnItem => String(grnItem.itemId) === String(item.itemId)));
  
//           const receive = grnForItem.reduce((total, grn) => {
//             const grnItem = grn.items.find(grnItem => String(grnItem.itemId) === String(item.itemId));
//             return total + (grnItem ? grnItem.receive : 0);
//           }, 0);
  
//           return {
//             ...item,
//             pending: item.quantity - receive,
//             receive
//           };
//         });
  
//         return {
//           ...order,
//           items: itemsWithGRN
//         };
//       });
  
//       // Format dates for all orders
//       const formattedOrders = combinedOrders.map(order => {
//         const date = order.date ? new Date(order.date) : null;
//         return {
//           ...order,
//           date: date ? date.toISOString().split('T')[0] : null // Extract date in YYYY-MM-DD format or null
//         };
//       });
  
//       res.status(200).json(formattedOrders);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   };
  

// Get a Purchase Order by ID
exports.getPurchaseOrderById = async (req, res) => {
    try {
        const purchaseOrder = await PurchaseOrder.findById(req.params.id).populate('supplier').populate('items.itemId').populate({path:'items.itemId',populate: {path: 'uom', model: 'UOM' }}).populate({path: 'items.itemId',populate: {path: 'category', model: 'Category' }}).populate({path: 'items.itemId',populate: {path: 'subcategory', model: 'Category' }});;
        if (!purchaseOrder) {
            return res.status(404).json({ message: 'Purchase Order not found' });
        }

                // Fetch GRNs related to this Purchase Order
                const items = await GRN.find({
                    invoice: purchaseOrder._id
                }).populate('items.itemId').lean();
        
                // Combine GRN data with Purchase Order items
                const itemsWithGRN = purchaseOrder.items.map(item => {
                    const grnForItem = items.filter(grn => grn.items.some(grnItem => String(grnItem.itemId) === String(item.itemId)));
        
                    const received = grnForItem.reduce((total, grn) => {
                        const grnItem = grn.items.find(grnItem => String(grnItem.itemId) === String(item.itemId));
                        return total + (grnItem ? grnItem.receive : 0);
                    }, 0);
        
                    return {
                        ...item,
                        pending: item.quantity - received,
                        received
                    };
                });

        
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


// exports.getPurchaseOrderById = async (req, res) => {
//     try {
//         const purchaseOrder = await PurchaseOrder.findById(req.params.id)
//             .populate('supplier')
//             .populate({
//                 path: 'items.itemId',
//                 populate: [
//                     { path: 'uom', model: 'UOM' },
//                     { path: 'category', model: 'Category' },
//                     { path: 'subcategory', model: 'Category' }
//                 ]
//             })
//             .lean();

//         if (!purchaseOrder) {
//             return res.status(404).json({ message: 'Purchase Order not found' });
//         }

//         console.log('Purchase Order:', purchaseOrder);

//         // Fetch related GRN items for this Purchase Order
//         const grnItems = await GRN.find({ 'items.itemId': { $in: purchaseOrder.items.map(i => i.itemId) } }).lean();
//         console.log('GRN Items:', grnItems);

//         // Create a map of itemId to total received quantity from GRNs
//         const receivedMap = grnItems.reduce((map, grn) => {
//             grn.items.forEach(grnItem => {
//                 const itemId = String(grnItem.itemId);
//                 const receive = grnItem.receive || 0;
//                 if (map[itemId]) {
//                     map[itemId] += receive;
//                 } else {
//                     map[itemId] = receive;
//                 }
//             });
//             return map;
//         }, {});

//         console.log('Received Map:', receivedMap);

//         // Combine GRN data with Purchase Order items
//         const itemsWithGRN = purchaseOrder.items.map(item => {
//             if (!item.itemId) {
//                 console.error('Item ID is null for item:', item);
//                 return {
//                     ...item,
//                     receive: 0,
//                     pending: item.quantity
//                 };
//             }
//             const itemId = String(item.itemId._id);  // Ensure correct reference
//             const receive = receivedMap[itemId] || 0;
//             const pending = item.quantity - receive;
//             console.log(`Item ID: ${itemId}, Quantity: ${item.quantity}, Received: ${receive}, Pending: ${pending}`);
//             return {
//                 ...item,
//                 receive,
//                 pending
//             };
//         });

//         // Format the date for the single order
//         const date = purchaseOrder.date ? new Date(purchaseOrder.date) : null;
//         const formattedOrder = {
//             ...purchaseOrder,
//             date: date ? date.toISOString().split('T')[0] : null,
//             items: itemsWithGRN
//         };

//         res.status(200).json(formattedOrder);
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ message: error.message });
//     }
// };


// Update a Purchase Order



const updatePurchaseOrder = async (purchaseOrderId, grnItems) => {
    try {
        // Fetch the Purchase Order by ID
        const purchaseOrder = await PurchaseOrder.findById(purchaseOrderId);

        if (!purchaseOrder) {
            throw new Error('Purchase Order not found');
        }

        // Iterate over each item in the GRN and update the corresponding item in the Purchase Order
        grnItems.forEach(grnItem => {
            const poItem = purchaseOrder.items.find(item => item.itemId.toString() === grnItem.itemId.toString());

            if (poItem) {
                poItem.receive += grnItem.receive; // Increment received quantity
                poItem.pending = Math.max(poItem.quantity - poItem.receive, 0); // Recalculate pending quantity
            } else {
                throw new Error(`Item with itemId ${grnItem.itemId} not found in Purchase Order`);
            }
        });

        // Save the updated Purchase Order
        await purchaseOrder.save();
    } catch (error) {
        console.error('Error updating Purchase Order:', error);
        throw new Error('Failed to update Purchase Order with GRN data');
    }
};







// Example definition of updatePurchaseOrder
// const updatePurchaseOrder = async (id, items) => {
//     try {
//         // Fetch the Purchase Order
//         const purchaseOrder = await PurchaseOrder.findById(id);

//         if (!purchaseOrder) {
//             throw new Error('Purchase Order not found');
//         }

//         // Update the receive and pending quantities for each item in the PO
//         items.forEach(grnItem => {
//             const poItem = purchaseOrder.items.find(item => String(item.itemId) === String(grnItem.itemId));
//             if (poItem) {
//                 poItem.receive += grnItem.receive; // Increment receive by GRN's received quantity
//                 poItem.pending = poItem.quantity - poItem.receive; // Recalculate pending
//             }
//         });

//         // Save the updated Purchase Order
//         await purchaseOrder.save();
//     } catch (error) {
//         console.error('Error updating Purchase Order:', error);
//         throw new Error('Failed to update Purchase Order with GRN data');
//     }
// };


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

module.exports.updatePurchaseOrder = updatePurchaseOrder;