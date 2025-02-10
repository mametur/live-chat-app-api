import { Router } from "express";
import authRoutes from "./auth/authRoutes";
import roomRoutes from "./room/roomRoutes";
import messageRoutes from "./message/messageRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/rooms", roomRoutes);
router.use("/messages", messageRoutes);

export default router;
