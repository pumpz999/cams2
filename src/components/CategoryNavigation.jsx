import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaStar, FaCrown, FaFire, FaThList } from 'react-icons/fa';
import '../styles/CategoryNavigation.css';

const categories = [
  { name: 'Home', icon: <FaHome />, path: '/' },
  { name: 'Featured', icon: <FaStar />, path: '/featured' },
  { name: 'Premium', icon: <FaCrown />, path: '/premium' },
  { name: 'Most Viewed', icon: <FaFire />, path: '/most-viewed' },
  { name: 'All Models', icon: <FaThList />, path: '/all-models' }
];

const sources = [
  { name: 'XloveCam', path: '/source/xlovecam' },
  { name: 'Chaturbate', path: '/source/chaturbate' },
  { name: 'Stripchat', path: '/source/stripchat' }
];

const CategoryNavigation = () => {
  const location = useLocation();

  return (
    <div className="category-navigation">
      <div className="main-categories">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className={`category-link ${location.pathname === category.path ? 'active' : ''}`}
          >
            {category.icon}
            <span>{category.name}</span>
          </Link>
        ))}
      </div>
      
      <div className="source-categories">
        <h3>By Source</h3>
        {sources.map((source) => (
          <Link
            key={source.name}
            to={source.path}
            className={`source-link ${location.pathname === source.path ? 'active' : ''}`}
          >
            {source.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNavigation;
