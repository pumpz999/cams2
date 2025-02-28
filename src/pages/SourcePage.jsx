import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryNavigation from '../components/CategoryNavigation';
import ModelGrid from '../components/ModelGrid';
import '../styles/HomePage.css';

const SourcePage = () => {
  const { source } = useParams();
  return (
    <div className="home-page">
      <CategoryNavigation />
      <ModelGrid source={source} />
    </div>
  );
};

export default SourcePage;
