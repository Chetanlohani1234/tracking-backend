const mongoose = require("mongoose");
//const url = "mongodb://127.0.0.1/27017/school-management"
const url = "mongodb+srv://lohanichetan4:MongoDb1234@ticketing-cluster.15tb2sf.mongodb.net/Tracking";

module.exports.connectDb = async (req,res) => {
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((res) => {
            console.log("Database connect Succussfully.");
        }).catch((error) => {
            console.log(error);
            console.log("Something Went Wrong.");
        })
    } catch (error) {
        console.log(error);
        console.log("Something Went Wrong.");
    }
}