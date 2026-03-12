import React from 'react'
import { useNavigate } from 'react-router-dom'

import { EditQuiz as EditQuizForm } from '../../components/quiz/EditQuiz'
export const EditQuiz = () => {
    const navigate = useNavigate();

    return (
        <>
            <EditQuizForm editScreen={navigate} />
        </>
    )
}
