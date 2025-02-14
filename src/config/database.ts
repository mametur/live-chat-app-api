"use strict";
import mongoose from "mongoose";
import environment from "./environment";

const connectMongoDB = async (): Promise<void> => {
  try {
    const { DATABASE_URL } = environment;
    await mongoose.connect(DATABASE_URL);
    const { pathname } = new URL(DATABASE_URL);
    const dbName = pathname.substring(1);
    console.log(`database ${dbName} connected`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("MongoDB Connection Error", error.message);
    } else {
      console.error(`MongoDB Connection Error:`, error);
    }
  }
};
export default connectMongoDB;
