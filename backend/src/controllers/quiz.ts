import { RequestHandler } from 'express';

import { Quiz } from '../models/quiz';
import ProjectError from '../helpers/error';
import { ReturnResponse } from '../interfaces/interfaces';
import { Types } from "mongoose";

export const createQuiz: RequestHandler = async (req, res, next) => {

    try {
        const quizName = req.body.quizName;
        const questionsList = req.body.questionsList;
        const createdBy = req.userId;
        const answers = req.body.answers;

        const quiz = new Quiz({ quizName, questionsList, createdBy, answers });
        const result = await quiz.save();
        const resp: ReturnResponse = {
            status: "success",
            message: "Quiz created successfully",
            data: { quizId: result._id }
        }
        res.status(201).send(resp);
    }
    catch (error) {
        next(error)
    }
};

export const getQuiz: RequestHandler = async (req, res, next) => {

    try {
        type QuizType = {
            createdBy: Types.ObjectId,
            isPublished?: boolean,
            quizName?: string,
            questionsList?: any,
            answers?: any
        }
        const quizId = req.params.quizId;

        let quiz: QuizType | QuizType[] | null;
        if (quizId) {
            quiz = await Quiz.findById(quizId,
                {
                    quizName: 1,
                    questionsList: 1,
                    createdBy: 1,
                    answers: 1,
                },
            );
        }
        else {
            quiz = await Quiz.find(
                { userId: req.userId },
                {
                    quizName: 1,
                    questionsList: 1,
                    createdBy: 1,
                    answers: 1,
                    isPublished: 1
                }
            );
        }

        if (!quiz) {
            const err = new ProjectError("Quiz not found");
            err.statusCode = 401;
            throw err;
        };

        const resp: ReturnResponse = {
            status: "success",
            message: "Quiz",
            data: quiz
        }
        res.status(200).send(resp);
    }
    catch (error) {
        next(error)
    }

}

export const getAllQuiz: RequestHandler = async (req, res, next) => {
    try {

        type QuizType = {
            isPublished: Boolean
        }
        let quiz: QuizType | QuizType[] | null;
        quiz = await Quiz.find(
            { isPublished: true },
            {
                quizName: 1,
                questionsList: 1,
                isPublished: 1
            }
        );

        if (!quiz) {
            const err = new ProjectError("Quiz not found");
            err.statusCode = 401;
            throw err;
        };

        const resp: ReturnResponse = {
            status: "success",
            message: "All Published Quiz",
            data: quiz
        }
        res.status(200).send(resp);
    }
    catch (error) {
        console.log('errorerror', error);
        next(error)
    }
}

export const updateQuiz: RequestHandler = async (req, res, next) => {

    try {
        const quizId = req.body._id;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            const err = new ProjectError("Quiz not found!");
            err.statusCode = 404;
            throw err;
        }

        if (req.userId !== quiz.createdBy.toString()) {
            const err = new ProjectError("You are not authorized!");
            err.statusCode = 403;
            throw err;
        }

        if (quiz.isPublished) {
            const err = new ProjectError("You cannot update, published Quiz!");
            err.statusCode = 405;
            throw err;
        }
        if (quiz.quizName != req.body.quizName) {
            let status = await isValidQuizName(req.body.quizName);
            if (!status) {
                const err = new ProjectError("Please enter an unique quiz quizName.");
                err.statusCode = 422;
                throw err;
            }
            quiz.quizName = req.body.quizName;
        }
        quiz.questionsList = req.body.questionsList;
        quiz.answers = req.body.answers;
        await quiz.save();

        const resp: ReturnResponse = {
            status: "success",
            message: "Quiz updated successfully",
            data: {},
        };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
};

export const deleteQuiz: RequestHandler = async (req, res, next) => {

    try {
        const quizId = req.params.quizId;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            const err = new ProjectError("Quiz not found!");
            err.statusCode = 404;
            throw err;
        }

        if (req.userId !== quiz.createdBy.toString()) {
            const err = new ProjectError("You are not authorized!");
            err.statusCode = 403;
            throw err;
        }

        if (quiz.isPublished) {
            const err = new ProjectError("You cannot delete, published Quiz!");
            err.statusCode = 405;
            throw err;
        }

        await Quiz.deleteOne({ _id: quizId });
        const resp: ReturnResponse = {
            status: "success",
            message: "Quiz deleted successfully",
            data: {},
        };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
};

export const publishQuiz: RequestHandler = async (req, res, next) => {

    try {
        const quizId = req.body.quizId;
        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            const err = new ProjectError("Quiz not found!");
            err.statusCode = 404;
            throw err;
        }

        if (req.userId !== quiz.createdBy.toString()) {
            const err = new ProjectError("You are not authorized!");
            err.statusCode = 403;
            throw err;
        }

        if (!!quiz.isPublished) {
            const err = new ProjectError("Quiz is already published!");
            err.statusCode = 405;
            throw err;
        }

        quiz.isPublished = true;
        await quiz.save();
        const resp: ReturnResponse = {
            status: "success",
            message: "Quiz published!",
            data: {},
        };
        res.status(200).send(resp);
    }
    catch (error) {
        next(error);
    }
};

export const isValidQuiz = async (
    questionsList: [{ questionNumber: Number; question: String; options: {} }],
    answers: {}
) => {

    if (!questionsList.length) {
        return false;
    }

    if (questionsList.length != Object.keys(answers).length) {
        return false;
    }

    let flag = true;
    questionsList.forEach(
        (question: { questionNumber: Number; question: String; options: {} }) => {
            let opt = Object.keys(question["options"]);
            if (
                opt.indexOf(
                    `${Object.values(answers)[
                    Object.keys(answers).indexOf(question.questionNumber.toString())
                    ]
                    }`
                ) == -1
            ) {
                flag = false;
            }
        }
    );

    return flag;
};


export const isValidQuizName = async (quizName: string) => {

    const quiz = await Quiz.findOne({ quizName });

    if (!quiz) {
        return true;
    }
    return false;
};

