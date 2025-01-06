import express from "express";
import {
  detailController,
  authenticateController,
  deleteController,
} from "../controllers/userController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

//routing
router.get("/:id", authenticateToken, detailController);
router.put("/:id", authenticateToken, authenticateController);
router.delete("/:id", authenticateToken, deleteController);

export default router;
