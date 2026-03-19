import React from 'react'
import { useNavigate } from 'react-router-dom'

import { LoginForm } from '../components/LoginForm';
import '../css/App.css';

export const Login = () => {
    const navigate = useNavigate();
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: 'var(--space-xl)',
            flexDirection: 'column',
        }}>
            <LoginForm
                loggedinScreen={navigate}
            />
            <button className='link-btn' onClick={() => navigate("/register")}>Don't have an account? Register here</button>
        </div>
    )
}
