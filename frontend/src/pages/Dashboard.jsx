import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../css/App.css';
import { getUser } from '../api/User';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

  useEffect(() => {
    async function getUserDetail() {
      try {
        let resp = await getUser();
        setUserData(resp.data.data);
      } catch (error) {
        console.log('error', error);
      }
    }
    getUserDetail();
  }, []);

  return (
    <div className="dashboard-card">
      <div className="dashboard-card__header">
        <span className="dashboard-card__avatar">👤</span>
        <div>
          <h2 className="dashboard-card__name">{userData.userName || 'User'}</h2>
          <p className="dashboard-card__email">{userData.email || ''}</p>
        </div>
      </div>

      <div className="dashboard-card__details">
        <div className="dashboard-card__row">
          <span className="dashboard-card__label">Name</span>
          <span className="dashboard-card__value">{userData.userName}</span>
        </div>
        <div className="dashboard-card__row">
          <span className="dashboard-card__label">Email</span>
          <span className="dashboard-card__value">{userData.email}</span>
        </div>
        <div className="dashboard-card__row">
          <span className="dashboard-card__label">Contact No</span>
          <span className="dashboard-card__value">{userData.contact}</span>
        </div>
        <div className="dashboard-card__row dashboard-card__row--last">
          <span className="dashboard-card__label">Address</span>
          <span className="dashboard-card__value">{userData.address}</span>
        </div>
      </div>

      <div className="dashboard-card__actions">
        <button className='bton' onClick={() => navigate("/dashboard/edituser")}>
          ✏️ Edit Profile
        </button>
        <button className='bton' onClick={() => navigate("/dashboard/changepassword")}>
          🔒 Change Password
        </button>
      </div>
    </div>
  )
}
