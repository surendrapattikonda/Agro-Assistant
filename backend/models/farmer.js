const mongoose =require('mongoose');

const famerSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
   lastname:{
        type:String,
        required:true  
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true  
    },
    crops:{
        type:[String],
    },
    history:{
        type:[String],
    }
}); 

module.exports=mongoose.model('Farmer',famerSchema);
