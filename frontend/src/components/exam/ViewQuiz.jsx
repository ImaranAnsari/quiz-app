import React, { useEffect, useState } from "react";
import { getPublishedQuiz } from "../../api/Quiz";
import { useNavigate } from "react-router-dom";
import ThemeToggle from '../ThemeToggle';
import { Play, HelpCircle } from 'lucide-react';
import '../../css/global.css';

const ViewQuiz = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const examHandler = (_id) => navigate(`/dashboard/startexam`, { state: { quizId: _id } });

    async function getQuizList() {
        setLoading(true);
        try {
            let quizD = await getPublishedQuiz();
            setQuizzes(quizD.data.data || []);
        } catch (error) {
            console.log('error', error);
            setQuizzes([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => { getQuizList(); }, []);

    return (
        <div className="main">
            <div className="topbar">
                <h2>Available Exams</h2>
                <ThemeToggle />
            </div>

            {loading ? (
                <div className="quiz-grid">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="quiz-card">
                            <div className="skeleton" style={{ height: 20, width: '70%', marginBottom: 12 }} />
                            <div className="skeleton" style={{ height: 14, width: '45%', marginBottom: 16 }} />
                            <div className="skeleton" style={{ height: 36, width: 100 }} />
                        </div>
                    ))}
                </div>
            ) : quizzes.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state__icon">📋</div>
                    <p>No published exams available yet. Check back later!</p>
                </div>
            ) : (
                <div className="quiz-grid">
                    {quizzes.map((item, index) => (
                        <div className="quiz-card" key={item._id} id={`exam-card-${item._id}`}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-md)' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                                        Exam #{index + 1}
                                    </div>
                                    <div className="quiz-card__title">{item.quizName}</div>
                                </div>
                                <span className="badge badge--published">Published</span>
                            </div>
                            <div className="quiz-card__meta">
                                {item.questionsList && (
                                    <span>
                                        <HelpCircle size={13} style={{ marginRight: 4, verticalAlign: 'middle' }} />
                                        {item.questionsList.length} questions
                                    </span>
                                )}
                            </div>
                            <div className="quiz-card__actions">
                                <button id={`start-exam-${item._id}`} className="btn" onClick={() => examHandler(item._id)}>
                                    <Play size={14} /> Start Exam
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewQuiz;