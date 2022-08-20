const mongoose= require("mongoose");
const saleDBPath= process.env.USER_DB;
// console.log(`Sale DB path is ::${saleDBPath}`);
mongoose.connect(saleDBPath).then(()=>{
console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});