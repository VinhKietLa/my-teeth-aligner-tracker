import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Logout from "../log-out/log-out";
import { Link } from "react-router-dom";
import TreatmentUpdate from "../treatment-plan/treatment-update";
import "./profile.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../navbar/logo.png";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    // Fetch User Data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const userResponse = await fetch("http://localhost:3000/api/user", {
          headers,
        });
        const userData = await userResponse.json();
        if (userData) {
          setUserData(userData);
          console.log(userData);
          setEmail(userData.email);
          setUsername(userData.username);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      user: {
        username: username,
        email: email,
      },
    });

    try {
      const userResponse = await fetch("http://localhost:3000/api/user", {
        method: "PATCH",
        headers: headers,
        body: body,
      });
      const updatedUserData = await userResponse.json();
      if (!userResponse.ok) {
        throw new Error(`Error: ${userResponse.status}`);
      }
      setUserData(updatedUserData); // Update state with the new user data
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handlePasswordChangeSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      console.error("New passwords do not match");
      return;
    }

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      old_password: oldPassword,
      new_password: newPassword,
    });

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/changepassword",
        {
          method: "PATCH",
          headers: headers,
          body: body,
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log("Password updated successfully");
      // Clear the password fields
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <>
      {" "}
      <Navbar collapseOnSelect expand="lg" className="d-md-none nav-bg-custom">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top nav-logo"
            alt="Logo"
          />{" "}
          SmileMinder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#profile">Profile</Nav.Link>
            <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            <Nav.Link href="#treatment-update">Treatment Plan</Nav.Link>
            <Nav.Link href="#logout">{<Logout />}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container fluid className="dashboard-container">
        {/* Sidebar */}
        <Col md={3} className="sidebar d-none d-md-block">
          <h2>{userData.username}</h2>
          <ul>
            <Link to="/profile">
              <li>Your profile</li>
            </Link>
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <Link to="/treatment-update">
              <li>Treatment plan</li>
            </Link>
            <li>{<Logout />}</li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={9} className="main-content">
          <Row>
            <h1>Your profile</h1>
            <span>Details</span>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button size="lg" type="submit" className="save-changes-btn">
                  Save changes{" "}
                </Button>
              </div>
            </Form>

            <Form onSubmit={handlePasswordChangeSubmit}>
              <h2>Change password</h2>
              <Form.Group className="mb-3">
                <Form.Label>Old password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm new password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm new password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button size="lg" type="submit" className="change-password-btn">
                  Change password{" "}
                </Button>
              </div>
            </Form>
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default Profile;
