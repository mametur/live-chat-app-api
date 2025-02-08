import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI){
    throw new Error("MongoDB URI is not defined in .env file");
}


const connectMongoDB = async (): Promise<void> =>{
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected`)
    } catch(error: unknown){
        if (error instanceof Error){
            console.error("MongoDB Connection Error", error.message);
        }
        else {
            console.error(`MongoDB Connection Error:`, error);
        }

    }
}

export default connectMongoDB;