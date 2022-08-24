const express = require("express");
const router = express.Router();
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const cookieParser =require("cookie-parser");
router.use(cookieParser()) 
const authentication= require("../middleware/authentication");
require("../db/connection");
const User = require("../models/userSchema");
router.get("/", (req, res) => {
   res.send("welcome to home page");
});
router.get("/about", authentication, (req, res) => {
   // res.cookie("test","test",{
   //    httpOnly:true
   // });
   // console.log("in about ::"+req);
   if(req.rootUser){
      res.status(201).json(req.rootUser);
   }else{
      res.status(401).json({error:"Not authorised"});
   }
  

});
// using promise
// router.post("/register", (req, res) => {
//    const { name, emailId, city, country, contact } = req.body;
//    console.log(name);
//    if (!name || !emailId || !city || !country || !contact) {
//       return res.status(422).json({ error: "Enter all the fields" });
//    }
//    User.findOne({ emailId: emailId }).then((userExist) => {
//       if (userExist) {
//          return res.status(422).json({ error: "User already exists" });
//       }
//       const user = new User({name, emailId, city, country, contact});
//       user.save().then(() => {
//          res.status(201).json("Registration completed successfully");
//       }).catch((err) => {
//          res.status(500).json({ error: "failed to register" });
//       })
//    }).catch((err)=>{
//       console.log(err);
//       res.status(500).json(err);
//    });
// });

// using async and await
router.post("/register",async (req, res) => {
   const { name, emailId, city, country, contact, password, cpassword } = req.body;
   // console.log(`req body is ${JSON.stringify(req)}`);
   // console.log(req);
   //console.log(`name is ${name} ----emailId is ${emailId} ----city is ${city} ----country is ${country} ----contact is ${contact} ---- password is ${password}`);
   if (!name || !emailId || !city || !country || !contact || !password || !cpassword) {
     
      return res.status(422).json({ error: "Enter all the fields" });
   }
   if(cpassword !== password ){
      return res.status(422).json({ error: "Passwords doesn't match" });
   }
   try {
      const userExist = await User.findOne({ emailId: emailId });
      // console.log(userExist);
      if (userExist) {
         return res.status(422).json({ status:false,error: "User already exists" });
      }
      const user = new User({ name, emailId, city, country, contact, password, cpassword});
      //hashing of password
      const userRegister = await user.save();
      // console.log(` save response:::${userRegister}`);
      if (userRegister) {
         res.status(201).json({status:true,message:"Registration completed successfully"});
      } else {
         res.status(500).json({ status:false,message: "failed to register" });
      }
   } catch (err) {
      // console.log(err);
      res.status(400).json({ status:false,message: err._message });
   }

});

//login screen 
router.post("/login", async (req, res) => {
   //console.log(req.body);
   const { email, password } = req.body;
   if (!email || !password) {
      return res.json({ status:false,message: "Enter the correct values" });
   }
   try{
      const userEmail = await User.findOne({ emailId: email });
      const msg = "Invalid credentials";
      if (!userEmail) {
         return res.status(400).json({ status:false,error: msg });
      }
      const isPwdMatch= await bcrypt.compare(password,userEmail.password);
      const token= await userEmail.generateAuthToken();
      //console.log(`token is ::: ${token}`);
      res.cookie("jwtoken",token,{
         httpOnly:true        
      });
     
      if(!isPwdMatch){
         return res.status(400).json({ status:false,message: msg });
      }
      
      res.status(200).json({status:true,message:"Login successfully"});
     
   }catch(err){
   res.status(500).json({status:false,message:err.message});
   }
   

});
module.exports = router;