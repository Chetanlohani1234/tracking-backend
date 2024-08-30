const express = require("express");
const router = express.Router();
const GRN = require("../models/grnModel"); // Assuming the grn model is in the models folder
const DirectGRN = require("../models/directgrnModel"); // Assuming the directgrn model is in the models folder

router.get("/combined", async (req, res) => {
  try {
    // Fetch data from both models
    const grnData = await GRN.find()
    .populate({
      path: 'invoice',
      populate: { path: 'supplier', model: 'Supplier' } // Ensure Supplier model is correctly referenced
    })
    .populate('poId')
    .populate('items.itemId');
  
  // Continue with your logic, such as sending the response
  
  const directGrnData = await DirectGRN.find()
  .populate({
    path: 'invoice',
    populate: { path: 'supplier', model: 'Supplier' } // Correctly populates the supplier within the invoice
  })
  .populate('items.itemId');

// Continue with your logic, such as sending the response


    // Combine the data
    const combinedData = {
      grnData,
      directGrnData,
    };

    // Send the combined data as a response
    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Route to get combined data by ID
router.get("/combined/:id", async (req, res) => {
    try {
      const { id } = req.params; // Extract the ID from the request parameters
  
      // Fetch data from both models by ID
      const grnData = await GRN.findById(id)
        .populate({
          path: 'invoice',
          populate: { path: 'supplier', model: 'Supplier' } // Ensure Supplier model is correctly referenced
        })
        .populate('poId')
        .populate('items.itemId');
  
      const directGrnData = await DirectGRN.findById(id)
        .populate({
          path: 'invoice',
          populate: { path: 'supplier', model: 'Supplier' } // Correctly populates the supplier within the invoice
        })
        .populate('items.itemId');
  
      // Combine the data
      const combinedData = {
        grnData,
        directGrnData,
      };
  
      // Send the combined data as a response
      res.status(200).json(combinedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

module.exports = router;
