import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;



export const getQuiz = async () => {
    const options = {
        method: 'GET',
        url: backendUrl + `/quiz/`,
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

export const getQuizById = async (quizId) => {
    const options = {
        method: 'GET',
        url: backendUrl + `/quiz/${quizId}`,
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

export const createQuiz = async (formReq) => {
    const options = {
        method: 'POST',
        url: backendUrl + `/quiz/`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        data: formReq
    };
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        console.log('Create Quiz_ERROR', error);
        if (error.response) {
            console.log('Error response data:', error.response.data);
            console.log('Error response status:', error.response.status);
            console.log('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.log('Request made but no response received:', error.request);
        } else {
            console.log('Error setting up the request:', error.message);
        }
        throw error;
    };
};

export const updateQuiz = async (formReq, editScreen) => {
    const options = {
        method: 'PUT',
        url: backendUrl + `/quiz/`,
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            'Content-Type': 'application/json'
        },
        data: formReq
    };
    try {
        const response = await axios(options);
        const data = response.data.status;
        if (data === "success") {
            editScreen("/quiz")
        }
        return response;
    } catch (error) {
        console.log('Update Quiz_ERROR', error);
        if (error.response) {
            console.log('Error response data:', error.response.data);
            console.log('Error response status:', error.response.status);
            console.log('Error response headers:', error.response.headers);
        } else if (error.request) {
            console.log('Request made but no response received:', error.request);
        } else {
            console.log('Error setting up the request:', error.message);
        }
        throw error;
    };
};

export const deleteQuiz = async (payload) => {
    const options = {
        method: 'DELETE',
        url: backendUrl + `/quiz/${payload._id}`,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    };
    try {
        const response = await axios(options);
        getQuiz();
        return response;
    } catch (error) {
        console.log('Delete Quiz_ERROR', error);
        throw error;
    };
};

export const publishQuiz = async (payload) => {
    let quizId = payload._id
    const options = {
        method: 'PATCH',
        url: backendUrl + `/quiz/publish`,
        data: { quizId: quizId },
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    };
    try {
        const response = await axios(options);
        let status = response.data.data.status;
        if (status === "success") {
            alert("Quiz Published")
        };
        getQuiz();
        return response;
    } catch (error) {
        console.log('Publish Quiz_ERROR', error);
        throw error;
    };
};

export const getPublishedQuiz = async () => {
    const options = {
        method: 'PATCH',
        url: backendUrl + `/quiz/getPublishedQuiz`,
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