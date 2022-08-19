const express= require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
const port = process.env.PORT || 8000;
require("./db/connection");
app.use(express.json());
app.use(require("./router/auth"));
require("./models/userSchema");
// app.get("/",(req,res)=>{
// res.send("welcome to home page");
// });

app.listen(port,()=>{
console.log(`Listening at port :${port}`);
});