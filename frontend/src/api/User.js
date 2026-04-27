import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const register = async (user, loginScreen) => {

    const options = {
        method: 'POST',
        url: backendUrl + `/auth/registeruser`,
        headers: { 'Content-Type': 'application/json' },
        data: user
    };
    try {
        const response = await axios(options);
        console.log('registerUser_RESPONSE', response);
        const data = response.data.status;
        if (data === "success") {
            loginScreen("/login")
        }
        return response;
    } catch (error) {
        console.log('registerUser_ERROR', error);
        throw error;
    };
};

export const login = async (user, loggedinScreen) => {
    const options = {
        method: 'POST',
        url: backendUrl + `/auth/login`,
        headers: { 'Content-Type': 'application/json' },
        data: user
    };
    try {
        const response = await axios(options);
        const token = response.data.data.token;
        localStorage.setItem('token', token)
        const data = response.data.status;
        if (data === "success") {
            loggedinScreen("/dashboard")
        }
        return response;
    } catch (error) {
        console.log('LoginUser_ERROR', error);
        throw error;
    };
};

export const getUser = async () => {
    const options = {
        method: 'GET',
        url: backendUrl + `/user/`,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    };
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        console.log('Get User_ERROR', error);
        throw error;
    };
};

export const updateUser = async (user) => {
    const options = {
        method: 'PUT',
        url: backendUrl + `/user/`,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        data: user
    };
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        console.log('Get User_ERROR', error);
        throw error;
    };
};

export const changePassword = async (user) => {
    const options = {
        method: 'PUT',
        url: backendUrl + `/user/changepassword`,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
        data: user
    };
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        console.log('Get User_ERROR', error);
        throw error;
    };
};


export const refreshToken = async () => {
    const options = {
        method: 'POST',
        url: backendUrl + `/auth/refresh`,
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    };
    try {
        const response = await axios(options);
        return response;
    } catch (error) {
        console.log('Refresh Token_ERROR', error);
        throw error;
    }
};

export const logout = async (user) => {
    localStorage.removeItem('token');
    window.location.reload();
};
