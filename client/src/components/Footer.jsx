// Import necessary libraries
import React, { useState} from 'react';

const Footer = () => {

    return (
        <footer>
          <img
              className="max-w-xs"
              src="./assets/illustrations/021-cloudy-day-picnic.png"
              alt="Sunny day picnic"
            />
          <ul>
            <li>
              <a href="mailto:jeff@gmail.com">Contact</a>
            </li>
            <li>
              <p>©2023 YardtoTable</p>
            </li>
          </ul>
        </footer>
      );
    };


// Export the Footer component so it can be imported and used in other files
export default Footer;
