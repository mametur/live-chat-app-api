import mongoose from "mongoose";

export interface MessageType {
  _id: mongoose.Types.ObjectId;
  sender: mongoose.Types.ObjectId;
  receiver?: mongoose.Types.ObjectId | null; // Optional, can be null
  roomId?: mongoose.Types.ObjectId | null; // Optional, can be null
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
