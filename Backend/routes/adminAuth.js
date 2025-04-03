const express=require("express")
const router=express.Router()
const User=require("../models/User")
const bcrypt=require("bcryptjs")


router.get("/",async(req,res)=>{
    try{
        const adminExist=await User.findOne({email:"admin@gmail.com"})
        if(adminExist){return res.status(400).json({message:"admin already existed"})}
        const hashedPassword=await bcrypt.hash("admin@",10)
        const admin=new User({
            username:"Gopi",
            email:"admin@gmail.com",
            password:hashedPassword,
            mobile:"9876775776",
            role:"admin"
        })
        await admin.save()
        res.status(200).json({message:"Admin created",admin})
    }
    catch(err){
        console.log("internal server error from adminAuth",err)
        return res.status(500).json({"message":"internal server error from adminAuth"})
      
    }
})
module.exports=router










