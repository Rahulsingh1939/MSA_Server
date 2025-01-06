import express from "express";
import {
  allblogController,
  blogController,
  editBlogController,
  deleteBlogController,
} from "../controllers/blogController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = express.Router();

//routing
router.get("/", allblogController);
router.get("/:id", blogController);
router.put("/:id", authenticateToken, editBlogController);
router.delete("/:id", authenticateToken, deleteBlogController);

export default router;
