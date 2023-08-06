import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrowel, faSeedling, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useAuth } from "../utils/AuthContext";
// import { react-icons } from "react-icons";
import { MdLogin, MdLogout } from "react-icons/md";
const searchIcon = <FontAwesomeIcon icon={faMagnifyingGlass} />;
const trowelIcon = <FontAwesomeIcon icon={faTrowel} />;
const userIcon = <FontAwesomeIcon icon={faUser} />;
const plotIcon = <FontAwesomeIcon icon={faSeedling} />;
const signUpIcon = <PersonAddAltOutlinedIcon style={{ fontSize: '2.75rem', marginBottom: '18px' }}/>;
const logOutIcon = <MdLogout />;
const logInIcon = <MdLogin />;



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
    <nav className="flex justify-between p-8">
<a href="/" className="">
          <span className=" text-yard-orange">Yard</span>
          <span className="text-yard-green">to</span>
          <span className="text-yard-blue">Table</span>
        </a>
  <ul className="text-yard-blue">
    {loggedIn ? (
      <>
        {/* <li className="hover:text-yard-orange">
          <Link to="/profile-master">Profile Master</Link>
        </li> */}

        <li id="nav-search" className="hover:text-yard-orange">
          <Link to="/search">{searchIcon}</Link>
        </li>
        <li id="nav-plots" className="hover:text-yard-orange">
          <Link to="/plots">{plotIcon}</Link>
        </li>
        <li id="nav-jobs" className="hover:text-yard-orange">
          <Link to="/jobs">{trowelIcon}</Link>
        </li>
        <li id="nav-profile" className="hover:text-yard-orange">
          <Link to="/profile">{userIcon}</Link>
        </li>
        <li id="nav-logout" className="hover:text-yard-orange">
          <Link to="/" onClick={handleLogout}>{logOutIcon}</Link>
        </li>
      </>
    ) : (
      <>
        <li id="nav-signup" className="hover:text-yard-orange">
          <Link to="/signup"  className="signup-icon-link">{signUpIcon}</Link>
        </li>
        <li id="nav-login" className="hover:text-yard-orange">
          <Link to="/login">{logInIcon}</Link>
        </li>
      </>
    )}
  </ul>
</nav>

  );
};

export default Nav;
