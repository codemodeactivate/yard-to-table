// Import necessary libraries
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
 
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
           
          </ul>
        </nav>
      );
    };
    

// Export the Nav component so it can be imported and used in other files
export default Nav;
