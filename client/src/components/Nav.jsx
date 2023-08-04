import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrowel } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useAuth } from "../utils/AuthContext";
const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const trowelIcon = <FontAwesomeIcon icon={faTrowel} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;

const Nav = () => {
  const { loggedIn, setLoggedIn } = useAuth();

  // useEffect(() => {
  //   // check localStorage for token
  //   const token = localStorage.getItem("token");
  //   // if token is found, set loggedIn to true
  //   setLoggedIn(!!token);
  // }, []);

  // useEffect(() => {
  //   // Listen for changes in the localStorage "token" key
  //   const handleStorageChange = (event) => {
  //     if (event.key === "token") {
  //       // if token is found, set loggedIn to true
  //       setLoggedIn(!!localStorage.getItem("token"));
  //     }
  //   };

  //   // Add event listener for "storage" event
  //   window.addEventListener("storage", handleStorageChange);

  //   // Clean up the event listener when the component is unmounted
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  const handleLogout = () => {
    // remove token from localStorage
    localStorage.removeItem("token");
    // set loggedIn to false
    setLoggedIn(false);
    // redirect to home page
    window.location.replace("/");
  };

  return (
    <nav className="flex float-right p-8">
      <ul className="text-yard-blue ">
        <li className="hover:text-yard-orange">
          <Link to="/profile-master">Profile Master</Link>
        </li>

        {loggedIn ? ( // if logged in, show logout button
          <li className="hover:text-yard-orange">
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          // else show login button
          <li className="hover:text-yard-orange">
            <Link to="/login">Login</Link>
          </li>
        )}
        <li id="nav-search" className="hover:text-yard-orange">
          <Link to="/search">{searchIcon}</Link>
        </li>
        <li id="nav-jobs" className="hover:text-yard-orange">
          <Link to="/jobs">{trowelIcon}</Link>
        </li>
        <li id="nav-profile" className="hover:text-yard-orange">
          <Link to="/profile">{userIcon}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
