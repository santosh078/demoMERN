const express= require("express");
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express();
const dotenv = require("dotenv");
dotenv.config({path:"./config.env"});
const port = process.env.PORT || 8000;
require("./db/connection");
app.use(express.json());
app.use(require("./router/auth"));
app.use(cors());
app.use(cookieParser());
require("./models/userSchema");
// app.get("/",(req,res)=>{
// res.send("welcome to home page");
// });

app.listen(port,()=>{
console.log(`Listening at port :${port}`);
});