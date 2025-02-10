import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/Auth";

// Extend Request type to include user information
interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const token = req.cookies.token || null; // Extract token from cookie
    if (!token) {
      res.status(401).json({ error: "Unauthorized: No token provided" });
      return; // Prevents further execution
    }

    // Validate environment variable
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      res.status(500).json({ error: "Server error: JWT secret missing" });
      return;
    }

    // Verify token
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
    req.user = decoded;

    next(); // Move to the next middleware
  } catch (error: unknown) {
    console.error("JWT Verification Error:", error);

    // Differentiate between token-related errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: "Unauthorized: Invalid token" });
      return;
    }

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: "Unauthorized: Token expired" });
      return;
    }

    res.status(500).json({ error: "Server error" });
  }
};
