const mongoose=require('mongoose')

const collegeSchema=new mongoose.Schema({

    name:{
        type:String,
        unique:true,
        trim:true,
        required:'Short Name Of The College Required'
    },
    fullName:{
        type:String,
        required:'Full College Name Required',
        trim:true
    },
    logoLink:{
           type:URL,
           required:'Logo Link is Required'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true})

module.exports=mongoose.model("collegeData",collegeSchema)