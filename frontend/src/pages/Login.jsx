import React from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from '../components/LoginForm';
import '../css/App.css';

export const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="auth-form-container" >
            <LoginForm
                loggedinScreen={navigate}
            />

            <button className='link-btn' onClick={() => navigate("/register")}>Don't have an account ?  Register here</button>
        </div>
    )
}
