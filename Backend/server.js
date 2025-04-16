const express = require("express");
require("dotenv").config();
const path = require("path");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
// middleware to handle CORS

app.use(cors(
    {
        origin:process.env.CLIENT_URL || "*",
        methods:["GET","POST","DELETE"],
        allowedHeaders:["Content-Type","Authorization"]
    }
));
// connection database
connectDB();
// middleware for parse data
app.use(express.json());
// Routes

app.use("/api/auth",authRoutes);
// app.use("/api/user",userRoutes);
// app.use("/api/task",taskRoutes);
// app.use("/api/reports",reportRoutes)




// server start on port
const port = process.env.PORT;
app.listen(port,()=>{
    console.log("server is runnig on http://localhost:"+port)
})