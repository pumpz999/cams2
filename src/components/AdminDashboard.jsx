import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiSettings from './ApiSettings';
import AdminGuide from './AdminGuide';
import { showSuccessToast } from './ToastNotifications';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('settings');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    showSuccessToast('Logged out successfully');
    navigate('/admin/login');
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      <div className="dashboard-nav">
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          API Settings
        </button>
        <button
          className={activeTab === 'guide' ? 'active' : ''}
          onClick={() => setActiveTab('guide')}
        >
          Admin Guide
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'settings' && <ApiSettings />}
        {activeTab === 'guide' && <AdminGuide />}
      </div>
    </div>
  );
};

export default AdminDashboard;
