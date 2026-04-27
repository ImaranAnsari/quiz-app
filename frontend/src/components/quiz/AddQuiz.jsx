import React, { useState } from 'react';
import '../../css/global.css';
import { createQuiz } from '../../api/Quiz';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

export function AddQuiz() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');

  const [formData, setFormData] = useState({
    quizName: "",
    level: "medium",
    questionsList: [{
      questionNumber: 1,
      question: "",
      options: ["", ""]
    }],
    answers: {},
  });

  const addContentField = (event, index) => {
    event.preventDefault();
    const newData = { ...formData };
    newData.questionsList.push({ questionNumber: newData.questionsList.length + 1, question: "", options: ["", ""], answers: {} });
    setFormData({ ...newData });
  };

  const deleteContentField = (event, index) => {
    event.preventDefault();
    const newData = { ...formData };
    newData.questionsList.splice(index, 1);
    setFormData({ ...newData });
  };

  const addOptionField = (ev, i) => {
    ev.preventDefault();
    const newData = { ...formData };
    newData.questionsList[i].options.push("");
    setFormData({ ...newData });
  };

  const deleteOptionField = (ev, i, j) => {
    ev.preventDefault();
    const newData = { ...formData };
    newData.questionsList[i].options.splice(j, 1);
    setFormData({ ...newData });
  };

  const inputChangeContent = (e, i, j) => {
    const { name, value } = e.target;
    const newData = { ...formData };
    if (name === "question") newData.questionsList[i].question = value;
    else if (name === "questionNumber") newData.questionsList[i].questionNumber = value;
    else if (name === "option") newData.questionsList[i].options[j] = value;
    else if (name === "answers") newData.answers[i + 1] = value;
    else newData[name] = value;
    setFormData({ ...newData });
  };

  const quizSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createQuiz(formData);
      setToast('Quiz created successfully!');
      setTimeout(() => navigate('/dashboard/quiz'), 1200);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.data && err.response.data.data.length > 0) {
        setToast(err.response.data.data[0].msg || 'Validation failed');
      } else if (err.response && err.response.data && err.response.data.message) {
        setToast(err.response.data.message);
      } else {
        setToast('Failed to create quiz.');
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main">
      <div className="topbar">
        <h2>Add New Quiz</h2>
        <button className="btn btn--outline" onClick={() => navigate('/dashboard/quiz')}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>

      {toast && (
        <div className="toast" style={{ position: 'relative', bottom: 'auto', right: 'auto', marginBottom: 'var(--space-lg)' }}>
          {toast}
        </div>
      )}

      <form id="add-quiz-form" onSubmit={quizSubmitHandler}>
        <div className="quiz">
          <label htmlFor="quizName">Quiz Name</label>
          <input id="quizName" type="text" placeholder="Enter quiz name..." name="quizName" value={formData.quizName} onChange={(e) => inputChangeContent(e)} required />
        </div>

        <div className="quiz" style={{ marginTop: 'var(--space-md)' }}>
          <label htmlFor="level">Quiz Level</label>
          <select id="level" name="level" value={formData.level} onChange={(e) => inputChangeContent(e)} required>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="cardAddQuiz">
          {formData.questionsList.map((item, index) => (
            <div className="card" key={index} id={`question-block-${index}`}>
              <div className="card-header">
                Question {index + 1}
              </div>
              <div className="card-body">
                <div className="question-list">
                  <div>
                    <label htmlFor={`question-${index}`}>Question Text</label>
                    <input id={`question-${index}`} type="text" placeholder="Type your question here..." name="question" value={item.question} onChange={(e) => inputChangeContent(e, index)} required />
                  </div>

                  <div>
                    <label>Options</label>
                    {item.options.map((opt, j) => (
                      <div className="option" key={j} style={{ marginBottom: 'var(--space-sm)' }}>
                        <span style={{ minWidth: 24, height: 24, background: 'var(--color-bg-sidebar)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-secondary)', flexShrink: 0 }}>
                          {j + 1}
                        </span>
                        <input id={`opt-${index}-${j}`} type="text" placeholder={`Option ${j + 1}`} name="option" value={opt} onChange={(e) => inputChangeContent(e, index, j)} />
                        <button className="action_button" onClick={(ev) => addOptionField(ev, index)} title="Add option">
                          <Plus size={14} />
                        </button>
                        {j > 0 && (
                          <button className="action_button" onClick={(ev) => deleteOptionField(ev, index, j)} title="Remove option" style={{ color: 'var(--color-danger)' }}>
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="answer">
                    <label htmlFor={`answers-${index}`}>Correct Answer (option number)</label>
                    <select id={`answers-${index}`} name="answers" value={formData.answers[index + 1] || ''} onChange={(e) => inputChangeContent(e, index)}>
                      <option value="">Select correct answer</option>
                      {item.options.map((_, j) => <option key={j} value={String(j + 1)}>Option {j + 1}</option>)}
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)', flexWrap: 'wrap' }}>
                    <button className="buttonAdd" id={`add-question-${index}`} onClick={(event) => addContentField(event, index)}>
                      <Plus size={14} /> Add Question
                    </button>
                    {index > 0 && (
                      <button className="buttonAdd" id={`delete-question-${index}`} onClick={(event) => deleteContentField(event, index)} style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}>
                        <Trash2 size={14} /> Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
          <button id="quiz-submit-btn" className="btn" type="submit" disabled={loading} style={{ minWidth: 160, padding: '0.7rem 2rem' }}>
            <Save size={16} /> {loading ? 'Saving...' : 'Save Quiz'}
          </button>
          <button className="btn btn--outline" type="button" onClick={() => navigate('/dashboard/quiz')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
