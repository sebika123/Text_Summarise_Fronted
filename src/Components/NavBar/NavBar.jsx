import React, { useState,} from 'react';
import './Styles.css';
import { useUserAuth } from "../UserAuthContext";
import logo from '../../Assests/logo.png';
import { useHistory } from '../HistoryContext';


const NavBar = () => {
  const { user, logOut } = useUserAuth();
  const { history } = useHistory();
  const [showHistory, setShowHistory] = useState(false);

  const fetchHistory = () => {
    setShowHistory(true);
  };

  return (
    <nav>
      <div className="header">
        <h1>Text Summariser</h1>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "50px", marginLeft: "10px" }}
        />
      </div>
      <ul>
        <li title="Username">
          {user && (
            <>
              <img
                src={user.profilePicture || "default-profile-picture.png"} 
                alt="Profile"
                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
              />
              <span>{user.username || user.name}</span>
            </>
          )}
        </li>
        {user && (
          <li title="History" onClick={fetchHistory}>
            <span id="history-text">History</span>
          </li>
        )}
        <li title="Logout">
          <button onClick={logOut} id="logout-button">
            <i className="ri-logout-box-r-line"></i>
          </button>
        </li>
      </ul>
      {showHistory && (
        <div className="history-popup">
          <h2>History</h2>
          <ul>
            {history.map((item, index) => (
              <li key={index}>
                <strong>Input:</strong> {item.input}
                <br />
                <strong>Output:</strong> {item.output}
              </li>
            ))}
          </ul>
          <button onClick={() => setShowHistory(false)}>Close</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
