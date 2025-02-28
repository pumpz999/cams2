import React from 'react';
import { FaHeart, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3><FaInfoCircle /> About Us</h3>
          <p>Your comprehensive cam platform solution</p>
        </div>
        
        <div className="footer-section">
          <h3><FaShieldAlt /> Security</h3>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Data Protection</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3><FaHeart /> Support</h3>
          <ul>
            <li>Contact Us</li>
            <li>FAQ</li>
            <li>Documentation</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} XxxCams.org. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
