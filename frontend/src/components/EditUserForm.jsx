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
    <div className='auth-form-container editUser'>
      <h1>Edit user</h1>
      <form className='register-form' onSubmit={submitUpdateHandler}>
        <div >
          <label htmlFor="userName">User Name</label><br />
          <input type="text" placeholder="User Name" id="userName" value={userData.userName} ref={User_Name_ref} />
        </div>
        <div >
          <label htmlFor="contact">Contact No</label><br />
          <input type="text" placeholder="Contact No" id="contact" value={userData.contact} ref={Contact_ref} />
        </div>
        <div >
          <label htmlFor="address">Address</label><br />
          <input type="text" placeholder="Address" id="address" value={userData.address} ref={Address_ref} />
        </div>

        <div >
          <button className='bton'>Submit</button>
          <button className='bton' onClick={() => navigate("/dashboard")}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
