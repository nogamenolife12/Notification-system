import mongoose from "mongoose";
import { config } from "../config/index";

export async function connectDB(message : string) {
    try{
        const connection = await mongoose.connect(config.mongoURI);
        console.log(message)
    }catch(err){
        console.log("Error occured while connecting the database:",err);
        process.exit(1);
    }
    
}