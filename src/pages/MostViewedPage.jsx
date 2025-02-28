import React from 'react';
import CategoryNavigation from '../components/CategoryNavigation';
import ModelGrid from '../components/ModelGrid';
import '../styles/HomePage.css';

const MostViewedPage = () => {
  return (
    <div className="home-page">
      <CategoryNavigation />
      <ModelGrid category="most-viewed" />
    </div>
  );
};

export default MostViewedPage;
