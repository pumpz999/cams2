import React from 'react';
import CategoryNavigation from '../components/CategoryNavigation';
import ModelGrid from '../components/ModelGrid';
import '../styles/HomePage.css';

const AllModelsPage = () => {
  return (
    <div className="home-page">
      <CategoryNavigation />
      <ModelGrid />
    </div>
  );
};

export default AllModelsPage;
