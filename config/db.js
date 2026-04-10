const { ConnectionReadyEvent } = require('mongodb');
const mongoose=require('mongoose');
const connectDB= async()=>{
    try {
    const connectionInstance=await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MONGODB has connected ${connectionInstance.connection.host}`);
    
} catch (error) {
    console.log('MONGODB connection failed:',error.message);
    console.error(error);
    //process.exit(1)
    
}}
module.exports=connectDB;

