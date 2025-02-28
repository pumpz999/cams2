import React from 'react';
import { FaStar, FaCrown, FaEye } from 'react-icons/fa';
import '../styles/ModelCard.css';

const ModelCard = ({ model }) => {
  return (
    <div className="model-card">
      <div className="model-image">
        <img src={model.image} alt={model.nickname} />
        <div className="model-badges">
          {model.isFeatured && <span className="badge featured"><FaStar /> Featured</span>}
          {model.isPremium && <span className="badge premium"><FaCrown /> Premium</span>}
          <span className="badge source">{model.source}</span>
        </div>
      </div>
      
      <div className="model-info">
        <h3>{model.nickname}</h3>
        <p>{model.country}</p>
        <div className="model-stats">
          <span><FaEye /> {model.views || 0} views</span>
        </div>
      </div>
    </div>
  );
};

export default ModelCard;
