import { Request, Response } from "express";
import ChatRoom from "../../models/ChatRoom";
import User from "../../models/User";
import isValidObjectId from "../../helpers/checkMongoId";

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

    // Create a new  chat room

    const newRoom = await ChatRoom.create({
      name,
      participants,
    });
    res.status(201).json(newRoom);
  } catch (err: unknown) {
    console.error("Error creating chat room:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Join an existing chat room
export const joinChatRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, roomId } = req.body;

    // Validate if roomId is a valid MongoDB ObjectId
    if (!isValidObjectId(userId) || !isValidObjectId(roomId)) {
      res.status(400).json({ error: "Invalid room ID or user ID format" });
    }

    // Find the chat room by roomId
    const chatRoom = await ChatRoom.findById(roomId);
    if (!chatRoom) {
      res.status(404).json({ error: "Chat room not found" });
      return;
    }

    // Check if the user is already a participant
    if (chatRoom.participants.includes(userId)) {
      res.status(400).json({ error: "User is already a participant in this chat room" });
      return;
    }

    // Add user to the room
    chatRoom.participants.push(userId);
    await chatRoom.save();
    res.status(200).json({
      message: "User successfully added to the chat room",
      chatRoom: {
        _id: chatRoom._id,
        name: chatRoom.name,
      },
    });
  } catch (err: unknown) {
    console.error("Error joining chat room:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
