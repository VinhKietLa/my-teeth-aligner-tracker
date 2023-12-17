import React from "react";
import "./navbar.css"; // Assuming you have a corresponding CSS file
import logo from "../navbar/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />{" "}
        <h1>SmileMinder</h1>
      </div>
      <div className="navbar-links">
        <a href="/about">About</a>
        <a href="/help">Help</a>
        <a href="/signin">Sign In</a>
        <a href="/get-started" className="navbar-special-link">
          Get Started
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
