import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import {
  RegisterRequestBody,
  LoginRequestBody,
  LoginResponseBody,
} from "../types/auth";

// Register a new user
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = req.body as RegisterRequestBody;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: "Email is already in use" });
      return;
    }
    const salt = await bcrypt.genSalt(12); // is generating a random salt with 10 rounds of hashing.

    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: unknown) {
    console.log("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login  a user
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Check if the user is already logged in (token exists)
    if (req.cookies.token) {
      res.status(400).json({ error: "Already logged in" });
      return;
    }
    const { email, password } = req.body as LoginRequestBody;

    // Check if the user's email exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    // Ensure JWT secret is defined
    const jwt_secret = process.env.JWT_SECRET;
    if (!jwt_secret) {
      res.status(500).json({ error: "Server error: JWT secret missing" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwt_secret, {
      expiresIn: "1h",
    });

    /**
     More Secure – Cookies cannot be accessed via JavaScript (prevents XSS attacks).
     Automatic Handling – The browser sends the token automatically in requests.
     CSRF Protection – Use SameSite=Strict to prevent CSRF attacks.
     Easier Logout – Just clear the cookie (no need to delete from localStorage
     Frontend need to add credentials: "include" key in request
     */

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000, // 1 hour
    });

    const response: LoginResponseBody = {
      user: {
        id: user._id.toString(),
        email: user.email,
        username: user.username,
      },
    };
    res.status(200).json(response);
  } catch (error: unknown) {
    console.log("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 0,
  });
  res.status(200).json({ message: "Logged out successfully" });
};
