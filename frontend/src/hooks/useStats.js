import { useMemo } from 'react';

export default function useStats(quizzes) {
    return useMemo(() => {
        if (!quizzes || quizzes.length === 0) return {
            totalQuizzes: 0,
            totalAttempts: 0,
            averageScore: 0,
        };
        const totalQuizzes = quizzes.length;
        const totalAttempts = quizzes.reduce((sum, q) => sum + (q.attempts || 0), 0);
        const averageScore = quizzes.length
            ? (quizzes.reduce((sum, q) => sum + (q.averageScore || 0), 0) / quizzes.length).toFixed(1)
            : 0;
        return { totalQuizzes, totalAttempts, averageScore };
    }, [quizzes]);
}
