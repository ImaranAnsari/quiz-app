import React, { useEffect, useState } from "react";
import { getPublishedQuiz } from "../../api/Quiz";
import { useNavigate } from "react-router-dom";
import "../../css/Quiz.css";


const ViewQuiz = () => {
    const [quiz, setQuiz] = useState("");
    const [flag] = useState('');
    const navigate = useNavigate();

    const examHandler = (_id) => {
        let quizId = _id;
        navigate(`/dashboard/startexam`, { state: { quizId } });
    };

    async function getQuizList() {
        try {
            let quizD = await getPublishedQuiz();
            setQuiz(quizD.data.data)
        } catch (error) {
            console.log('error', error);
        }
    };

    useEffect(() => {
        getQuizList();
    }, [flag]);

    return (
        <>
            <div className='main-class'>
                <h1 >Quiz</h1>
                <table>
                    <thead>
                        <tr className="heading">
                            <th>S. No</th>
                            <th>Quiz Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quiz.length > 0 ? quiz.map((item, index) => (
                            < >
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.quizName}  </td>
                                    <td >
                                        <button className='action_button' onClick={() => examHandler(item._id)}>
                                            <i className="fa fa-chevron-right fa-x"></i><div className="hide">Start Exam</div>
                                        </button>
                                    </td>
                                </tr>
                            </>)
                        ) : <p>Data not found</p>}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ViewQuiz