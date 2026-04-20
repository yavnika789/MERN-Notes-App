import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_URL;

if (!MONGO_URI) {
  throw new Error("Missing MongoDB connection string. Set MONGO_URI or MONGO_URL in .env");
}

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));