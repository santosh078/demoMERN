const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// {"name":"santosh","emailId":"santosh@gmail.com","city":"Jamshedpur","country":"India"}
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    emailId: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    contact: {
        type: Number
    },
    password: {
        type: String
    },
    cpassword: {
        type: String
    },
    tokens: [
        {
            token: {
                type: String
            }
        }
    ],
    messages: [{
        name: {
            type: String
        },
        emailId: {
            type: String
        },
        contact: {
            type: Number
        },
        message: {
            type: String
        }
    }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

//password hashing
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();
});
userSchema.methods.generateAuthToken = async function () {
    try {
        console.log(`secretkey is :: ${JSON.stringify(process.env.SECRETKEY)}`);
        const tokenId = jwt.sign({ _id: this._id }, process.env.SECRETKEY);
        this.tokens = this.tokens.concat({ token: tokenId });
        await this.save();
        return tokenId;
    } catch (error) {
        console.log(error)
    }
}
userSchema.methods.saveMessage = async function (name,emailId,contact,message) {
    try {
        this.messages= this.messages.concat({name,emailId,contact,message});
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error)
    }
}
const User = mongoose.model('USER', userSchema);
module.exports = User;
