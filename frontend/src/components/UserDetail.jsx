import React, { useEffect, useState } from 'react'

import '../css/global.css';
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
        <h1>👤 User Detail</h1>
        <div style={{ width: '100%' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-md) 0',
            borderBottom: '1px solid var(--border-glass)',
          }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Name</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{userData.userName}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-md) 0',
            borderBottom: '1px solid var(--border-glass)',
          }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Email</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{userData.email}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-md) 0',
            borderBottom: '1px solid var(--border-glass)',
          }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Contact No</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{userData.contact}</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--space-md) 0',
          }}>
            <span style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>Address</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{userData.address}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
