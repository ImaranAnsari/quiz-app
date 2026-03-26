import React, { useEffect, useState } from "react";
import '../../css/global.css';
import { getQuizById, updateQuiz } from "../../api/Quiz";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Save } from 'lucide-react';

export function EditQuiz() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const quizId = state && state.quizId;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState('');

    const [formData, setFormData] = useState({
        quizName: "",
        questionsList: [{ questionNumber: 1, question: "", options: ["", ""] }],
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

    async function quizSubmitHandler(e) {
        e.preventDefault();
        setSaving(true);
        try {
            await updateQuiz(formData);
            setToast('Quiz updated successfully!');
            setTimeout(() => navigate('/dashboard/quiz'), 1200);
        } catch (err) {
            setToast('Failed to update quiz.');
            console.log("error", err);
        } finally {
            setSaving(false);
        }
    }

    useEffect(() => {
        async function fetchQuiz() {
            setLoading(true);
            try {
                let quizD = await getQuizById(quizId);
                setFormData(quizD.data.data);
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        }
        if (quizId) fetchQuiz();
    }, [quizId]);

    if (loading) {
        return (
            <div className="main">
                <div className="topbar"><h2>Edit Quiz</h2></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="card">
                            <div className="card-body">
                                <div className="skeleton" style={{ height: 20, marginBottom: 12 }} />
                                <div className="skeleton" style={{ height: 14, width: '60%' }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Helper to normalise options from API (array or object)
    const getOptionsArray = (options) => {
        if (Array.isArray(options)) return options;
        if (options && typeof options === 'object') return Object.values(options);
        return ["", ""];
    };

    return (
        <div className="main">
            <div className="topbar">
                <h2>Edit Quiz</h2>
                <button className="btn btn--outline" onClick={() => navigate('/dashboard/quiz')}>
                    <ArrowLeft size={16} /> Back
                </button>
            </div>

            {toast && (
                <div className="toast" style={{ position: 'relative', bottom: 'auto', right: 'auto', marginBottom: 'var(--space-lg)' }}>
                    {toast}
                </div>
            )}

            <form id="edit-quiz-form" onSubmit={quizSubmitHandler}>
                <div className="quiz">
                    <label htmlFor="edit-quizName">Quiz Name</label>
                    <input id="edit-quizName" type="text" placeholder="Enter quiz name..." name="quizName" value={formData.quizName} onChange={(e) => inputChangeContent(e)} required />
                </div>

                <div className="cardCss">
                    {formData.questionsList && formData.questionsList.map((item, index) => {
                        const optionsArr = getOptionsArray(item.options);
                        return (
                            <div className="card" key={index} id={`edit-question-block-${index}`}>
                                <div className="card-header">Question {index + 1}</div>
                                <div className="card-body">
                                    <div className="question-list">
                                        <div>
                                            <label htmlFor={`edit-question-${index}`}>Question Text</label>
                                            <input id={`edit-question-${index}`} type="text" placeholder="Type your question..." name="question" value={item.question || ''} onChange={(e) => inputChangeContent(e, index)} />
                                        </div>

                                        <div>
                                            <label>Options</label>
                                            {optionsArr.map((opt, j) => (
                                                <div className="option" key={j} style={{ marginBottom: 'var(--space-sm)' }}>
                                                    <span style={{ minWidth: 24, height: 24, background: 'var(--color-bg-sidebar)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-secondary)', flexShrink: 0 }}>
                                                        {j + 1}
                                                    </span>
                                                    <input
                                                        id={`edit-opt-${index}-${j}`}
                                                        type="text"
                                                        placeholder={`Option ${j + 1}`}
                                                        name="option"
                                                        value={typeof opt === 'string' ? opt : String(opt || '')}
                                                        onChange={(e) => inputChangeContent(e, index, j)}
                                                    />
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
                                            <label htmlFor={`edit-answers-${index}`}>Correct Answer</label>
                                            <select id={`edit-answers-${index}`} name="answers" value={formData.answers?.[index + 1] || ''} onChange={(e) => inputChangeContent(e, index)}>
                                                <option value="">Select correct answer</option>
                                                {optionsArr.map((_, j) => <option key={j} value={String(j + 1)}>Option {j + 1}</option>)}
                                            </select>
                                        </div>

                                        <div style={{ display: 'flex', gap: 'var(--space-sm)', marginTop: 'var(--space-sm)', flexWrap: 'wrap' }}>
                                            <button className="buttonAdd" id={`edit-add-question-${index}`} onClick={(event) => addContentField(event, index)}>
                                                <Plus size={14} /> Add Question
                                            </button>
                                            {index > 0 && (
                                                <button className="buttonAdd" id={`edit-delete-question-${index}`} onClick={(event) => deleteContentField(event, index)} style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}>
                                                    <Trash2 size={14} /> Remove
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                    <button id="edit-quiz-submit-btn" className="btn" type="submit" disabled={saving} style={{ minWidth: 160, padding: '0.7rem 2rem' }}>
                        <Save size={16} /> {saving ? 'Saving...' : 'Update Quiz'}
                    </button>
                    <button className="btn btn--outline" type="button" onClick={() => navigate('/dashboard/quiz')}>Cancel</button>
                </div>
            </form>
        </div>
    );
}
