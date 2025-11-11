import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-copyright">
          © 2025 DSA Master. All Rights Reserved.
        </p>
        <div className="footer-links">
          <Link to="/about" className="footer-link">About Us</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
