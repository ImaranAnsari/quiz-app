import React from 'react'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/LoginForm';
import '../css/global.css';

export const Login = () => {
    const navigate = useNavigate();
    return (
        <div className="auth-page">
            <LoginForm loggedinScreen={navigate} />
            <button className="link-btn" onClick={() => navigate("/register")}>
                Don't have an account? <span style={{ fontWeight: 700 }}>Register here</span>
            </button>
        </div>
    )
}
