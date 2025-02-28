import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import '../styles/ModelFilters.css';

const ModelFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    country: '',
    ageRange: [18, 99],
    onlineOnly: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <div className="filters-container">
      <h3><FaFilter /> Filter Models</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={filters.country}
            onChange={handleChange}
            placeholder="Enter country"
          />
        </div>
        
        <div className="form-group">
          <label>Age Range:</label>
          <div className="range-inputs">
            <input
              type="number"
              name="ageMin"
              value={filters.ageRange[0]}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                ageRange: [e.target.value, prev.ageRange[1]]
              }))}
              min="18"
              max="99"
            />
            <span>to</span>
            <input
              type="number"
              name="ageMax"
              value={filters.ageRange[1]}
              onChange={(e) => setFilters(prev => ({
                ...prev,
                ageRange: [prev.ageRange[0], e.target.value]
              }))}
              min="18"
              max="99"
            />
          </div>
        </div>
        
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="onlineOnly"
              checked={filters.onlineOnly}
              onChange={handleChange}
            />
            Show Online Only
          </label>
        </div>
        
        <button type="submit">Apply Filters</button>
      </form>
    </div>
  );
};

export default ModelFilters;
