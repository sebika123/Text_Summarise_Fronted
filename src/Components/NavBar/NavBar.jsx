import React, { useEffect } from 'react';
import './Styles.css';
import { useUserAuth } from '../../Context/UserAuthContext';
import logo from "../../Assests/logo.png";

const NavBar = () => {
  const { user, logOut } = useUserAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

 return (
    <nav>
      <div className="header">
        <h1>Text Summariser</h1>
        <img src={logo} alt="Logo" style={{ width: '50px', marginLeft: '10px' }} />
      </div>
      <ul>
        <li title='Username'>
          {user && (
            <>
              <img
                src={user.profilePicture || 'default-profile-picture.png'} // Use a default image if user.profilePicture is not set
                alt="Profile"
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />
              <span>{user.username || user.name}</span> 
            </>
          )}
        </li>
        <li title='History'>
          <span id='history-text'>History</span>
        </li>
        <li title='Logout'>
          <button onClick={logOut} id='logout-button'>
            <i className="ri-logout-box-r-line"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;