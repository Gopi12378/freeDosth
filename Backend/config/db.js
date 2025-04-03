const mongoose=require("mongoose")
require("dotenv").config()

const connectDB=async ()=>{
   try{
    const connect=await mongoose.connect(process.env.MONGOOSE_URL);
    console.log("connect.....")

   }
   catch(err){
    console.log(err);
    console.log("Server err")
   }
}
module.exports=connectDB