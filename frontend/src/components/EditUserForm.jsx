import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/global.css';
import { updateUser, getUser } from '../api/User';
import { User, Pencil, Save, X } from 'lucide-react';

export const EditUserForm = () => {
  const navigate = useNavigate();
  const User_Name_ref = useRef();
  const Contact_ref = useRef();
  const Address_ref = useRef();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  async function submitUpdateHandler(event) {
    event.preventDefault();
    setSaving(true);
    const user = {
      userName: User_Name_ref.current.value,
      contact: Contact_ref.current.value,
      address: Address_ref.current.value,
    };
    try {
      await updateUser(user);
      setToast('Profile updated successfully!');
    } catch (err) {
      setToast('Failed to update profile.');
      console.log('error', err);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    async function getUserDetail() {
      try {
        let resp = await getUser();
        setUserData(resp.data.data);
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoading(false);
      }
    }
    getUserDetail();
  }, []);

  return (
    <div className="main">
      <div className="topbar">
        <h2>Settings</h2>
      </div>

      {toast && (
        <div className="toast" style={{ position: 'relative', bottom: 'auto', right: 'auto', marginBottom: 'var(--space-lg)', borderLeft: '4px solid var(--color-success)' }}>
          ✅ {toast}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-xl)', alignItems: 'start' }}>
        {/* Edit Profile Card */}
        <div className="card">
          <div className="card-header">
            <Pencil size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Edit Profile
          </div>
          <div className="card-body">
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                <div className="skeleton" style={{ height: 40 }} />
                <div className="skeleton" style={{ height: 40 }} />
                <div className="skeleton" style={{ height: 40 }} />
              </div>
            ) : (
              <form id="edit-profile-form" onSubmit={submitUpdateHandler}>
                <div className="form-field">
                  <label htmlFor="userName">User Name</label>
                  <input type="text" id="userName" placeholder="Your name" defaultValue={userData.userName} ref={User_Name_ref} />
                </div>
                <div className="form-field">
                  <label htmlFor="contact">Contact No</label>
                  <input type="tel" id="contact" placeholder="Your contact number" defaultValue={userData.contact} ref={Contact_ref} />
                </div>
                <div className="form-field">
                  <label htmlFor="address">Address</label>
                  <input type="text" id="address" placeholder="Your address" defaultValue={userData.address} ref={Address_ref} />
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)', flexWrap: 'wrap' }}>
                  <button id="save-profile-btn" className="btn" type="submit" disabled={saving}>
                    <Save size={15} /> {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button className="btn btn--outline" type="button" onClick={() => navigate("/dashboard")}>
                    <X size={15} /> Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Account Info Card */}
        {!loading && (
          <div className="card">
            <div className="card-header">
              <User size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Account Info
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
              {[
                { label: 'Name', value: userData.userName },
                { label: 'Email', value: userData.email },
                { label: 'Contact', value: userData.contact },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-sm) 0', borderBottom: '1px solid var(--color-border)' }}>
                  <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600, fontSize: '0.875rem' }}>{label}</span>
                  <span style={{ fontWeight: 700 }}>{value || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
