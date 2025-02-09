/**
Each chat room has a unique ID and an optional name (which can be changed).
Each room keeps a list of participants (user IDs).
Messages will be stored separately and linked to the room.
*/
import mongoose, { Schema, InferSchemaType, Model } from "mongoose";

const chatRoomSchema = new Schema(
  {
    roomId: { type: String, required: true, unique: true },
    name: { type: String },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }], // Referencing User model
  },
  { timestamps: true }
);

// Infer TypeScript type from schema
type ChatRoomType = InferSchemaType<typeof chatRoomSchema>;

// Create Mongoose model with inferred type
const ChatRoom: Model<ChatRoomType> = mongoose.model<ChatRoomType>(
  "ChatRoom",
  chatRoomSchema
);
export default ChatRoom;
