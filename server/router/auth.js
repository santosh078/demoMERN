const express = require("express");
const router = express.Router();
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
const middleware = (req, res, next) => {
   console.log(`inside middleware`);
   next();
}
require("../db/connection");
const User = require("../models/userSchema");
router.get("/", (req, res) => {
   res.send("welcome to home page");
});
router.get("/about", middleware, (req, res) => {
   // res.cookie("test","test",{
   //    httpOnly:true
   // });
   res.send("welcome to about page");

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
router.post("/register", async (req, res) => {
   const { name, emailId, city, country, contact, password } = req.body;
   if (!name || !emailId || !city || !country || !contact || !password) {
      return res.status(422).json({ error: "Enter all the fields" });
   }
   try {
      const userExist = await User.findOne({ emailId: emailId });
      // console.log(userExist);
      if (userExist) {
         return res.status(422).json({ error: "User already exists" });
      }
      const user = new User({ name, emailId, city, country, contact, password });
      //hashing of password
      const userRegister = await user.save();
      // console.log(` save response:::${userRegister}`);
      if (userRegister) {
         res.status(201).json("Registration completed successfully");
      } else {
         res.status(500).json({ error: "failed to register" });
      }
   } catch (err) {
      // console.log(err);
      res.status(400).json({ error: err._message });
   }

});

//login screen 
router.post("/login", async (req, res) => {
   console.log(req.body);
   const { email, password } = req.body;
   if (!email || !password) {
      return res.json({ error: "Enter the correct values" });
   }
   try{
      const userEmail = await User.findOne({ emailId: email });
      const msg = "Invalid credentials";
      if (!userEmail) {
         return res.status(400).json({ error: msg });
      }
      const isPwdMatch= await bcrypt.compare(password,userEmail.password);
      const token= await userEmail.generateAuthToken();
      console.log(`token is ::: ${token}`);
      res.cookie("jwtoken",token,{
         httpOnly:true        
      });
     
      if(!isPwdMatch){
         return res.status(400).json({ error: msg });
      }
      
      res.status(200).json({message:"Login successfully"});
     
   }catch(err){
   res.status(500).json({error:err.message});
   }
   

});
module.exports = router;