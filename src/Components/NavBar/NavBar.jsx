import React, { useEffect, useState } from 'react';
import './Styles.css';
import { useUserAuth } from '../../Context/UserAuthContext';
import logo from '../../Assests/logo.png';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showHistory, setShowHistory] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate('/login');
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  // Example history usage for conditionally rendering based on location
  const isHomePage = location.pathname === '/home';

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, backgroundColor: 'rgba(232, 103, 184, 0.9)' }}>
      <div className="container-fluid">
        <Link to="/home" className="navbar-brand" title="Home">
          <h1>Text Summariser</h1>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "50px", marginLeft: "10px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/textbox" className="nav-link" title="Summary">
                Summary
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" title="About Us">
                About Us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center">
            {user && (
              <>
                <img
                  src={user.profilePicture}
                  alt="Profile"
                  style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
                />
                <span>{user.name}</span>
              </>
            )}
            {user && (
              <button onClick={logOut} className="btn btn-outline-danger mx-2" title="Logout">
                Logout
              </button>
            )}
            {isHomePage && (
              <button onClick={() => setShowHistory(true)} className="btn btn-outline-danger mx-2" title="Show History">
                Show History
              </button>
            )}
            {showHistory && (
              <div className="history-popup">
                <h2>History</h2>
                {/* History content */}
                <button onClick={() => setShowHistory(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
