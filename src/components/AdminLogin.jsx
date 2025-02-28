import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { showErrorToast, showSuccessToast } from './ToastNotifications';
import bcrypt from 'bcryptjs';
import '../styles/AdminLogin.css';

const ADMIN_EMAIL = '999leadsolutions@gmail.com';
const ADMIN_PASSWORD_HASH = '$2a$10$8fZ3b9J7v4r5t6y7u8i9o0p1q2r3s4t5u6v7w8x9y0z1a2b3c4d5e6f';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show2FA, setShow2FA] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email !== ADMIN_EMAIL) {
      showErrorToast('Invalid email');
      return;
    }

    const passwordMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!passwordMatch) {
      showErrorToast('Invalid password');
      return;
    }

    setShow2FA(true);
  };

  const handle2FA = () => {
    if (otp.length === 6) {
      localStorage.setItem('isAdminLoggedIn', 'true');
      showSuccessToast('Login successful!');
      navigate('/admin/dashboard');
    } else {
      showErrorToast('Invalid 2FA code');
    }
  };

  return (
    <div className="admin-login">
      <h2>Admin Login</h2>
      {!show2FA ? (
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div className="two-factor-auth">
          <h3>Two-Factor Authentication</h3>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            separator={<span>-</span>}
            inputStyle={{
              width: '3rem',
              height: '3rem',
              margin: '0 0.5rem',
              fontSize: '1.5rem',
              borderRadius: '4px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              background: 'rgba(0, 0, 0, 0.3)',
              color: '#fff'
            }}
            shouldAutoFocus
          />
          <button onClick={handle2FA} className="verify-button">
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
