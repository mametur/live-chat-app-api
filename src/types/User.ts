import mongoose from "mongoose";

export interface UserType {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}
