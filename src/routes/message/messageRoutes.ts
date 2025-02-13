import { Router } from "express";
import { messageController } from "../../controllers";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.post("/", messageController.sendMessage); // Send a message
router.get("/room", messageController.getRoomMessages); // Get a room messages
router.get("/private", messageController.getPrivateMessages);

export default router;
