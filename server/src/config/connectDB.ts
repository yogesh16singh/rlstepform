import { Console } from "console";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const mongoURI = `${process.env.MONGODB_URI}`; // Update with your MongoDB URI
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;
