// Import necessary libraries
import React, { useState} from 'react';

const Footer = () => {

    return (
        <footer className="flex items-end justify-between">
          <img
              className="max-w-1 mx-10"
              src="./assets/illustrations/023-hummingbird-tulips.png"
              alt="Hummingbird and tulips"
            />
          <ul className="text-yard-blue text-right mx-5 my-3">
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
