import { Router } from "express";
import { chatRoomController } from "../../controllers";
import { authMiddleware } from "../../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.get("/", chatRoomController.getAllChatRooms);
router.get("/:roomId", chatRoomController.getOneChatRoom);
router.post("/create", chatRoomController.createChatRoom);
router.post("/join", chatRoomController.joinChatRoom);

export default router;
