import mongoose from "mongoose";

const connectionString = process.env.MONGODB_URL as string

export const connection = async()=>{
    try {
        const res = await mongoose.connect(connectionString)
        console.log("MongoDB Connected Successfully");
        
    } catch (error) {
        console.log("MongoDb connection failed");
        console.log(error);    
    }
}