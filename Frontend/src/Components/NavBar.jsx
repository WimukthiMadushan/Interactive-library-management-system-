import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./../Styles/NavBar.css";
import logo from "./../Images/Logo.png";
import Profile_pic from "./../Images/Profile_pic.jpg";

function NavBar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const user = true;
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to={"/"}>
          <img className="navbar-logo" src={logo} alt="Logo" />
        </Link>
      </div>

      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {user ? (
          <div className="dropdown-container" ref={dropdownRef}>
            <button className="profile-pic" onClick={toggleDropdown}>
              <img src={Profile_pic} alt="Profile" />
            </button>
            {dropdownVisible && (
              <div className="dropdown-menu">
                <Link to={"/profile"}>Profile</Link>
                <Link to={"/logout"} className="logout">
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="login-signup-container">
            <Link to={"/register"} className="login">
              Register
            </Link>
            <Link to={"/login"} className="login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
