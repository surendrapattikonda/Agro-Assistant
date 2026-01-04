const express = require('express');
const authrouter = express.Router();
const Farmer = require('./models/farmer');
const bcrypt = require('bcryptjs');
authrouter.post('/signup',async(req,res)=>{
     const {firstname,lastname,phone,password,location,crops}=req.body;
     if(!firstname || !lastname || !phone || !password || !location){
        return res.status(400).json({message:'Please provide all required fields'});
     }
     const existingFarmer=await Farmer.findOne({phone});
     if(existingFarmer){
        return  res.status(400).json({message:'Farmer with this phone number already exists.please login'});
     }
     const hashedPassword = await bcrypt.hash(password, 10);


     try{
        const newFarmer=new Farmer({
            firstname,
            lastname,
            phone,
            password: hashedPassword,
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

//login
authrouter.post('/login',async(req,res)=>{
    const {phone,password}=req.body;
    if(!phone || !password){
        return res.status(400).json({message:'Please provide phone and password'});
    }
    try{
        const famrer=await Farmer.findOne({phone});
        const isPasswordValid = await bcrypt.compare(password, famrer.password);
        if(!famrer || !isPasswordValid){
            return res.status(401).json({message:'Invalid phone or password'});
        }
        res.status(200).json({message:'Login successful'});
    }
    catch(err){
        res.status(500).json({message:'Something went wrong'+err});
    }
});

module.exports=authrouter;



