import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const [affiliateId, setAffiliateId] = useState('24010');
  const [secretKey, setSecretKey] = useState('d87ac7785760d9190ca3b4d366980ec2');

  const handleSaveChanges = () => {
    // Save the updated API values to the server
    console.log('Affiliate ID:', affiliateId);
    console.log('Secret Key:', secretKey);
  };

  return (
    <div>
      <header>
        <h1>XxxCams.org Admin Panel</h1>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      <main>
        <div className="admin-panel">
          <h2>API Settings</h2>
          <label>
            Affiliate ID:
            <input
              type="text"
              value={affiliateId}
              onChange={(e) => setAffiliateId(e.target.value)}
            />
          </label>
          <label>
            Secret Key:
            <input
              type="text"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </label>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </main>
      <footer>
        <p>&copy; 2023 XxxCams.org. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminPanel;
