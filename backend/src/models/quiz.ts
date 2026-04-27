import mongoose from 'mongoose';
const schema = mongoose.Schema;

const quizSchema = new schema({
    quizName: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        default: 'medium'
    },
    questionsList: [
        {
            questionNumber: Number,
            question: String,
            options: []
        },
    ],
    answers: {},

    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
