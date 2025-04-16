const jwt = require("jsonwebtoken");
const User = require("../models/User");


const protect = async (req,res,next)=>{
    try {
        let token = req.header.authorization;
    if(token && token.startWith("Bearer")){
        token = token.split(" ")[1];   //extract token 
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id).select("-password");
        next();
    }else{
        res.status(401).json({message:"Not Authorized , no token "});
        }
    } catch (error) {
        res.status(401).json({message:"Token invalid or Exprires",error:error.message});
    }
};


// middleware for Admin only 

const adminOnly = async (req,res,next)=>{
    if(req.user && req.user.role ==="Admin"){
        next();
    }else{
        res.status(401).json({message:"Access Denied, Admin only"})
    }
}

module.exports = {protect,adminOnly};