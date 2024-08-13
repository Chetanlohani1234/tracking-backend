const Inward = require('../models/inwardModel');

// Create a new Purchase Order
const createInward = async (req, res) => {
  try {
    const { supplier, date, vehicleNumber } = req.body;
    const newOrder = new Inward({ supplier, date, vehicleNumber });
    await newOrder.save();
    // Format dates for all orders
        // Format the date
        const formattedOrder = {
            ...newOrder.toObject(),
            date: new Date(newOrder.date).toISOString().split('T')[0] // Extract date in YYYY-MM-DD format
        };
    res.status(201).json(formattedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all Purchase Orders
const getAllInward = async (req, res) => {
  try {
    const orders = await Inward.find().populate("supplier");
    
    // Format dates for all orders
    const formattedOrders = orders.map(order => {
        const date = order.date ? new Date(order.date) : null;
        return {
          ...order.toObject(),
          date: date ? date.toISOString().split('T')[0] : null // Extract date in YYYY-MM-DD format or null
        };
      });
    res.status(200).json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a Purchase Order by ID
const getInwardById = async (req, res) => {
  try {
    const order = await Inward.findById(req.params.id).populate("supplier");
    if (!order) return res.status(404).json({ message: 'Order not found' });
    // Format dates for all orders
    // Format the date for the single order
    const date = order.date ? new Date(order.date) : null;
    const formattedOrder = {
      ...order.toObject(),
      date: date ? date.toISOString().split('T')[0] : null // Extract date in YYYY-MM-DD format or null
    };
    res.status(200).json(formattedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a Purchase Order
const updateInward = async (req, res) => {
  try {
    const { supplier, date, vehicleNumber } = req.body;
    const updatedOrder = await Inward.findByIdAndUpdate(req.params.id, { supplier, date, vehicleNumber }, { new: true });
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
    // Format dates for all orders
    const formattedOrder = {
        ...updatedOrder.toObject(),
        date: new Date(updatedOrder.date).toISOString().split('T')[0] // Extract date in YYYY-MM-DD format
    };
    res.status(200).json(formattedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a Purchase Order
// const deleteInward = async (req, res) => {
//   try {
//     const deletedOrder = await Inward.findByIdAndDelete(req.params.id);
//     if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
//         // Format dates for all orders
//          const formattedOrders = deletedOrder.map(order => ({
//              ...order.toObject(),
//              date: new Date(order.date).toISOString().split('T')[0]
//          }));
//     res.status(200).json({ message: 'Order deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const deleteInward = async (req, res) => {
    try {
      const deletedOrder = await Inward.findByIdAndDelete(req.params.id);
      if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
  
      // Return a success message without formatting the date
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

module.exports = {
  createInward,
  getAllInward,
  getInwardById,
  updateInward,
  deleteInward,
};
