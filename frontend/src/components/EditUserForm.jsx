import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/App.css';
import { updateUser, getUser } from '../api/User';

export const EditUserForm = () => {

  const navigate = useNavigate();
  const User_Name_ref = useRef();
  const Contact_ref = useRef();
  const Address_ref = useRef();

  async function submitUpdateHandler(event) {
    event.preventDefault();
    const userName = User_Name_ref.current.value;
    const contact = Contact_ref.current.value;
    const address = Address_ref.current.value;

    const user = {
      userName,
      contact,
      address
    }
    await updateUser(user)
  }

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
    getUserDetail()
  }, []);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 'var(--space-xl)'
    }}>
      <div className='auth-form-container' style={{ maxWidth: '520px' }}>
        <h1>✏️ Edit Profile</h1>
        <form className='register-form' onSubmit={submitUpdateHandler}>
          <div>
            <label htmlFor="userName">User Name</label>
            <input type="text" placeholder="User Name" id="userName" defaultValue={userData.userName} ref={User_Name_ref} />
          </div>
          <div>
            <label htmlFor="contact">Contact No</label>
            <input type="text" placeholder="Contact No" id="contact" defaultValue={userData.contact} ref={Contact_ref} />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" placeholder="Address" id="address" defaultValue={userData.address} ref={Address_ref} />
          </div>

          <div className='button'>
            <button className='bton' type="submit">Save Changes</button>
            <button className='bton' type="button" onClick={() => navigate("/dashboard")} style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid var(--border-glass-hover)'
            }}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}
