import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [affiliateId, setAffiliateId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (!affiliateId || !secretKey) {
      setError('Both fields are required');
      return;
    }
    
    // Save to localStorage (or your backend)
    localStorage.setItem('affiliateId', affiliateId);
    localStorage.setItem('secretKey', secretKey);
    
    setSuccess('Settings saved successfully!');
    setError('');
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div className="admin-panel">
      <h2>API Settings</h2>
      <div className="admin-instructions">
        <h3>How to Get API Values:</h3>
        <ol>
          <li>Login to your XloveCam affiliate account</li>
          <li>Navigate to the API section</li>
          <li>Copy your Affiliate ID and Secret Key</li>
          <li>Paste them in the fields below</li>
        </ol>
      </div>
      
      <div className="form-group">
        <label>Affiliate ID:</label>
        <input
          type="text"
          value={affiliateId}
          onChange={(e) => setAffiliateId(e.target.value)}
        />
      </div>
      
      <div className="form-group">
        <label>Secret Key:</label>
        <input
          type="password"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <button onClick={handleSave}>Save Settings</button>
    </div>
  );
};

export default AdminPanel;
