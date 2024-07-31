import Comment from "../model/CommentModel.js";
import BaseService from "../services/BaseService.js";

const commentService = new BaseService(Comment);

export const createComment = async (req, res) => {
    try {
        const savedComment = await commentService.create(req.body);
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const fetchComments = async (req, res) => {
    try {
        const comments = await commentService.findAll();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateComment = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await commentService.findById(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        const updatedComment = await commentService.updateById(id, req.body);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        const comment = await commentService.findById(id);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        await commentService.deleteById(id);
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
