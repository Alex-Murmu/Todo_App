const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name:{type:String,required:true,tirm:true},
    email:{type:String,required:true},
    password:{type:String,required:true,unique:true},
    profileImageUrl:{type:String,default:null},
    role:{type:String,enum:["Admin","Member"],default:"Member"}, // Role Based Access
},{timestamps:true});


module.exports = mongoose.model("User",userSchema);