import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getQuiz, deleteQuiz, publishQuiz } from '../../api/Quiz';
import { MoreDetails } from "./MoreDetails";
import "../../css/Quiz.css";


export const QuizList = () => {

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState([]);
  const [quiz1, setQuiz1] = useState([]);
  const [flag, setFlag] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);


  const toggleModal = (async (_id) => {
    setQuiz1(_id)
    setModalOpen(!isModalOpen);
  });

  async function getQuizList() {
    try {
      let quizD = await getQuiz();
      setQuiz(quizD.data.data)
    } catch (error) {
      console.log('error', error);
    }
  }

  useEffect(() => {
    getQuizList();
  }, [flag]);

  const editHandler = ((_id) => {
    let quizId = _id
    navigate(`/dashboard/editquiz`, { state: { quizId } })
  });

  const deleteHandler = (async (_id) => {
    let payload = { _id };
    await deleteQuiz(payload);
    setFlag(!flag)
  });

  const publishHandler = (async (_id) => {
    let payload = { _id };
    await publishQuiz(payload);
    setFlag(!flag)
  });

  return (
    <>
      {isModalOpen && <MoreDetails quizId={quiz1} onRequestClose={toggleModal} />}
      <div className='main-class'>
        <h1>Quiz</h1>
        <button className="bton" onClick={() => navigate("/dashboard/addquiz")}>Add Quiz</button>
        <table>
          <thead>
            <tr>
              <th>S. No</th>
              <th>Quiz Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {quiz.length > 0 &&
              quiz.map((item, index) => (

                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.quizName}  </td>
                  <td >
                    <button className='action_button' onClick={() => toggleModal(item._id)}> <i className="fa fa-chevron-right fa-x"></i><div className="hide">More Details</div></button>
                    <button className='action_button' onClick={() => editHandler(item._id)}> <i className="fa fa-edit fa-x" /><div className="hide">Edit</div></button>
                    <button className='action_button' onClick={() => deleteHandler(item._id)}> <i className="fa fa-trash fa-x" /><div className="hide">Delete</div></button>
                    <button className='action_button' onClick={() => publishHandler(item._id)}> <i className="fa fa-bolt fa-x" /> <div className="hide">Publish</div></button>
                  </td>
                </tr>
              ))}

          </tbody>
        </table>
        {quiz.length === 0 &&
          <h1>
            Data not found
          </h1>
        }
        {quiz.map((item) =>
          <div className='quizname' key={item._id}>
            <h1>{item.quizName} </h1>
            {item.questionsList.map((que) =>
              <div className='questions' key={que._id}>
                <h3 >{que.questionNumber}: {que.question}</h3>

                <div className='answers'>
                  {Object.entries(que.options).map(([key, value]) => (
                    <div className='answerslist' key={key} >
                      <button className='option-btn'>{key}: {value}</button>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </>
  )
}
