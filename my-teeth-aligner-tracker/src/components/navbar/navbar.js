import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import logo from "./logo.png";
import "./navbar.css";
import { Link } from "react-router-dom";

function MyNavbar() {
  return (
    <Navbar expand="lg" className="nav-bg-custom">
      <Container>
        <Navbar.Brand href="#home nav-title">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top nav-logo"
            alt="Logo"
          />
          <Link to="/">
            <span style={{ color: "white", fontWeight: "bold" }}>
              SmileMinder
            </span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {" "}
            {/* ms-auto pushes it to the right */}
            <Nav.Link href="#about" className="text-white nav-link-custom">
              About
            </Nav.Link>
            <Nav.Link href="#help" className="text-white nav-link-custom">
              Help
            </Nav.Link>
            <Link to="/login">
              <Nav.Link href="#signin" className="text-white nav-link-custom">
                Sign in
              </Nav.Link>
            </Link>
            <Link to="/signup">
              <Button className="get-started-btn" href="#get-started">
                Get Started
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
