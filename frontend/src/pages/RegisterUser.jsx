import React from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterUserForm } from '../components/RegisterUserForm';
import '../css/App.css';

export const RegisterUser = () => {
  const navigate = useNavigate();
  return (
    <div className='auth-form-container'>
      <RegisterUserForm loginScreen={navigate} />

      <button className='link-btn' onClick={() => navigate("/login")}>If you have already register ? Login Here</button>
    </div>
  );
}
