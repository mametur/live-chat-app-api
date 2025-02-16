import { IncomingMessage, Server } from "http";
import { WebSocketServer } from "ws";
import Logger from "../helpers/logger";
import url from "url";
import type { WebSocket } from "ws";
import { verifyToken } from "./helpers/auth";
import routeHandlers from "./routes";
import { RoutePath } from "./types/messageTypes";

export const initializeWebSocketServer = (server: Server) => {
  Logger.info("Starting WebSocket server...");

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws: WebSocket, request: IncomingMessage) => {
    Logger.info("New WebSocket connection detected");
    const parameters = url.parse(request.url!, true);
    const token = parameters.query.token as string;
    const path: string = parameters.pathname || "";

    try {
      const decoded = verifyToken(token);
      if (!decoded) {
        ws.close(1008, "Invalid token");
      }
      // Route handler
      if (path in routeHandlers) {
        const routeHandler = routeHandlers[path as RoutePath];
        routeHandler(ws);
      } else {
        Logger.error(`Invalid WebSocket path: ${path}`);
        ws.close(1008, "Invalid WebSocket path");
      }
    } catch (error) {
      Logger.error("Invalid token", error);
      ws.close(1008, "Invalid token");
      return;
    }

    ws.on("close", () => Logger.info("WebSocket connection closed"));
  });

  wss.on("error", (error) => Logger.error(`WebSocket error: ${error}`));
};
