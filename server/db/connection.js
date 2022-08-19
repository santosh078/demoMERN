const mongoose= require("mongoose");
const saleDBPath= process.env.SALE_DATABASE;
// console.log(`Sale DB path is ::${saleDBPath}`);
mongoose.connect(saleDBPath).then(()=>{
console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});