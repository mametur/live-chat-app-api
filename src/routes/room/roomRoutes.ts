import { Router } from "express";
import { chatRoomController } from "../../controllers";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.post("/create", chatRoomController.createChatRoom);

export default router;
