const mongoose = require("mongoose")

const inward = mongoose.Schema({
    invoiceNumber:{
       type:String,
    },
    supplier:{
        type: mongoose.Schema.ObjectId,
        ref: "Supplier"
    },
    date:{
        type:Date,
    },
    vehicleNumber:{
        type:String,
    }

},
{timestamps:true}
)
const Inward = mongoose.model("Inward",inward);
module.exports = Inward;