import React from 'react';
import { FaCog, FaKey, FaShieldAlt, FaUser, FaInfoCircle } from 'react-icons/fa';
import '../styles/AdminGuide.css';

const AdminGuide = () => {
  return (
    <div className="admin-guide">
      <h2><FaInfoCircle /> Admin Guide</h2>
      
      <div className="guide-section">
        <h3><FaCog /> Getting Started</h3>
        <ol>
          <li>Access the admin panel at /admin/login</li>
          <li>Use your admin credentials to login</li>
          <li>Complete the 2FA verification</li>
        </ol>
      </div>
      
      <div className="guide-section">
        <h3><FaKey /> API Settings</h3>
        <ol>
          <li>Navigate to API Settings in the dashboard</li>
          <li>Enter credentials for each platform</li>
          <li>Save changes (requires 2FA verification)</li>
        </ol>
      </div>
      
      <div className="guide-section">
        <h3><FaShieldAlt /> Security Best Practices</h3>
        <ul>
          <li>Use strong, unique passwords</li>
          <li>Enable 2FA for all admin accounts</li>
          <li>Regularly rotate API keys</li>
          <li>Monitor access logs</li>
        </ul>
      </div>
      
      <div className="guide-section">
        <h3><FaUser /> User Management</h3>
        <ul>
          <li>Create and manage admin accounts</li>
          <li>Set role-based permissions</li>
          <li>Monitor user activity</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminGuide;
