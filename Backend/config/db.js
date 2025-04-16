const mongoose = require("mongoose");

const connectDB =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB is Connected");
    } catch (error) {
        console.log("error DB")
        process.exit();
    }
}

module.exports = connectDB;

