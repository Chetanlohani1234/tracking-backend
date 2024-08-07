const mongoose = require("mongoose")

const userConsumer = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    phoneNo:{
        type:String,
    },
    address:{
        type:String,
    },

},
{timestamps:true}
)
const AllUser = mongoose.model("AllUser",userConsumer);
module.exports = AllUser;