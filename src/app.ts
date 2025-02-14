"use strict";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // smaller middleware functions that set security-related headers
import errorHandler from "./middleware/errorHandler";
import path from "path";
import morgan from "morgan";
import environment from "./config/environment";
import connectMongoDB from "./config/database";

// Connect DB before handling requests
connectMongoDB();
const app = express();

app.use(helmet()); // for security

app.use(express.json()); // parsing incoming JSON request bodies  makes them available in the req.body object.
app.use(express.urlencoded({ extended: true })); // with URL-encoded payloads
app.use(cookieParser()); //  parses incoming cookies and makes them available in the req.cookies object.

// Enable CORS for frontend requests
app.use(
  cors({
    origin: `http://localhost:${environment.PORT}`, // Change to frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Use Morgan to log HTTP requests
app.use(morgan("dev")); // Logs requests in "dev" format (method, URL, status, response time)
app.use(morgan("combined")); // Logs IP, user-agent, referrer, etc.
app.use(morgan("common")); // Simpler Apache-style log
app.use(morgan("short")); // Shortened request logging
app.use(morgan("tiny")); // Smallest output

// Routes
app.use("/api", router);

// Serve static files (move it below routes to avoid conflicts)
app.use(express.static(path.join(__dirname, "views")));

// Home route
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
  console.log("Home page has started..");
});

// Centralized error handler (middleware)
app.use(errorHandler);

export default app;
