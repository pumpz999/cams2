import React from 'react';
import CategoryNavigation from '../components/CategoryNavigation';
import ModelGrid from '../components/ModelGrid';
import '../styles/HomePage.css';

const PremiumPage = () => {
  return (
    <div className="home-page">
      <CategoryNavigation />
      <ModelGrid category="premium" />
    </div>
  );
};

export default PremiumPage;
