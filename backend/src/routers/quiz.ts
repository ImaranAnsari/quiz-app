import express from "express";
import { body } from "express-validator";

import { isAuthenticated } from "../middlewares/isAuth";
import { validateRequest } from "../helpers/validateRequest";
import {
    createQuiz,
    getQuiz,
    updateQuiz,
    deleteQuiz,
    publishQuiz,
    isValidQuiz,
    isValidQuizName,
    getAllQuiz
} from "../controllers/quiz";


const router = express.Router();

// Create
router.post("/", isAuthenticated,
    [
        body("quizName")
            .trim()
            .not()
            .isEmpty()
            .isLength({ min: 10 })
            .withMessage("Please enter a valid name, minimum 10 character long")
            .custom((quizName) => {
                return isValidQuizName(quizName)
                    .then((status: Boolean) => {
                        if (!status) {
                            return Promise.reject("Plaase enter an unique quiz name.");
                        }
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }),
        body("questionsList")
            .custom((questionsList, { req }) => {
                return isValidQuiz(questionsList, req.body["answers"])
                    .then((status: Boolean) => {
                        if (!status) {
                            return Promise.reject(
                                "Please enter a valid quiz having atleast one question, and answers with correct options!"
                            );
                        }
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }),
    ],
    validateRequest,
    createQuiz
);

// Get
router.get("/:quizId?", isAuthenticated, getQuiz);

router.patch("/getPublishedQuiz", isAuthenticated, getAllQuiz);

//update
router.put(
    "/",
    isAuthenticated,
    [
        body("quizName")
            .trim()
            .not()
            .isEmpty()
            .isLength({ min: 10 })
            .withMessage("Please enter a valid name, minimum 10 character long"),
        body("questionsList").custom((questionsList, { req }) => {
            return isValidQuiz(questionsList, req.body["answers"])
                .then((status: Boolean) => {
                    if (!status) {
                        return Promise.reject(
                            "Please enter a valid quiz having atleast one question, and answers with correct option!"
                        );
                    }
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        }),
    ],
    validateRequest,
    updateQuiz
);

// Delete 
router.delete("/:quizId", isAuthenticated, deleteQuiz);

// publish
router.patch("/publish", isAuthenticated, publishQuiz);

export default router;