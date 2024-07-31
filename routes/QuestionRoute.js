import express from "express";
import {
    createQuestion,
    fetchQuestions,
    updateQuestion,
    deleteQuestion,
    upvoteQuestion,
    downvoteQuestion,
    searchQuestions,
    sortQuestions
} from "../controller/QuestionController.js";

const route = express.Router();

route.post("/create", createQuestion);
route.get("/getAllQuestions", fetchQuestions);
route.put("/update/:id", updateQuestion);
route.delete("/delete/:id", deleteQuestion);
route.put("/upvote/:id", upvoteQuestion);
route.put("/downvote/:id", downvoteQuestion);
route.get("/search", searchQuestions);
route.get("/sort", sortQuestions); 

export default route;
