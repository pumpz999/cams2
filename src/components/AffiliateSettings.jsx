import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import XloveCamAffiliate from '../api/xlovecamApi';

const AffiliateSettings = () => {
  const [affiliateId, setAffiliateId] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem('affiliateSettings');
    if (savedSettings) {
      const { id, key } = JSON.parse(savedSettings);
      setAffiliateId(id);
      setSecretKey(key);
    }
  }, []);

  const testApiCredentials = async () => {
    try {
      const affiliate = new XloveCamAffiliate(affiliateId, secretKey);
      const models = await affiliate.getOnlineModels(5);
      
      setTestResult({
        success: true,
        modelCount: models.length,
        models: models
      });

      localStorage.setItem('affiliateSettings', JSON.stringify({
        id: affiliateId,
        key: secretKey
      }));

      toast.success('API Credentials Verified Successfully!');
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message
      });
      toast.error('API Credentials Verification Failed');
    }
  };

  return (
    <div className="affiliate-settings">
      <h2>XloveCam Affiliate Settings</h2>
      <div>
        <label>Affiliate ID:</label>
        <input 
          type="text" 
          value={affiliateId}
          onChange={(e) => setAffiliateId(e.target.value)}
        />
      </div>
      <div>
        <label>Secret Key:</label>
        <input 
          type="password" 
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
        />
      </div>
      <button onClick={testApiCredentials}>
        Test API Credentials
      </button>

      {testResult && (
        <div>
          {testResult.success ? (
            <div>
              <p>Verification Successful</p>
              <p>Online Models: {testResult.modelCount}</p>
            </div>
          ) : (
            <div>
              <p>Verification Failed</p>
              <p>Error: {testResult.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AffiliateSettings;
