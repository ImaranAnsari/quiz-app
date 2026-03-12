import React from 'react';
import StartExam from '../../components/exam/StartExam';
import { useNavigate } from 'react-router-dom';

const Exam = () => {
    const navigate = useNavigate()

    return (
        <div>
            <StartExam submitScreen={navigate} />
        </div>
    )
}

export default Exam