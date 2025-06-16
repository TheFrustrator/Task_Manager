import mongoose from "mongoose";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const DB_CONNECT = process.env.DB_CONNECT;

export const connectDB = async () => {
  try {
    await mongoose.connect(DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB CONNECTED");
  } catch (error) {
    console.error("DB CONNECTION FAILED:", error.message);
    process.exit(1);
  }
};
