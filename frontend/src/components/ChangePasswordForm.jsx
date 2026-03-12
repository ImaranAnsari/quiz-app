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
    <div className='auth-form-container'>
      <h1>Change Password</h1>
      <form className='register-form' onSubmit={submitChangeHandler}>
        <div >
          <label htmlFor="oldPassword">Old Password</label><br />
          <input type="password" placeholder="Old Password" id="oldPassword" ref={Old_Password_ref} />
        </div>
        <div >
          <label htmlFor="newPassword">newPassword</label><br />
          <input type="password" placeholder="newPassword" id="newPassword" ref={New_Password_ref} />
        </div>
        <div >
          <label htmlFor="confirm_password">Confirm Password</label><br />
          <input type="password" placeholder="Confirm Password" id="confirm_password" ref={Confirm_Password_ref} />
        </div>

        <div >
          <button className='bton'>Submit</button>
          <button className='bton' onClick={() => navigate("/dashboard")}>Cancel</button>

        </div>
      </form>
    </div>
  )
}
