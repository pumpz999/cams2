import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturedPage from './pages/FeaturedPage';
import PremiumPage from './pages/PremiumPage';
import MostViewedPage from './pages/MostViewedPage';
import AllModelsPage from './pages/AllModelsPage';
import SourcePage from './pages/SourcePage';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/featured" element={<FeaturedPage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/most-viewed" element={<MostViewedPage />} />
            <Route path="/all-models" element={<AllModelsPage />} />
            <Route path="/source/:source" element={<SourcePage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
