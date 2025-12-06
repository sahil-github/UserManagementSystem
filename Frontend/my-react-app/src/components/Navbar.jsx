// frontend/src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">👥</span>
          User Management
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/')}`}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/users" className={`nav-link ${isActive('/users')}`}>
              Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add-user" className={`nav-link ${isActive('/add-user')}`}>
              Add User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/send-notification" className={`nav-link ${isActive('/send-notification')}`}>
              Send Notification
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;