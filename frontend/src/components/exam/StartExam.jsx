import React, { useEffect, useState } from "react";
import '../../css/global.css';
import { useLocation, useNavigate } from "react-router-dom";
import { startExam, submitExam } from "../../api/Exam";
import { CheckCircle, XCircle } from 'lucide-react';

const StartExam = ({ submitScreen }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const quizId = state && state.quizId;
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [answers, setAnswers] = useState({});

    async function fetchQuiz() {
        setLoading(true);
        try {
            let quizD = await startExam(quizId);
            setQuiz(quizD.data.data);
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    }

    const handleAnswerChange = (questionNumber, value) => {
        setAnswers(prev => ({ ...prev, [questionNumber]: value }));
    };

    const examSubmitHandler = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const data = { attemptedQuestion: { answers }, quizId };
            const nav = submitScreen || navigate;
            await submitExam(data, nav);
        } catch (err) {
            console.log("submit error", err);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (quizId) fetchQuiz();
    }, [quizId]);

    if (loading) {
        return (
            <div className="main">
                <div className="topbar">
                    <div className="skeleton" style={{ height: 28, width: 200 }} />
                </div>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="card" style={{ marginBottom: 'var(--space-lg)' }}>
                        <div className="card-header">
                            <div className="skeleton" style={{ height: 16, width: '60%' }} />
                        </div>
                        <div className="card-body">
                            {[...Array(4)].map((_, j) => (
                                <div key={j} className="skeleton" style={{ height: 42, marginBottom: 10, borderRadius: 'var(--radius-sm)' }} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="main">
                <div className="empty-state">
                    <div className="empty-state__icon">⚠️</div>
                    <p>Failed to load exam. Please try again.</p>
                    <button className="btn mt-md" onClick={() => navigate('/dashboard/publicquiz')}>← Back</button>
                </div>
            </div>
        );
    }

    const questions = quiz.questionsList || [];
    const answered = Object.keys(answers).length;

    return (
        <div className="main">
            <div className="topbar">
                <h2>{quiz.quizName}</h2>
                <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                    {answered} / {questions.length} answered
                </span>
            </div>

            <div className="quiz-card__progress" style={{ marginBottom: 'var(--space-xl)', height: 8 }}>
                <div className="quiz-card__progress-bar" style={{ width: questions.length ? `${(answered / questions.length) * 100}%` : '0%' }} />
            </div>

            <form id="exam-form" onSubmit={examSubmitHandler}>
                {questions.map((que, index) => {
                    const optionEntries = Object.entries(que.options || {});
                    return (
                        <div className="questionAnswer" key={index}>
                            <div className="card cardExam">
                                <div className="card-header">
                                    <span className="ques">{que.questionNumber}. {que.question}</span>
                                </div>
                                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                                    {optionEntries.map(([key, value]) => (
                                        <label
                                            className="form-check"
                                            key={key}
                                            htmlFor={`q${que.questionNumber}-${key}`}
                                            style={{
                                                background: answers[que.questionNumber] === key ? 'rgba(99, 102, 241, 0.08)' : '',
                                                borderColor: answers[que.questionNumber] === key ? 'var(--color-primary)' : '',
                                            }}
                                        >
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                id={`q${que.questionNumber}-${key}`}
                                                name={`question_${que.questionNumber}`}
                                                value={key}
                                                checked={answers[que.questionNumber] === key}
                                                onChange={() => handleAnswerChange(que.questionNumber, key)}
                                            />
                                            <span className="form-check-label">
                                                <strong style={{ marginRight: 8, color: 'var(--color-text-secondary)' }}>{key}.</strong>
                                                {value}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}

                <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
                    <button id="submit-exam-btn" type="submit" className="btn submitExam" disabled={submitting} style={{ minWidth: 180 }}>
                        <CheckCircle size={16} /> {submitting ? 'Submitting...' : 'Submit Exam'}
                    </button>
                    <button type="button" className="btn btn--outline" onClick={() => navigate('/dashboard/publicquiz')}>
                        <XCircle size={16} /> Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StartExam;