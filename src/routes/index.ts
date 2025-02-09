import { Router } from "express";
import authRoutes from "./auth/authRoutes";
import roomRoutes from "./room/roomRoutes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/room", roomRoutes);

export default router;
