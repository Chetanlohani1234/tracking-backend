const mongoose = require("mongoose")

const itemSchema = mongoose.Schema({
    name:{
        type:String,
    },
    price:{
        type:String,
    },
    description:{
        type:String,
    },
    category:{
      type : mongoose.Schema.ObjectId,
      ref : "Category"
    },
    subcategory:{
        type : mongoose.Schema.ObjectId,
        ref : "Category"
    },
    image:{
        type:Object,
    },

},
{timestamps:true}
)
const AllItem = mongoose.model("AllItem",itemSchema);
module.exports = AllItem;