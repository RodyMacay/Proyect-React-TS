import mongoose from "mongoose";
import { MongoUrl } from "../src/config"

export const connectDB = async () => {
  try {
    await mongoose.connect(MongoUrl);
    console.log("Base de datos conectada correctamente");
  } catch (error) {
    console.error(error);
  }
};
