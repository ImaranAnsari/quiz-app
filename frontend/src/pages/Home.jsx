import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import "../css/App.css"
export const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="auth-form-container" >

        <div className="homePage">
          <div className="card cards bgCard">
            <h1>Welcome to Quiz</h1>
          </div>

          <div className="card cards bgCard2">
            <div className='text-buton'>
              <button className='bton' onClick={() => navigate("/register")}>Register</button>
              <button className='bton' onClick={() => navigate("/login")}>Login</button>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}
