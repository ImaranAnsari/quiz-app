import React, { useState, useEffect } from 'react';
import { getQuizById } from '../../api/Quiz';

import "../../css/MoreDeails.css";


export const MoreDetails = ({ onRequestClose, quizId }) => {

    const [quiz, setQuiz] = useState([]);
    const [flag] = useState(false);

    async function getQuizList() {
        try {
            let quizD = await getQuizById(quizId);
            setQuiz(quizD.data.data);
        } catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        getQuizList();
    }, [quizId, flag]);

    return (
        <div className="modal__backdrop">
            <div className="modal__container">
                <h3 className="modal__title">Quiz Details with Question List</h3>

                <div className='quizname' >
                    <h1 >{quiz.quizName} </h1>
                    {quiz && quiz.questionsList && quiz.questionsList.map((que, index) =>
                        <div className='questions' key={index}>
                            <h3>{que.questionNumber}: {que.question}</h3>
                            <div className='answers'>
                                {Object.entries(que.options).map(([key, value]) => (
                                    <div className='answerslist' key={key} >
                                        <button className='option-btn'> {value}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <button className='modal_button' onClick={onRequestClose}>
                    Close this modal
                </button>

            </div>
        </div>
    );
};