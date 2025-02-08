import { Router } from "express";
import userRoutes from "./userRoutes";
import { login, logout, register } from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", authMiddleware, logout);
router.use("/users", authMiddleware, userRoutes);

export default router;
