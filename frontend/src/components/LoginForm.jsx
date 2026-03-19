import React, { useState } from 'react'
import "../css/loginStyle.css"
import { login } from '../api/User';

export const LoginForm = ({ loggedinScreen }) => {

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData({ ...data, [name]: value })
    }

    async function submitHandler(e) {
        e.preventDefault();
        try {
            await login(data, loggedinScreen)
        } catch (error) {
            console.log('error', error);
        }
    }

    return (
        <>
            <div className="screen">
                <div className="screen__content">
                    <div className='headlog'>
                        <h1>Welcome Back</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 'var(--space-sm)' }}>
                            Sign in to continue to your dashboard
                        </p>
                    </div>
                    <form className="login" onSubmit={submitHandler}>
                        <div className="login__field">
                            <input type="email" className="login__input" placeholder="Email address"
                                id="email"
                                name='email'
                                value={data.email}
                                onChange={handleInputChange}
                                required={true} />
                        </div>
                        <div className="login__field">
                            <input type="password" className="login__input" placeholder="Password" id="password"
                                name='password'
                                value={data.password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="button login__submit">
                            <span className="button__text">Sign In</span>
                        </button>
                    </form>
                </div>
                <div className="screen__background">
                    <span className="screen__background__shape screen__background__shape4"></span>
                    <span className="screen__background__shape screen__background__shape3"></span>
                    <span className="screen__background__shape screen__background__shape2"></span>
                    <span className="screen__background__shape screen__background__shape1"></span>
                </div>
            </div>
        </>
    )
}
