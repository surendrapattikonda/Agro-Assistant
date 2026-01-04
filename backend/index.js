const express=require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const app=express();    
const Farmer=require('./models/farmer');
const authRoutes=require('./authRoutes');
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT=process.env.PORT || 5000;
app.use(express.json());
app.use('/auth', authRoutes);

app.get('/',(req,res)=>{
    res.send('API is running...');  
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
