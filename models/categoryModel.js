const mongoose = require("mongoose")

const category = mongoose.Schema({
    category:{
        type:String,
    },
    type:{
        type:String,
    },
    parentId: {
       type : mongoose.Schema.ObjectId,
       ref : "Category"
    }
},
{timestamps:true}
)
const Category = mongoose.model("Category",category);
module.exports = Category;