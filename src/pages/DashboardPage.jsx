import React, { useState, useEffect } from 'react';
import XloveCamAffiliate from '../api/xlovecamApi';
import { toast } from 'react-toastify';

const DashboardPage = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const settings = JSON.parse(localStorage.getItem('affiliateSettings') || '{}');
        
        if (!settings.id || !settings.key) {
          toast.error('Please configure your affiliate credentials');
          setLoading(false);
          return;
        }

        const affiliate = new XloveCamAffiliate(settings.id, settings.key);
        const onlineModels = await affiliate.getOnlineModels(50);
        
        setModels(onlineModels);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch models');
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  if (loading) return <div>Loading models...</div>;

  return (
    <div className="dashboard">
      <h1>Online Models</h1>
      <div className="model-grid">
        {models.map(model => (
          <div key={model.id} className="model-card">
            <img src={model.image} alt={model.nickname} />
            <h3>{model.nickname}</h3>
            <p>Country: {model.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
