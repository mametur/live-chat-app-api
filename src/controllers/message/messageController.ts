"use strict";
import { NextFunction, Request, Response } from "express";
import Message from "../../models/Message";
import ChatRoom from "../../models/ChatRoom";
import { CustomError, entityCheck } from "../../helpers";
import User from "../../models/User";

// Send a message (room or private)
export const sendMessage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { roomId, sender, receiver, content } = req.body;

    // Validate Sender user
    if (!(await entityCheck.idExist(User, sender))) {
      throw new CustomError(`Sender id not found  `, 400);
    }
    // Validate room
    if (roomId) {
      if (!(await entityCheck.idExist(ChatRoom, roomId))) {
        throw new CustomError(`Room id not found `, 400);
      }
    }
    // Validate Receiver user
    if (receiver) {
      if (!(await entityCheck.idExist(User, receiver))) {
        throw new CustomError(`Receiver id not found  `, 400);
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
    next(err);
  }
};

// Get messages in a chat room
export const getRoomMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const roomId = req.query.roomId as string;

    // Check room id is exist
    if (!(await entityCheck.idExist(ChatRoom, roomId))) {
      res.status(404).json({ error: "Room is not found" });
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

// Get private messages between two users
export const getPrivateMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const sender = req.query.sender as string;
    const receiver = req.query.receiver as string;

    // Check sender and receiver exist
    if (!(await entityCheck.idExist(User, sender)) || !(await entityCheck.idExist(User, receiver))) {
      res.status(404).json({ error: "Sender or receiver not found" });
      return;
    }
    const privateMessages = await Message.find({
      $or: [{ sender, receiver }],
    }).populate("sender", "username email");
    res.status(200).json(privateMessages);
  } catch (err: unknown) {
    console.error("Error getting private messages:", err);
  }
};
