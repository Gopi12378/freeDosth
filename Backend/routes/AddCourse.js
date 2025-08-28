const express=require("express")

const Course=require('../models/Course')
const {authMiddleware,verifyAdmin}=require("../middelware/authMiddleware")
const router=express.Router()

router.post("/add",authMiddleware,verifyAdmin ,async (req,res)=>{
    try{
        const {coursename,price,mentorname,nooflectures,imageUrl}=req.body
        console.log(coursename,price,mentorname,nooflectures,imageUrl)
        if(!coursename || !price || !mentorname || !nooflectures || !imageUrl){
            return res.status(401).json({message:"all fields are required"})
        }
        const newCourse= await Course.create({coursename,price,mentorname,nooflectures,imageUrl})
       
       console.log(newCourse)
       res.status(201).json({message:"course added successfuly"})
    
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"internal err"})
    }
})

router.get('/',async (req,res)=>{
    
    try{
        const course=await Course.find()
        console.log(course)
        res.json(course)
    }
    catch(err){
        return res.status(500).json({"message":"server error from fetch products"})
    }
})

router.delete("/:id",authMiddleware,verifyAdmin,async(req,res)=>{
    try{
        
        let course=await Course.findById(req.params.id)
        if(!course)
            return res.status(404).json({"message":"Course not found"})
        await course.deleteOne();
        course=await Course.find()
        return res.status(200).json(course)
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:"server error from delete product"})
    }
})







module.exports=router
