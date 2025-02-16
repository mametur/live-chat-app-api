"use strict";
import { chatRoutes } from "./chatRoutes";
import type { WebSocket } from "ws";
import { RoutePath } from "../types/messageTypes";

// Define a union type for route paths

// Define the type for route handlers
// eslint-disable-next-line no-unused-vars
type RouteHandler = (ws: WebSocket) => void;

const routeHandlers: Record<RoutePath, RouteHandler> = {
  "/chat": chatRoutes,
};

export default routeHandlers;
