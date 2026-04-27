import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../css/global.css';
import { changePassword } from '../api/User';
import { Lock, Save, ArrowLeft } from 'lucide-react';

export const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const Old_Password_ref = useRef();
  const New_Password_ref = useRef();
  const Confirm_Password_ref = useRef();
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  async function submitChangeHandler(event) {
    event.preventDefault();
    const newPassword = New_Password_ref.current.value;
    const confirm_password = Confirm_Password_ref.current.value;
    if (newPassword !== confirm_password) {
      setError('New passwords do not match.');
      return;
    }
    setError('');
    setSaving(true);
    const user = {
      oldPassword: Old_Password_ref.current.value,
      newPassword,
      confirm_password,
    };
    try {
      await changePassword(user);
      setToast('Password updated successfully!');
      Old_Password_ref.current.value = '';
      New_Password_ref.current.value = '';
      Confirm_Password_ref.current.value = '';
    } catch (err) {
      setError('Failed to update password. Check your old password.');
      console.log('error', err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="main">
      {/* <div className="topbar">
        <h2>Change Password</h2>
        <button className="btn btn--outline" onClick={() => navigate("/dashboard/edituser")}>
          <ArrowLeft size={15} /> Back to Settings
        </button>
      </div> */}

      {toast && (
        <div className="toast" style={{ position: 'relative', bottom: 'auto', right: 'auto', marginBottom: 'var(--space-lg)', borderLeft: '4px solid var(--color-success)' }}>
          ✅ {toast}
        </div>
      )}

      <div style={{ maxWidth: "50%" }}>
        <div className="card">
          <div className="card-header">
            <Lock size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} /> Update Password
          </div>
          <div className="card-body">
            {error && <div className="error-text" style={{ marginBottom: 'var(--space-md)' }}>⚠️ {error}</div>}
            <form id="change-password-form" onSubmit={submitChangeHandler}>
              <div className="form-field">
                <label htmlFor="oldPassword">Current Password</label>
                <input type="password" id="oldPassword" placeholder="Enter current password" ref={Old_Password_ref} required autoComplete="current-password" />
              </div>
              <div className="form-field">
                <label htmlFor="newPassword">New Password</label>
                <input type="password" id="newPassword" placeholder="Enter new password" ref={New_Password_ref} required autoComplete="new-password" />
              </div>
              <div className="form-field">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input type="password" id="confirmPassword" placeholder="Confirm new password" ref={Confirm_Password_ref} required autoComplete="new-password" />
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-md)', marginTop: 'var(--space-lg)', flexWrap: 'wrap' }}>
                <button id="change-password-btn" className="btn" type="submit" disabled={saving}>
                  <Save size={15} /> {saving ? 'Updating...' : 'Update Password'}
                </button>
                <button className="btn btn--outline" type="button" onClick={() => navigate("/dashboard")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
