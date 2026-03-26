import React from 'react';
import { Play, Pencil } from 'lucide-react';

const difficultyColors = {
    Easy:   { bg: 'rgba(52, 211, 153, 0.12)', color: '#059669' },
    Medium: { bg: 'rgba(251, 191, 36, 0.15)', color: '#d97706' },
    Hard:   { bg: 'rgba(248, 113, 113, 0.15)', color: '#dc2626' },
};

const QuizCard = ({ quiz, onStart, onEdit, progress, loading }) => {
    const diffStyle = difficultyColors[quiz.difficulty] || {};
    return (
        <div className="quiz-card" id={`quiz-card-${quiz._id}`}>
            <div className="quiz-card__title">{quiz.title || quiz.quizName || 'Untitled Quiz'}</div>

            <div className="quiz-card__meta">
                {quiz.questionCount !== undefined && (
                    <span>{quiz.questionCount} questions</span>
                )}
                {quiz.difficulty && (
                    <span
                        className="badge"
                        style={diffStyle.bg ? { background: diffStyle.bg, color: diffStyle.color } : {}}
                    >
                        {quiz.difficulty}
                    </span>
                )}
                {quiz.attempts !== undefined && (
                    <span>{quiz.attempts} attempts</span>
                )}
            </div>

            {progress > 0 && (
                <div className="quiz-card__progress" title={`${progress}% complete`}>
                    <div className="quiz-card__progress-bar" style={{ width: `${progress}%` }} />
                </div>
            )}

            <div className="quiz-card__actions">
                <button className="btn" onClick={() => onStart(quiz)} disabled={loading} id={`quiz-start-${quiz._id}`}>
                    <Play size={14} /> Start
                </button>
                <button className="btn btn--outline" onClick={() => onEdit(quiz)} disabled={loading} id={`quiz-edit-${quiz._id}`}>
                    <Pencil size={14} /> Edit
                </button>
            </div>
        </div>
    );
};

export default QuizCard;
