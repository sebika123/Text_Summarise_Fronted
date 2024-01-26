import React, { useEffect } from 'react';
import './Styles.css';
import { useUserAuth } from '../../Context/UserAuthContext';

const NavBar = () => {
  const { user, logOut } = useUserAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <nav>
      <h1>Text Summariser</h1>
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