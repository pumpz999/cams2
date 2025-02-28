import React from 'react';
import { FaTimes } from 'react-icons/fa';
import '../styles/ModelDetailsModal.css';

const ModelDetailsModal = ({ model, onClose }) => {
  if (!model) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        
        <div className="modal-header">
          <img src={model.image} alt={model.nickname} />
          <h2>{model.nickname}</h2>
        </div>
        
        <div className="modal-body">
          <div className="details-section">
            <h3>Profile Details</h3>
            <p>Age: {model.age || 'N/A'}</p>
            <p>Height: {model.height || 'N/A'} cm</p>
            <p>Weight: {model.weight || 'N/A'} kg</p>
            <p>Country: {model.country || 'N/A'}</p>
          </div>
          
          <div className="status-section">
            <h3>Status</h3>
            <p className={`status ${model.is_online ? 'online' : 'offline'}`}>
              {model.is_online ? 'Online Now' : 'Offline'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetailsModal;
