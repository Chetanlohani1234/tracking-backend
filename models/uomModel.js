const mongoose = require("mongoose")

const category = mongoose.Schema({
    uom:{
        type:String,
    }
},
{timestamps:true}
)
const UOM = mongoose.model("UOM",category);
module.exports = UOM;