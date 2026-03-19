import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterUserForm } from '../components/RegisterUserForm';
import '../css/App.css';

export const RegisterUser = () => {
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
      <RegisterUserForm loginScreen={navigate} />
      <button className='link-btn' onClick={() => navigate("/login")}>Already have an account? Login here</button>
    </div>
  );
}
