const express=require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app=express();    
const Farmer=require('./models/farmer');
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT=process.env.PORT || 5000;
app.use(express.json());
app.post('/signup',async(req,res)=>{
     const {firstname,lastname,phone,password,location,crops}=req.body;
     if(!firstname || !lastname || !phone || !password || !location){
        return res.status(400).json({message:'Please provide all required fields'});
     }
     const existingFarmer=await Farmer.findOne({phone});
     if(existingFarmer){
        return  res.status(400).json({message:'Farmer with this phone number already exists.please login'});
     }
     try{
        const newFarmer=new Farmer({
            firstname,
            lastname,
            phone,
            password,
            location,
            crops
        });
        await newFarmer.save();
        res.status(201).json({message:'Farmer registered successfully'});
     }
     catch(err){
        res.status(500).json({message: 'Something went wrong'+err});
     }
});

app.post('/login',async(req,res)=>{
    const {phone,password}=req.body;
    if(!phone || !password){
        return res.status(400).json({message:'Please provide phone and password'});
    }
    try{
        const famrer=await Farmer.findOne({phone});
        if(!famrer || famrer.password!==password){
            return res.status(401).json({message:'Invalid phone or password'});
        }
        res.status(200).json({message:'Login successful'});
    }
    catch(err){
        res.status(500).json({message:'Something went wrong'+err});
    }
})

app.get('/',(req,res)=>{
    res.send('API is running...');  
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
