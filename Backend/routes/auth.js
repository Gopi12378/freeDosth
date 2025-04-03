const express=require("express")
const router=express.Router();
const User=require("../models/User")
const bcrypt=require("bcryptjs")
const {generateToken}=require("../config/jwt")


router.post("/signup",async (req,res)=>{
    try{
   
    const {username,email,password,mobile,role}=req.body
    
    let user=await User.findOne({email})
    if(user) return res.status(400).json({message:"User already exist"})
    const hashPassword=await bcrypt.hash(password,10);
    const newUser= new User({
        username,
        email,
        password:hashPassword,
        mobile,
        role:role||"user"
    })
    
    const token=generateToken(newUser._id);
    console.log(newUser);
    const r=newUser.role;
    res.status(201).json({message:"User register succsefuly",token,r})
}
catch(err){
    console.log(err)
    res.status(500).json({message:"Server error",err})
}
})

router.post("/login",async (req,res)=>{
    try{
    const {email,password}=req.body
    let user=await User.findOne({email})
    if(!user) {  
        console.log(`ALERT: Login attempt with unregistered email: ${email}`);
        return res.status(400).json({message:"You need to Sign in First before login"})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(401).json({message:"Incorrect Password"})
    const token=generateToken(user._id);
    console.log(token)
    res.status(200).json({
        message: "Login Successfully",
        token: `Bearer ${token}`,  // Add 'Bearer' prefix here
        role: user.role
    });
}
catch(err){
    console.log(err)
    res.status(500).json({message:"Server error"})
}
})
module.exports=router