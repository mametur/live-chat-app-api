import type { WebSocket } from "ws";
import Logger from "../../helpers/logger";
import { saveRoomMessage, getRoomMessages, savePrivateMessage } from "../helpers/db";
import { MessageEvent, PrivateMessageEvent, JoinRoomEvent } from "../types/messageTypes";
import { verifyToken } from "../helpers/auth";

/**
 * Tracks active chat rooms and online users.
 */
const rooms: Record<string, Set<WebSocket>> = {};
const users: Record<string, WebSocket> = {};

/**
 * Handles WebSocket chat events.
 */
export const handleChat = async (ws: WebSocket) => {
  ws.on("message", async (data: string) => {
    try {
      const message: MessageEvent | PrivateMessageEvent | JoinRoomEvent = JSON.parse(data);
      const { token } = message.data;

      if (!token) {
        ws.send(JSON.stringify({ error: "Token is required" }));
        return;
      }
      if (token) {
        const decoded = verifyToken(token);
        if (!decoded) {
          ws.send(JSON.stringify({ error: "Invalid token" }));
          return;
        }
      }

      switch (message.event) {
        case "joinRoom": {
          const { roomId, sender } = message.data;

          if (!roomId || !sender) {
            ws.send(JSON.stringify({ error: "roomId and userId are required" }));
            return;
          }

          users[sender] = ws; // Store user's connection

          if (!rooms[roomId]) {
            rooms[roomId] = new Set();
          }
          rooms[roomId].add(ws);

          const messages = await getRoomMessages(roomId);
          ws.send(JSON.stringify({ event: "pastMessages", data: messages }));
          break;
        }

        case "roomMessage": {
          const { roomId, sender, content } = message.data;

          if (!roomId || !sender || !content) {
            ws.send(JSON.stringify({ error: "roomId, sender, and content are required" }));
            return;
          }

          const savedMessage = await saveRoomMessage(roomId, sender, content);
          rooms[roomId]?.forEach((client) => {
            if (client.readyState === ws.OPEN) {
              client.send(JSON.stringify({ event: "message", data: savedMessage }));
            }
          });
          break;
        }

        case "privateMessage": {
          const { sender, receiver, content } = message.data;

          if (!sender || !receiver || !content) {
            ws.send(JSON.stringify({ error: "sender, receiver, and content are required" }));
            return;
          }

          const savedPrivateMessage = await savePrivateMessage(sender, receiver, content);

          if (users[receiver]) {
            users[receiver].send(JSON.stringify({ event: "private-message", data: savedPrivateMessage }));
          } else {
            ws.send(JSON.stringify({ error: "Receiver is offline" }));
          }
          break;
        }

        default:
          ws.send(JSON.stringify({ error: "Unknown event type" }));
      }
    } catch (error) {
      Logger.error("Error processing message", error);
    }
  });

  ws.on("close", () => {
    Object.keys(rooms).forEach((roomId) => {
      rooms[roomId].delete(ws);
      if (rooms[roomId].size === 0) delete rooms[roomId];
    });

    Object.keys(users).forEach((userId) => {
      if (users[userId] === ws) delete users[userId];
    });
  });
};
