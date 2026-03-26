import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterUserForm } from '../components/RegisterUserForm';
import '../css/global.css';

export const RegisterUser = () => {
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <RegisterUserForm loginScreen={navigate} />
      <button className="link-btn" onClick={() => navigate("/login")}>
        Already have an account? <span style={{ fontWeight: 700 }}>Login here</span>
      </button>
    </div>
  );
}
