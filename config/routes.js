module.exports.set_routes = (app) => {
     const users = require("../routes/userRoute.js");
     const allUserData = require("../routes/userConsumer.js");
     const allCategory = require("../routes/categoryRoute.js");
     const allSupplier = require("../routes/supplierRoute.js");
     const allItem = require("../routes/itemRoute.js");
     const inward = require("../routes/inwardRoute.js");
     const po = require("../routes/poRoute.js");
     const uom = require("../routes/uomRoute.js");
     const grn = require("../routes/grnRoute.js");

     app.use("/api/user", users);
     app.use("/api/consumer",allUserData);
     app.use("/api/category",allCategory);
     app.use("/api/supplier",allSupplier);
     app.use("/api/item",allItem);
     app.use("/api/inward",inward);
     app.use("/api/po",po);
     app.use("/api/uom",uom);
     app.use("/api/grn",grn);

}
