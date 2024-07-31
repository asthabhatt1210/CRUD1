import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    parentModel: {
        type: String,
        required: true,
        enum: ["Question", "Answer"],
    },
}, { timestamps: true });

export default mongoose.model("Comment", commentSchema);
