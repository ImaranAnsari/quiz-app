import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/App.css';
import { changePassword } from '../api/User';

export const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const Old_Password_ref = useRef();
  const New_Password_ref = useRef();
  const Confirm_Password_ref = useRef();

  async function submitChangeHandler(event) {
    event.preventDefault();
    const oldPassword = Old_Password_ref.current.value;
    const newPassword = New_Password_ref.current.value;
    const confirm_password = Confirm_Password_ref.current.value;

    const user = {
      oldPassword,
      newPassword,
      confirm_password
    }
    await changePassword(user)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: 'var(--space-xl)'
    }}>
      <div className='auth-form-container'>
        <h1>🔒 Change Password</h1>
        <form className='register-form' onSubmit={submitChangeHandler}>
          <div>
            <label htmlFor="oldPassword">Old Password</label>
            <input type="password" placeholder="Enter old password" id="oldPassword" ref={Old_Password_ref} />
          </div>
          <div>
            <label htmlFor="newPassword">New Password</label>
            <input type="password" placeholder="Enter new password" id="newPassword" ref={New_Password_ref} />
          </div>
          <div>
            <label htmlFor="confirm_password">Confirm Password</label>
            <input type="password" placeholder="Confirm new password" id="confirm_password" ref={Confirm_Password_ref} />
          </div>

          <div className='button'>
            <button className='bton' type="submit">Update Password</button>
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
