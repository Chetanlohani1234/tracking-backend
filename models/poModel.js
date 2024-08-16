const mongoose = require("mongoose")

const OrderItemSchema = mongoose.Schema({
    itemId: {
      type: mongoose.Schema.ObjectId,
      ref: 'AllItem', // Assuming you have an Item model
      required: true
    },
    name: {
      type: String,
      required: true
    },
    unitPrice: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    taxPercent: {
      type: Number,
      required: true
    },
    taxAmount: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    pending: {
      type: Number,
      default: 0
    },
    receive: {
      type: Number,
      default: 0
    }
  });

const po = mongoose.Schema({
    supplier:{
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    date:{
        type:Date,
    },
    items: [OrderItemSchema],
    createdAt: {
      type: Date,
      default: Date.now
    }

},
{timestamps:true}
)
const PurchaseOrder = mongoose.model("PurchaseOrder",po);
module.exports = PurchaseOrder;