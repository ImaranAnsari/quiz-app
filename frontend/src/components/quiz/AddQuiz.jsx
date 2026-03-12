import React, { useState } from 'react';

import "../../css/AddQuiz.css";
// import styles from "../../css/EditQuiz.module.css";

import { createQuiz } from '../../api/Quiz';

export function AddQuiz() {

  const [formData, setFormData] = useState({
    quizName: "",
    questionsList: [{
      questionNumber: 0,
      question: "",
      options: [""]
    }],
    answers: {},
  });

  const addContentField = (event, index) => {
    event.preventDefault();
    const newData = { ...formData };
    newData.questionsList.push({
      questionNumber: index + 1,
      question: "",
      options: [""],
      answers: {},

    });
    setFormData(newData);
  };

  const deleteContentField = (event, index) => {
    event.preventDefault();
    const newData = { ...formData };
    newData.questionsList.splice(index, 1);
    setFormData(newData);
  };

  const addOptionField = (ev, i) => {
    ev.preventDefault();
    const newData = { ...formData };
    newData.questionsList[i].options.push([""]);
    setFormData(newData);
  };

  const deleteOptionField = (ev, i, j) => {
    ev.preventDefault();
    const newData = { ...formData };
    newData.questionsList[i].options.splice(j, 1);
    setFormData(newData);
  };

  const inputAddQuizChangeContent = (e, i, j) => {
    const { name, value } = e.target;
    const newData = { ...formData };
    if (name === "question") {
      newData.questionsList[i].question = value;
    }
    else if (name === "questionNumber") {
      newData.questionsList[i].questionNumber = value;
    }
    else if (name === "option") {
      newData.questionsList[i].options[j] = value;
    }
    else if (name === "answers") {
      newData.answers[i + 1] = value;
    }
    else {
      newData[name] = value;
    }
    setFormData(newData);
  };

  const quizSubmitHandler = async (e) => {
    e.preventDefault();
    await createQuiz(formData)
  };

  return (
    <>
      <div>
        <h1>Add Quiz</h1><br />
        <div>
          <form onSubmit={quizSubmitHandler}  >
            <div className="quiz">
              <label>Quiz Name :</label>
              <input
                type="text"
                placeholder="Quiz Name"
                name="quizName"
                value={formData.quizName}
                onChange={(e) => inputAddQuizChangeContent(e)}
              />
            </div>
            <div className="cardAddQuiz">
              {formData.questionsList.map((item, index) => (
                <div className="card" style={{ marginTop: " 20px" }} key={index}>

                  <div className="card-body ">

                    <div className="cardCss" >
                      <div className='question-list'>
                        <div>
                          <label >Question Number {index + 1} :</label>
                          <input
                            type="text"
                            placeholder="Question Number "
                            name="questionNumber"
                            value={item.questionNumber}
                            onChange={(e) => inputAddQuizChangeContent(e, index)}
                          />
                        </div>
                        <div>
                          <label htmlFor={`question-${index}`}>Question :</label>
                          <input
                            type="text"
                            placeholder="Question"
                            name="question"
                            value={item.question}
                            onChange={(e) => inputAddQuizChangeContent(e, index)}
                          />
                        </div>

                        <div>
                          {item.options.map((opt, j) => (
                            <div className='option' key={j}>
                              <label htmlFor={`opt-${index}-${j}`}>Option {j + 1} :</label>
                              <input
                                type="text"
                                placeholder={`Option ${j + 1}`}
                                name='option'
                                value={opt}
                                onChange={(e) => inputAddQuizChangeContent(e, index, j)}
                              />

                              {j === 0 ? (
                                <button className='action_button' onClick={(ev) => addOptionField(ev, index)}><i className="fa fa-plus fa-2x" /><div className="hide">Add</div></button>
                              ) : (
                                <>
                                  <button className='action_button' onClick={(ev) => addOptionField(ev, index)}><i className="fa fa-plus fa-2x" /><div className="hide">Add</div></button>
                                  <button className='action_button' onClick={(ev) => deleteOptionField(ev, index, j)}><i className="fa fa-trash fa-2x" /><div className="hide">Delete</div></button>
                                </>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="answer">
                          <label htmlFor={`answers-${index}`}>Answer :</label>
                          <select
                            id="answers"
                            key={index}
                            name="answers"
                            value={formData.answers[index + 1]}
                            onChange={(e) => inputAddQuizChangeContent(e, index)}
                          >
                            <option selected>Please Select Answer</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>


                        {index === 0 ? (
                          <button className='buttonAdd' onClick={(event) => addContentField(event, index)}>Add</button>
                        ) : (
                          <>
                            <button className='buttonAdd' onClick={(event) => addContentField(event, index)}>Add</button>
                            <button className='buttonAdd' onClick={(event) => deleteContentField(event, index)}>Delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

              ))}
            </div>
            <button className='bton' >Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
