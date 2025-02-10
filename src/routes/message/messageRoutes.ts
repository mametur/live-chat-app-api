import { Router } from "express";
import { messageController } from "../../controllers";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.post("/", messageController.sendMessage); // Send a message

export default router;
