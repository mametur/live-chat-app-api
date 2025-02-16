import Message from "../../models/Message";
import mongoose from "mongoose";
import Logger from "../../helpers/logger";

/**
 * Save a message to the database (room message)
 */
export const saveRoomMessage = async (roomId: string, sender: string, content: string) => {
  try {
    const newMessage = new Message({
      sender: new mongoose.Types.ObjectId(sender),
      roomId: new mongoose.Types.ObjectId(roomId),
      content,
    });

    await newMessage.save();
    return newMessage;
  } catch (error) {
    Logger.error("Error saving message:", error);
    throw new Error("Could not save message");
  }
};

/**
 * Save a private message (between two users)
 */
export const savePrivateMessage = async (sender: string, receiver: string, content: string) => {
  try {
    const newMessage = new Message({
      sender: new mongoose.Types.ObjectId(sender),
      receiver: new mongoose.Types.ObjectId(receiver),
      content,
    });

    await newMessage.save();
    return newMessage;
  } catch (error) {
    Logger.error("Error saving private message:", error);
    throw new Error("Could not save private message");
  }
};

/**
 * Get Private message
 */
export const getPrivateMessage = async (sender: string, receiver: string) => {
  try {
    return await Message.find({
      $or: [
        { sender: new mongoose.Types.ObjectId(sender), receiver: new mongoose.Types.ObjectId(receiver) },
        { sender: new mongoose.Types.ObjectId(receiver), receiver: new mongoose.Types.ObjectId(sender) },
      ],
    })
      .populate("sender", "username")
      .sort({ createdAt: 1 })
      .exec();
  } catch (error) {
    Logger.error("Error fetching private messages:", error);
    return [];
  }
};

/**
 * Get past messages from a chat room
 */
export const getRoomMessages = async (roomId: string) => {
  try {
    return await Message.find({ roomId: new mongoose.Types.ObjectId(roomId) })
      .populate("sender", "username")
      .sort({ createdAt: 1 })
      .exec();
  } catch (error) {
    console.error("Error fetching room messages:", error);
    return [];
  }
};
