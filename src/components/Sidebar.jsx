import React from 'react';
import { FaHome, FaUsers, FaCog, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const categories = [
    { name: 'Home', icon: <FaHome />, path: '/' },
    { name: 'Models', icon: <FaUsers />, path: '/models' },
    { name: 'Analytics', icon: <FaChartLine />, path: '/analytics' },
    { name: 'Settings', icon: <FaCog />, path: '/settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2>
      </div>
      
      <ul className="sidebar-menu">
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={category.path} className="sidebar-link">
              {category.icon}
              <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
