import mongoose, { Schema, Model } from "mongoose";
import { MessageType } from "../types/Message";

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Sender of the message
    receiver: { type: Schema.Types.ObjectId, ref: "User" }, // Optional for private messages
    roomId: { type: Schema.Types.ObjectId, ref: "ChatRoom" }, // Optional for room messages
    content: { type: String, required: true, trim: true }, // Message text (required)
  },
  { timestamps: true }
);

// Validation Middleware: Ensure only `roomId` OR `receiver` is set, not both
messageSchema.pre("save", function (next) {
  if (this.roomId && this.receiver) {
    return next(new Error("Message cannot have both roomId and receiver. Choose one."));
  }
  if (!this.roomId && !this.receiver) {
    return next(new Error("Message must have either a roomId or a receiver."));
  }
  next();
});

// Create Message model
const Message: Model<MessageType> = mongoose.model<MessageType>("Message", messageSchema);

export default Message;
