import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // smaller middleware functions that set security-related headers
import databaseConnection from "./config/database";

const app = express();

dotenv.config(); // Load .env file

const PORT = process.env.PORT || 3000;

app.use(express.json()); // parsing incoming JSON request bodies  makes them available in the req.body object.
app.use(cookieParser()); //  parses incoming cookies and makes them available in the req.cookies object.

// Enable CORS for frontend requests
app.use(
  cors({
    origin: "http://localhost:3000", // Change to frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

// Routes
app.use("/api", router);

// Conntect DB
databaseConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
