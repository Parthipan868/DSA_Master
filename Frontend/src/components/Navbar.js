import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaUser } from 'react-icons/fa';
import { authAPI } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = authAPI.getStoredUser();
    setUser(storedUser);
  }, [location]);

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

        {user ? (
          <Link to="/profile" className="navbar-user" onClick={scrollToTop}>
            <FaUser className="user-icon" />
            <span>{user.name.toUpperCase()}</span>
          </Link>
        ) : (
          <Link to="/login" className="navbar-user" onClick={scrollToTop}>
            <FaUser className="user-icon" />
            <span>LOGIN</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
