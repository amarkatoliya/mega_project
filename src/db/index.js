import mongoose from "mongoose"
import dotenv from "dotenv"

export const connectDB = async () => {
   try {
        await mongoose.connect(MONGO_URL)
        console.log(`your project is connected with mongodb`);
   } catch (error) {
        console.log(`failed to connecting mongodb`,error);
        process.exit(1);
   }
}