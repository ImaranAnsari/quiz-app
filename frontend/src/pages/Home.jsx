import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../css/App.css"

export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="auth-form-container" style={{ maxWidth: '700px', border: 'none', background: 'transparent', backdropFilter: 'none', boxShadow: 'none', padding: 0 }}>
        <div className="homePage">
          <div className="card cards bgCard">
            <h1>Welcome to Quiz</h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.1rem',
              marginTop: 'var(--space-md)',
              position: 'relative',
              zIndex: 1
            }}>
              Test your knowledge, challenge yourself, and track your progress
            </p>
          </div>

          <div className="card cards bgCard2">
            <div className='text-buton'>
              <button className='bton' onClick={() => navigate("/register")} style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
                ✨ Register
              </button>
              <button className='bton' onClick={() => navigate("/login")} style={{ padding: '1rem 2.5rem', fontSize: '1.05rem' }}>
                🔑 Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
