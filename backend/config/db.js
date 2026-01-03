const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => { 

    try {   
        await mongoose.connect(process.env.ATLAS_URI, {
            dbName: 'agri_assistant'
        });
        console.log('MongoDB connected successfully');

    }
    catch(error){
        console.error('MongoDB connection error:', error);
    }
};
module.exports=connectDB;
