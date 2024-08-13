const mongoose = require("mongoose")

const po = mongoose.Schema({
    supplier:{
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    date:{
        type:Date,
    },
    Items:[{
        type:mongoose.Schema.ObjectId,
        ref:"AllItem"
    }]

},
{timestamps:true}
)
const PurchaseOrder = mongoose.model("PurchaseOrder",po);
module.exports = PurchaseOrder;