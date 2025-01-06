import express from "express";
import {
  commentController,
  addCommentController,
} from "../controllers/commentController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

//routing
router.get("/", authenticateToken, commentController);
router.put("/", authenticateToken, addCommentController);

export default router;
