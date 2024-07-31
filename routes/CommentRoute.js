import express from "express";
import { createComment, fetchComments, updateComment, deleteComment } from "../controller/CommentController.js";

const router = express.Router();

router.post("/create", createComment);
router.get("/getAllComments", fetchComments);
router.put("/update/:id", updateComment);
router.delete("/delete/:id", deleteComment);

export default router;
