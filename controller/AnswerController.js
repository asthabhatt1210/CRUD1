import Answer from "../model/AnswerModel.js";
import BaseService from "../services/BaseService.js";

const answerService = new BaseService(Answer);

export const createAnswer = async (req, res) => {
    try {
        const savedAnswer = await answerService.create(req.body);
        res.status(201).json(savedAnswer);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const fetchAnswers = async (req, res) => {
    try {
        const answers = await answerService.findAll();
        if (answers.length === 0) {
            return res.status(404).json({ message: "No answers found" });
        }
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateAnswer = async (req, res) => {
    try {
        const id = req.params.id;
        const answerExist = await answerService.findById(id);
        if (!answerExist) {
            return res.status(404).json({ message: "Answer not found" });
        }
        const updatedAnswer = await answerService.updateById(id, req.body);
        res.status(201).json(updatedAnswer);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteAnswer = async (req, res) => {
    try {
        const id = req.params.id;
        const answerExist = await answerService.findById(id);
        if (!answerExist) {
            return res.status(404).json({ message: "Answer not found" });
        }
        await answerService.deleteById(id);
        res.status(200).json({ message: "Answer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const upvoteAnswer = async (req, res) => {
    try {
        const id = req.params.id;
        const answer = await answerService.incrementField(id, 'upvotes');
        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const downvoteAnswer = async (req, res) => {
    try {
        const id = req.params.id;
        const answer = await answerService.incrementField(id, 'downvotes');
        res.status(200).json(answer);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


