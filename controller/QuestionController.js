import Question from "../model/QuestionModel.js";
import BaseService from "../services/BaseService.js";

const questionService = new BaseService(Question);

export const createQuestion = async (req, res) => {
    try {
        const savedQuestion = await questionService.create(req.body);
        res.status(200).json(savedQuestion);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const fetchQuestions = async (req, res) => {
    try {
        const questions = await questionService.findAll();
        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions found" });
        }
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const questionExist = await questionService.findById(id);
        if (!questionExist) {
            return res.status(404).json({ message: "Question not found" });
        }
        const updatedQuestion = await questionService.updateById(id, req.body);
        res.status(201).json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const questionExist = await questionService.findById(id);
        if (!questionExist) {
            return res.status(404).json({ message: "Question not found" });
        }
        await questionService.deleteById(id);
        res.status(201).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const upvoteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await questionService.incrementField(id, 'upvotes');
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const downvoteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        const question = await questionService.incrementField(id, 'downvotes');
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const searchQuestions = async (req, res) => {
    try {
        const { query } = req.query;
        const questions = await Question.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { body: { $regex: query, $options: "i" } },
                { tags: { $in: [new RegExp(query, "i")] } },
            ],
        });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sortQuestions = async (req, res) => {
    try {
        const { sortBy, order = 'desc' } = req.query;
        const validSortBy = ['createdAt', 'upvotes', 'downvotes'];
        if (!validSortBy.includes(sortBy)) {
            return res.status(400).json({ error: "Invalid sort parameter" });
        }
        const sortOrder = order === 'asc' ? 1 : -1;
        const questions = await Question.find().sort({ [sortBy]: sortOrder });
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};