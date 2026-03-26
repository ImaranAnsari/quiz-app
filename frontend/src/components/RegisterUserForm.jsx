import React, { useRef, useState } from 'react'
import '../css/global.css';
import { register } from "../api/User"

export const RegisterUserForm = ({ loginScreen }) => {
  const user_name_ref = useRef();
  const email_ref = useRef();
  const contact_ref = useRef();
  const address_ref = useRef();
  const password_ref = useRef();
  const confirm_password_ref = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submitHandler(event) {
    event.preventDefault();
    const password = password_ref.current.value;
    const confirm_password = confirm_password_ref.current.value;
    if (password !== confirm_password) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    const user = {
      userName: user_name_ref.current.value,
      email: email_ref.current.value,
      contact: contact_ref.current.value,
      address: address_ref.current.value,
      password,
      confirm_password
    }
    try {
      await register(user, loginScreen);
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.log('error', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-form-container" style={{ maxWidth: '560px' }}>
      <h1 className="heading">✨ Create Account</h1>

      {error && (
        <div className="error-text" style={{ marginBottom: 'var(--space-md)', textAlign: 'center' }}>
          ⚠️ {error}
        </div>
      )}

      <form id="register-form" onSubmit={submitHandler}>
        <div className="user__details">
          <div className="input__box">
            <span className="details">Full Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              id="userName"
              ref={user_name_ref}
              required
            />
          </div>
          <div className="input__box">
            <span className="details">Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              id="reg-email"
              ref={email_ref}
              required
            />
          </div>
          <div className="input__box">
            <span className="details">Contact</span>
            <input
              type="tel"
              placeholder="Enter contact number"
              id="contact"
              ref={contact_ref}
            />
          </div>
          <div className="input__box">
            <span className="details">Address</span>
            <input
              type="text"
              placeholder="Enter your address"
              id="address"
              ref={address_ref}
            />
          </div>
          <div className="input__box">
            <span className="details">Password</span>
            <input
              type="password"
              placeholder="Create a password"
              id="reg-password"
              ref={password_ref}
              required
            />
          </div>
          <div className="input__box">
            <span className="details">Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm your password"
              id="confirm_password"
              ref={confirm_password_ref}
              required
            />
          </div>
        </div>
        <button
          className="btn w-full"
          id="register-submit-btn"
          type="submit"
          disabled={loading}
          style={{ marginTop: 'var(--space-md)', padding: '0.75rem 1rem', fontSize: '1rem' }}
        >
          {loading ? 'Creating Account...' : '🚀 Create Account'}
        </button>
      </form>
    </div>
  )
}
