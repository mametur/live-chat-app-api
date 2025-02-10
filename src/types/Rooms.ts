import mongoose from "mongoose";

export interface RoomsType {
  _id: mongoose.Types.ObjectId;
  name: String;
  participants: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
