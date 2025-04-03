const express=require("express")
const app=express()

require("dotenv").config();

const port=process.env.PORT
const connect=require("./config/db")
const authRoutes=require("./routes/auth")
const cors=require("cors")
const adminRoutes=require("./routes/adminAuth")
const courseRoutes=require("./routes/AddCourse")
app.use(cors())
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth",authRoutes);
app.use("/api/adminauth",adminRoutes)
app.use("/api/course",courseRoutes)
connect()
app.listen(port,()=>console.log("Server is running on Port no:",port))
