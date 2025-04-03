const mongoose=require("mongoose")



const Course=mongoose.Schema({
    coursename:{
        type :String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    mentorname:{
        type:String,
        require:true

    },
    nooflectures:{
        type:Number,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    }

})
module.exports=mongoose.model("Course",Course)