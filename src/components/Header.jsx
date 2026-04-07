import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { SiBabel } from 'react-icons/si'; // using a logo resembling atomic/knot
import './Header.css';

const Header = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Kesehatan', path: '/kesehatan' },
    { name: 'Otomotif', path: '/otomotif' },
    { name: 'Politik', path: '/politik' },
    { name: 'Olahraga', path: '/olahraga' },
    { name: 'Nasional', path: '/nasional' },
    { name: 'Internasional', path: '/internasional' },
  ];

  return (
    <header className="header">
      <div className="container header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <SiBabel className="logo-icon" />
          <span className="logo-text">Berita Kini</span>
        </Link>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-list">
            {navLinks.map((link, index) => (
              <li key={index} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Icon */}
        <div className="user-icon-container">
          <FaRegUserCircle className="user-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
