const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



// Generate jwt Token
const generateToken = (userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRETS,{expiresIn:"7d"});
};

//@desc        Register user
//@route       POST/api/auth/register
//@access      Public
const registerUser = async (req,res)=>{
    try {
        const {name,email,password,profileImageUrl,adminInvitetoken} = req.body;

        //check if user is Allread register
        const userExists = await User.findOne({email});
        if(userExists){
           return res.status(400).json({message:"This email id allready exists in databaser"});
        }
        // Determine user role : Admin if correct token is provide, otherWise Member
        let role = "Member";
        if(adminInvitetoken && adminInvitetoken == process.env.ADMIN_INVITE_TOKEN){
            role="Admin"
        };

        // Hashing Password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);

        //create a new user

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            profileImageUrl,
            role
        })

        // return user Data with jwt
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            profileImageUrl:user.profileImageUrl,
            token:generateToken(user._id)
        });

    } catch (error) {
        res.status(500).json({message:"Server error on register",error:error.message});
    }
};

//@desc        User login
//@route       POST/auth/login
//@Access      Public
const loginUser = async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message});
    }
};


//@desc       get UserProfile 
//@route      GET/api/auth/profile
//@Access     private {require jwt};
const getUserProfile = async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message});
    }
};


//@desc       Update User Profile
//route       PUT/auth/profile
//@Access     Private {require jwt}
const updateUserProfile  = async (req,res)=>{
    try {
        
    } catch (error) {
        res.status(500).json({message:"server error",error:error.message});
    }
};

module.exports = {registerUser, loginUser, getUserProfile, updateUserProfile};
