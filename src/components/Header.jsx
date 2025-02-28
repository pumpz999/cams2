import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          XxxCams.org
        </Link>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/featured">Featured</Link>
          <Link to="/premium">Premium</Link>
          <Link to="/most-viewed">Most Viewed</Link>
          <Link to="/all-models">All Models</Link>
          <Link to="/blog">Blog</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
