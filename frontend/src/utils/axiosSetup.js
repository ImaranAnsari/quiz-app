import axios from 'axios';

export const setupAxiosInterceptors = () => {
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // Check if the error is due to an unauthorized/expired token
            if (error.response && error.response.status === 401) {
                // Ignore the error if the request was to the login page itself to prevent loop
                if (!error.config.url.includes('/auth/login') && !error.config.url.includes('/auth/registeruser')) {
                    console.log('Session expired or unauthorized. Logging out...');
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        }
    );
};
