import express from "express";
import { createAnswer, fetchAnswers, updateAnswer, deleteAnswer, upvoteAnswer, downvoteAnswer } from "../controller/AnswerController.js";

const route = express.Router();

route.post("/create", createAnswer);
route.get("/getAllAnswers", fetchAnswers);
route.put("/update/:id", updateAnswer);
route.delete("/delete/:id", deleteAnswer);
route.put("/upvote/:id", upvoteAnswer);
route.put("/downvote/:id", downvoteAnswer);

export default route;
