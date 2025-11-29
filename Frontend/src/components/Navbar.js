import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={scrollToTop}>
          <div className="logo-icon">
            <FaCode />
          </div>
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={scrollToTop}>Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/problems" className="nav-link" onClick={scrollToTop}>Problems</Link>
          </li>
          <li className="nav-item">
            <Link to="/learn" className="nav-link" onClick={scrollToTop}>Learn</Link>
          </li>
          <li className="nav-item">
            <Link to="/companies" className="nav-link" onClick={scrollToTop}>Companies</Link>
          </li>
        </ul>

        <Link to="/profile" className="navbar-user" onClick={scrollToTop}>
          <FaUser className="user-icon" />
          <span>PARTHIPAN</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
