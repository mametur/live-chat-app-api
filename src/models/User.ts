import mongoose, { Schema, Model } from "mongoose";
import { UserType } from "../types/User";

// Define the schema for the User model
/**
 Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
 */
const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

// Create Mongoose model with explicit type
/**
 Models are fancy constructors compiled from Schema definitions. An instance of a model is called a document.
 Models are responsible for creating and reading documents from the underlying MongoDB database.
 */
const User: Model<UserType> = mongoose.model<UserType>("User", userSchema);

export default User;
