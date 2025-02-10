/**
Each chat room has a unique ID and an optional name (which can be changed).
Each room keeps a list of participants (user IDs).
Messages will be stored separately and linked to the room.
*/
import mongoose, { Schema, Model } from "mongoose";
import { RoomsType } from "../types/Rooms";
const chatRoomSchema = new Schema(
  {
    name: { type: String },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }], // Referencing User model
  },
  { timestamps: true }
);

const ChatRoom: Model<RoomsType> = mongoose.model<RoomsType>("ChatRoom", chatRoomSchema);
export default ChatRoom;
