import React, { useState, useEffect } from 'react';
import { FaSave, FaKey, FaShieldAlt } from 'react-icons/fa';
import OtpInput from 'react-otp-input';
import { showSuccessToast, showErrorToast } from './ToastNotifications';
import '../styles/ApiSettings.css';

const ApiSettings = () => {
  const [settings, setSettings] = useState({
    xlovecam: {
      affiliateId: '',
      secretKey: ''
    },
    chaturbate: {
      apiKey: ''
    },
    stripchat: {
      clientId: '',
      clientSecret: ''
    }
  });

  const [show2FA, setShow2FA] = useState(false);
  const [otp, setOtp] = useState('');

  useEffect(() => {
    const storedSettings = localStorage.getItem('apiSettings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
  }, []);

  const handleChange = (platform, field) => (e) => {
    setSettings(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        [field]: e.target.value
      }
    }));
  };

  const handleSave = () => {
    if (!settings.xlovecam.affiliateId || !settings.xlovecam.secretKey) {
      showErrorToast('XloveCam credentials are required');
      return;
    }
    setShow2FA(true);
  };

  const handle2FA = () => {
    if (otp.length === 6) {
      localStorage.setItem('apiSettings', JSON.stringify(settings));
      showSuccessToast('API settings saved successfully!');
      setShow2FA(false);
    } else {
      showErrorToast('Invalid 2FA code');
    }
  };

  return (
    <div className="api-settings">
      <h3><FaKey /> API Credentials</h3>

      <div className="platform-settings">
        <h4><FaShieldAlt /> XloveCam</h4>
        <div className="form-group">
          <label>Affiliate ID:</label>
          <input
            type="text"
            value={settings.xlovecam.affiliateId}
            onChange={handleChange('xlovecam', 'affiliateId')}
          />
        </div>
        <div className="form-group">
          <label>Secret Key:</label>
          <input
            type="password"
            value={settings.xlovecam.secretKey}
            onChange={handleChange('xlovecam', 'secretKey')}
          />
        </div>
      </div>

      <div className="platform-settings">
        <h4><FaShieldAlt /> Chaturbate</h4>
        <div className="form-group">
          <label>API Key:</label>
          <input
            type="text"
            value={settings.chaturbate.apiKey}
            onChange={handleChange('chaturbate', 'apiKey')}
          />
        </div>
      </div>

      <div className="platform-settings">
        <h4><FaShieldAlt /> Stripchat</h4>
        <div className="form-group">
          <label>Client ID:</label>
          <input
            type="text"
            value={settings.stripchat.clientId}
            onChange={handleChange('stripchat', 'clientId')}
          />
        </div>
        <div className="form-group">
          <label>Client Secret:</label>
          <input
            type="password"
            value={settings.stripchat.clientSecret}
            onChange={handleChange('stripchat', 'clientSecret')}
          />
        </div>
      </div>

      {!show2FA ? (
        <button onClick={handleSave} className="save-button">
          <FaSave /> Save Settings
        </button>
      ) : (
        <div className="two-factor-auth">
          <h4>Two-Factor Authentication</h4>
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

export default ApiSettings;
