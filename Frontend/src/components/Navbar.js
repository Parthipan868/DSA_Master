import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <FaCode />
          </div>
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/problems" className="nav-link">Problems</Link>
          </li>
          <li className="nav-item">
            <Link to="/learn" className="nav-link">Learn</Link>
          </li>
          <li className="nav-item">
            <Link to="/companies" className="nav-link">Companies</Link>
          </li>
        </ul>

        <div className="navbar-user">
          <FaUser className="user-icon" />
          <span>PARTHIPAN</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
