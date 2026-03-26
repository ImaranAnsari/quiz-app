import React, { useEffect, useState } from 'react';
import { getQuizById } from '../../api/Quiz';
import { X } from 'lucide-react';
import '../../css/global.css';

export const MoreDetails = ({ onRequestClose, quizId }) => {
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchQuiz() {
            setLoading(true);
            try {
                let quizD = await getQuizById(quizId);
                setQuiz(quizD.data.data);
            } catch (error) {
                setQuiz(null);
            } finally {
                setLoading(false);
            }
        }
        if (quizId) fetchQuiz();
    }, [quizId]);

    return (
        <div className="modal-backdrop" onClick={onRequestClose} role="dialog" aria-modal="true">
            <div className="modal" style={{ minWidth: 340, maxWidth: 540 }} onClick={e => e.stopPropagation()}>
                <button className="modal__close" onClick={onRequestClose} aria-label="Close" id="more-details-close">
                    <X size={16} />
                </button>

                <h2 style={{ marginBottom: 'var(--space-md)' }}>Quiz Details</h2>

                {loading ? (
                    <div>
                        <div className="skeleton" style={{ height: 20, marginBottom: 12 }} />
                        <div className="skeleton" style={{ height: 14, width: '60%', marginBottom: 24 }} />
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: 80, marginBottom: 12, borderRadius: 'var(--radius-md)' }} />
                        ))}
                    </div>
                ) : !quiz ? (
                    <div className="empty-state">
                        <div className="empty-state__icon">⚠️</div>
                        <p style={{ color: 'var(--color-danger)' }}>Quiz not found.</p>
                    </div>
                ) : (
                    <div>
                        <div style={{ marginBottom: 'var(--space-xl)' }}>
                            <h3 style={{ color: 'var(--color-primary)', margin: '0 0 4px 0' }}>{quiz.quizName}</h3>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                                {quiz.questionsList?.length || 0} questions
                            </p>
                        </div>

                        <div style={{ maxHeight: 360, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            {quiz.questionsList && quiz.questionsList.map((que, index) => (
                                <div key={index} style={{ padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                                    <div style={{ fontWeight: 600, marginBottom: 'var(--space-sm)', color: 'var(--color-text)', fontSize: '0.9rem' }}>
                                        Q{que.questionNumber}: {que.question}
                                    </div>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
                                        {Object.entries(que.options || {}).map(([key, value]) => (
                                            <span key={key} style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', padding: '3px 10px', fontSize: '0.825rem', color: 'var(--color-text-secondary)' }}>
                                                {key}: {value}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};