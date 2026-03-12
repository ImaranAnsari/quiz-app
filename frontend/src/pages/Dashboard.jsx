import React from 'react';
import { useNavigate } from 'react-router-dom';


import '../css/App.css';
import { UserDetail } from "../components/UserDetail";
import { Sidebar } from "../components/Sidebar";



export const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>

        <Sidebar />
        <UserDetail />
        <div className='button'>
          <button className='bton' onClick={() => navigate("/edituser")}>Edit</button>
          <button className='bton' onClick={() => navigate("/changepassword")}>Change Password</button>
        </div>
      </div>
    </>
  )
}

