import axios from "axios";
const backendUrl = process.env.REACT_APP_BACKEND_URL;


export const startExam = async (quizId) => {
    const options = {
        method: 'GET',
        url: backendUrl + `/exam/${quizId}`,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    };
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        console.log('Get Exam Quiz_ERROR', error);
        throw error;
    };
};

export const submitExam = async (examData, submitScreen) => {
    const options = {
        method: 'POST',
        url: backendUrl + `/exam/`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        data: examData
    };
    try {
        const response = await axios(options);
        const data = response.data.status;
        if (data === "success") {
            submitScreen("/submit-exam")
        }
        return response;
    } catch (error) {
        console.log('Create Quiz_ERROR', error);
        throw error;
    };
};

export const getReport = async () => {
    const options = {
        method: 'GET',
        url: backendUrl + `/report/`,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    };
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        console.log('Get Quiz_ERROR', error);
        throw error;
    };
};

export const getReportById = async (reportId) => {
    const options = {
        method: 'GET',
        url: backendUrl + `/quiz/${reportId}`,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    };
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        console.log('Get Quiz_ERROR', error);
        throw error;
    };
};