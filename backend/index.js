const express=require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app=express();    
const Farmer=require('./models/farmer');
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT=process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('API is running...');  
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
