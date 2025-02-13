"use strict";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // smaller middleware functions that set security-related headers
import databaseConnection from "./config/database";
import errorHandler from "./middleware/errorHandler";
import path from "path";

dotenv.config(); // Load .env file FIRST before anything else

const PORT = process.env.PORT || 3000;

// Connect DB before handling requests
databaseConnection();

const app = express();

app.use(helmet()); // for security

app.use(express.json()); // parsing incoming JSON request bodies  makes them available in the req.body object.
app.use(express.urlencoded({ extended: true })); // with URL-encoded payloads
app.use(cookieParser()); //  parses incoming cookies and makes them available in the req.cookies object.

// Enable CORS for frontend requests
app.use(
  cors({
    origin: `http://localhost:${PORT}`, // Change to frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

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
