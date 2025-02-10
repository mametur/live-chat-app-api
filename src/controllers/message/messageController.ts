import { Request, Response } from "express";
import Message from "../../models/Message";
import ChatRoom from "../../models/ChatRoom";
import { checkEntityExists } from "../../helpers/validateEntitites";
import User from "../../models/User";

// Send a message (room or private)
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roomId, sender, receiver, content } = req.body;

    // Validate room
    if (roomId) {
      if (!(await checkEntityExists(ChatRoom, roomId))) {
        res.status(404).json({ error: "Room not found or invalid room ID format" });
        return;
      }
    }
    // Validate Sender user
    if (!(await checkEntityExists(User, sender))) {
      res.status(400).json({ error: "Sender not found or invalid sender ID format" });
      return;
    }
    // Validate Receiver user
    if (receiver) {
      if (!(await checkEntityExists(User, receiver))) {
        res.status(400).json({ error: "Receiver not found or invalid receiver ID format" });
        return;
      }
    }

    // Create a new message
    const newMessage = new Message({
      roomId,
      receiver,
      sender,
      content,
    });
    // Save the message to the database
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully", newMessage });
  } catch (err: unknown) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get messages in a chat room

export const getRoomMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const roomId = req.query.roomId as string;

    // Check room id is exist
    if (!(await checkEntityExists(ChatRoom, roomId))) {
      res.status(404).json({ error: "Room not found or invalid room ID format" });
      return;
    }
    //
    const roomMessages = await Message.find({ roomId }).populate("sender", "username email");
    res.status(200).json(roomMessages);
  } catch (err: unknown) {
    console.error("Error getting room messages:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
