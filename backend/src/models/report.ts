import mongoose from "mongoose";
const schema = mongoose.Schema;

const reportSchema = new schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            require: true,
        },
        quizId: {
            type: mongoose.Types.ObjectId,
            ref: 'Quiz',
            require: true
        },
        score: {
            type: Number,
            require: true
        },
        total: {
            type: Number,
            require: true
        },

    },
    { timestamps: true }
);

export const Report = mongoose.model("Report", reportSchema);