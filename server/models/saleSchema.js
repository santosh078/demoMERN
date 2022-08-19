const mongoose = require("mongoose");
const supplySchema = new mongoose.Schema({
    saleDate: {
        type: Date
    },
    items: {
        type: Array
    },
    storeLocation:{
        type: String
    },
    customer:{
        type: Object
    },
    couponUsed:{
        type: Boolean
    },
    purchaseMethod:{
        type: String
    }
});

const Sale= mongoose.model("sale",supplySchema);
module.exports=Sale;
