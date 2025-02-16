import type { WebSocket } from "ws";
import Logger from "../../helpers/logger";
import { handleChat } from "../handlers/chatHandler";

export const chatRoutes = (ws: WebSocket) => {
  Logger.info("Chat route called");
  handleChat(ws);
};
