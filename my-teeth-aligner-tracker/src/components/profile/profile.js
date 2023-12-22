import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Logout from "../log-out/log-out";
import { Link } from "react-router-dom";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Fetch User Data
        const userResponse = await fetch("http://localhost:3000/api/user", {
          headers,
        });
        const userData = await userResponse.json();
        setUserData(userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  if (!userData) return <div>Loading...</div>;

  return (
    <>
      {" "}
      <Container fluid className="dashboard-container">
        {/* Sidebar */}
        <Col md={3} className="sidebar">
          <h2>{userData.username}</h2>
          <ul>
            <Link to="/profile">
              <li>Your profile</li>
            </Link>
            <li>Dashboard</li>
            <li>Settings</li>
            <li>{<Logout />}</li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={9} className="main-content">
          {/* Treatment Information */}
          <Row className="treatment-info">
            <h1>Your profile</h1>
            <h2>Details</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Save changes{" "}
                </Button>
              </div>
            </Form>

            <Form>
              <h2>Change password</h2>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
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
