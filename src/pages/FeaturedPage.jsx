import React from 'react';
import CategoryNavigation from '../components/CategoryNavigation';
import ModelGrid from '../components/ModelGrid';
import '../styles/HomePage.css';

const FeaturedPage = () => {
  return (
    <div className="home-page">
      <CategoryNavigation />
      <ModelGrid category="featured" />
    </div>
  );
};

export default FeaturedPage;
