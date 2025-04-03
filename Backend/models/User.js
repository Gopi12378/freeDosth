const mongoose=require("mongoose");



const User=new mongoose.Schema({
    username:{
    type:String,
    require:true
    },
    email:{
        type:String,
        require:true,
        
    },
    password:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true,
        default:"user"
    }

})
module.exports=mongoose.model("User",User);