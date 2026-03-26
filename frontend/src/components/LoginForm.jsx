import React, { useState } from 'react'
import '../css/global.css';
import { login } from '../api/User';

export const LoginForm = ({ loggedinScreen }) => {

    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value });
        if (error) setError('');
    }

    async function submitHandler(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await login(data, loggedinScreen);
        } catch (err) {
            setError('Invalid email or password. Please try again.');
            console.log('error', err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="screen">
            <div className="screen__content">
                <div className="headlog">
                    <h1>Welcome Back</h1>
                    <p>Sign in to continue to your dashboard</p>
                </div>
                <form className="login" onSubmit={submitHandler} id="login-form">
                    {error && (
                        <div className="error-text" style={{ fontSize: '0.875rem', marginBottom: 'var(--space-sm)' }}>
                            ⚠️ {error}
                        </div>
                    )}
                    <div className="login__field">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="login__input"
                            placeholder="Enter your email"
                            id="email"
                            name="email"
                            value={data.email}
                            onChange={handleInputChange}
                            required
                            autoComplete="email"
                        />
                    </div>
                    <div className="login__field">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="login__input"
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            value={data.password}
                            onChange={handleInputChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>
                    <button
                        className="btn login__submit"
                        type="submit"
                        id="login-submit-btn"
                        disabled={loading}
                    >
                        <span className="button__text">{loading ? 'Signing in...' : '🔑 Sign In'}</span>
                    </button>
                </form>
            </div>
        </div>
    )
}
