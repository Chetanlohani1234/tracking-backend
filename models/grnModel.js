const mongoose = require("mongoose")

const GRNItemSchema = mongoose.Schema({
    itemId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AllItem',
        required: true 
    },
    name: { type: String, required: true },
    uom: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    pending: { type: Number, required: true },
    receive: { type: Number, required: true },
    price: { type: Number, required: true },
    taxPercent: { type: Number, required: true },
    taxAmount: { type: Number, required: true },
    total: { type: Number, required: true }
});

const GRNSchema = new mongoose.Schema({
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: 'Inward', required: true },
    items: [GRNItemSchema],
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder', required: true },
    
},
{timestamps:true}
)
const grn = mongoose.model("grn",GRNSchema);
module.exports = grn;