const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema({
    name : {
        type: String,
    },
    email: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    address: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    beneficiaryname: {
        type: String,
    },
    bankname: {
        type: String,
    },
    accountno: {
        type: String,
    },
    ifsccode: {
        type: String,
    }

},
{timestamps: true}
)
const Supplier = mongoose.model("Supplier", supplierSchema);
module.exports = Supplier;