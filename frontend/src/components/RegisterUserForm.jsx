import React, { useRef } from 'react'

import '../css/style.css';
import { register } from "../api/User"

export const RegisterUserForm = ({ loginScreen }) => {
  const user_name_ref = useRef();
  const email_ref = useRef();
  const contact_ref = useRef();
  const address_ref = useRef();
  const password_ref = useRef();
  const confirm_password_ref = useRef();

  async function submitHandler(event) {
    event.preventDefault();
    const userName = user_name_ref.current.value;
    const email = email_ref.current.value;
    const contact = contact_ref.current.value;
    const address = address_ref.current.value;
    const password = password_ref.current.value;
    const confirm_password = confirm_password_ref.current.value;

    const user = {
      userName,
      email,
      contact,
      address,
      password,
      confirm_password
    }
    await register(user, loginScreen)
  }

  return (
    <>
      <h1 className='heading'>✨ Registration</h1>
      <div className="container">
        <form onSubmit={submitHandler}>
          <div className="user__details">
            <div className="input__box">
              <span className="details">Full Name</span>
              <input type="text" placeholder="Enter your name" id="userName" ref={user_name_ref} />
            </div>
            <div className="input__box">
              <span className="details">Email</span>
              <input type="text" placeholder="Enter your email" id="email" ref={email_ref} />
            </div>
            <div className="input__box">
              <span className="details">Contact</span>
              <input type="text" placeholder="Enter contact number" id="contact" ref={contact_ref} />
            </div>
            <div className="input__box">
              <span className="details">Address</span>
              <input type="text" placeholder="Enter your address" id="address" ref={address_ref} />
            </div>
            <div className="input__box">
              <span className="details">Password</span>
              <input type="password" placeholder="Create a password" id="password" ref={password_ref} />
            </div>
            <div className="input__box">
              <span className="details">Confirm Password</span>
              <input type="password" placeholder="Confirm your password" id="confirm_password" ref={confirm_password_ref} />
            </div>
          </div>
          <div className="button">
            <button className='bton' style={{ width: '100%', padding: '1rem' }}>Create Account</button>
          </div>
        </form>
      </div>
    </>
  )
}
