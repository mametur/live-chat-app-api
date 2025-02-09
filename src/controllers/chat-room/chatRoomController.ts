import { Request, Response } from "express";
import ChatRoom from "../../models/ChatRoom";
import User from "../../models/User";

//Create a new chat room
export const createChatRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, participants } = req.body;

    // Check if a chat room with the same name exist
    const existingChatRoom = await ChatRoom.findOne({ name });
    if (existingChatRoom) {
      res.status(400).json({ error: "Chat room with this name already exists" });
      return;
    }
    // Ensure participants list is provided
    if (!participants || !Array.isArray(participants) || participants.length < 1) {
      res.status(400).json({ error: "At least one participant is required." });
      return;
    }

    // Validate each participants ID
    const validParticipants = await User.find({ _id: { $in: participants } });
    if (validParticipants.length !== participants.length) {
      res.status(400).json({ error: "One or more participants are invalid." });
      return;
    }

    // Create unique roomId
    const roomId = `room_${Date.now()}`;

    // Create a new  chat room

    const newRoom = await ChatRoom.create({
      roomId,
      name,
      participants,
    });
    res.status(201).json(newRoom);
  } catch (err: unknown) {
    console.error("Error creating chat room:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
