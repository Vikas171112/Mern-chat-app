import mongoose from "mongoose"
import { MONGO_URL } from "./serverConfig.js"
export async function connectDB(){
    try {
      await  mongoose.connect(MONGO_URL);
      console.log("Connected To Database")
    } catch (error) {
         console.error(" MongoDB Connection Failed", error);
          process.exit(1);
    }
}