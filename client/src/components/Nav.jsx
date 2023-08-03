// Import necessary libraries
import React, { useState} from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    // remove token from localStorage
    localStorage.removeItem('token');
    // set loggedIn to false
    setLoggedIn(false);
    // redirect to home page
    window.location.replace('/');
  };

    return (
        <nav>
          <ul>
            <li>
              <Link to="/search">Search</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/profile-master">Profile Master</Link>
            </li>

            {loggedIn ? ( // if logged in, show logout button
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            // else show login button
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}

          </ul>
        </nav>
      );
    };


// Export the Nav component so it can be imported and used in other files
export default Nav;
