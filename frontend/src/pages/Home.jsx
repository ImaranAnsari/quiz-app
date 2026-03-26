import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/global.css';
import logo from "../assets/logo.png"

export const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="homePage">
        <div className="cards bgCard">
          <img
            src={logo}
            alt="QuizApp Logo"
            style={{
              width: '72px',
              height: '72px',
              marginBottom: 'var(--space-lg)',
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 6px 18px rgba(99, 102, 241, 0.45))',
              borderRadius: 'var(--radius-lg)'
            }}
          />
          <h1 style={{ marginBottom: 'var(--space-sm)' }}>Welcome to QuizApp</h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>
            Test your knowledge, challenge yourself, and track your progress.
          </p>
        </div>

        <div className="cards bgCard2">
          <div className="text-buton">
            <button className="btn" onClick={() => navigate("/register")}>
              ✨ Register
            </button>
            <button className="btn btn--outline" onClick={() => navigate("/login")}>
              🔑 Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
