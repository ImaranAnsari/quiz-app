import { useState, useEffect } from 'react';
import { getQuiz } from '../api/Quiz';

export default function useQuizzes() {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        getQuiz()
            .then(res => setQuizzes(res.data.data || []))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, []);

    return { quizzes, loading, error };
}
