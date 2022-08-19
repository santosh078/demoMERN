const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
const jwt= require("jsonwebtoken");
// {"name":"santosh","emailId":"santosh@gmail.com","city":"Jamshedpur","country":"India"}
const userSchema= new mongoose.Schema({
    name:{
        type:String
    },
    emailId:{
        type:String
    },
    city:{
        type:String
    },
    country:{
        type:String
    },
    contact:{
        type:Number
    },
    password:{
        type:String
    },
    tokens:[
        {
            token:{
                type:String
            }
        }
    ]
});

//password hashing
userSchema.pre("save",async function(next){
      if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password,12);
    }
   
    next();
});
userSchema.methods.generateAuthToken= async function(){
    try {
        console.log(`secretkey is :: ${JSON.stringify(process.env.SECRETKEY)}`);
        const tokenId= jwt.sign({_id:this._id}, process.env.SECRETKEY);
        this.tokens= this.tokens.concat({token:tokenId});
        await this.save();
        return tokenId;
    } catch (error) {
        console.log(error)
    }
}
const User = mongoose.model('USER',userSchema);
module.exports = User;
