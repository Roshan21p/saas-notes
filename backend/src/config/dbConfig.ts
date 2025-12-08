import mongoose from "mongoose";
import { DB_URL } from "./serverConfig";

export default  async function connectDB()  {
    try {
        const connect = await mongoose.connect(DB_URL);

        console.log(`Connected to MongoDB: ${connect.connection.host} `)
    } catch (error) {
        if(error instanceof Error){
            console.error('Error connecting to MongoDB: ', error.message);
        } else {
            console.error("Unknown error:", error);
        }
    throw error;
    }
}

