const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const authentication = async (req, res, next) => {
    try {
        // console.log(`request is:::  ${req}`);
        // console.log(process.env.SECRETKEY);
        const token = req.cookies.jwtoken;
        const verifiedToken = jwt.verify(token, process.env.SECRETKEY);
        const rootUser = await User.findOne({ _id: verifiedToken._id, "tokens.token": token });
        if (!rootUser) {
            throw new Error("User not found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
    } catch (error) {
        console.log(error)
    }
    next();
}

module.exports = authentication;