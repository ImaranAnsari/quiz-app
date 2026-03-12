import React, { useEffect, useState } from 'react'

import '../css/App.css';
import { getUser } from '../api/User';


export const UserDetail = () => {

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

    <div className='user-form'>
      <div className='user-detail'>

        <h1> User Detail</h1>
        <table>
          <tbody>
            <tr>
              <td>Name :</td>
              <td> {userData.userName}</td>
            </tr>
            <tr>
              <td>Email :</td>
              <td>{userData.email} </td>
            </tr>
            <tr>
              <td>Contact No :</td>
              <td>{userData.contact}</td>
            </tr>
            <tr>
              <td>Address :</td>
              <td>{userData.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
