import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../css/startExam.css'
import { startExam, submitExam } from "../../api/Exam";

const StartExam = ({ submitScreen }) => {
    const { state } = useLocation()
    const quizId = state && state.quizId;
    const [quiz, setQuiz] = useState([]);
    const [flag] = useState(false);
    const [attemptedQuestion, setAttemptedQuestion] = useState({});
    async function getQuizList() {
        try {
            let quizD = await startExam(quizId);
            setQuiz(quizD.data.data);
        } catch (error) {
            console.log("error", error);
        }
    };
    const inputChangeExam = (e, i) => {
        const { name, value } = e.target;
        const newData = { ...attemptedQuestion };
        if (name === "answers") {
            newData.answers[i + 1] = value;
        }
        else {
            newData[name] = value;
        }
        setAttemptedQuestion(newData)
    }
    const examSubmitHandler = async (e) => {
        e.preventDefault();
        let data = {
            attemptedQuestion: attemptedQuestion,
            quizId: quizId
        }
        await submitExam(data, submitScreen)
    };
    useEffect(() => {
        getQuizList();
    }, [quizId, flag]);
    return (
        <>
            <form onSubmit={examSubmitHandler}>
                <h1 className="heading">{quiz.quizName} </h1>
                {quiz &&
                    quiz.questionsList &&
                    quiz.questionsList.map((que, index) =>
                    (
                        <div className=" questionAnswer" key={index}>
                            <div className="card cardExam" >
                                <div className="card-header">
                                    <span className="ques">{que.questionNumber}:-  {que.question}</span>
                                </div>
                                <div className="card-body">
                                    {Object.entries((que.options)).map(([key, value]) => (

                                        <div className="form-check" key={key}>
                                            <input className="form-check-input"
                                                type="radio"
                                                name={que.questionNumber}
                                                id={key}
                                                key={que.questionNumber}
                                                value={key}
                                                onChange={(e) => inputChangeExam(e)}
                                            />
                                            <label className="form-check-label" htmlFor={key}>
                                                <span className="option"> {value}</span>

                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                <button type="submit" className="btn btn-success submitExam" >Submit</button>
            </form>
        </>
    );
};
export default StartExam;