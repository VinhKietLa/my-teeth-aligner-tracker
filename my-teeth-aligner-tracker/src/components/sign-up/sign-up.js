import React from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./sign-up.css"; // Make sure to include the path to your CSS file
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

async function fetchCsrfToken() {
  const response = await fetch("http://localhost:3000/csrf", {
    credentials: "include",
  });
  const data = await response.json();
  return data.csrfToken;
}

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const csrfToken = await fetchCsrfToken();
    const formData = {
      user: {
        email: email,
        username: username,
        password: password,
      },
    };

    // Send data to backend
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store the token
      navigate("/alignersetup");
      const token = localStorage.getItem("token"); // Retrieve token from local storage

      console.log("JWT Token:", token);
    } else {
      const errorData = await response.json();
      console.log("Error signing up:", errorData);
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={6} className="mx-auto">
          <div className="signup-form-wrapper">
            <h2 className="text-center mb-4">
              Start Tracking Your Aligners Today
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
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
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Sign Up
                </Button>
                <Link to="/login">
                  <Form.Text className="text-center">
                    Already have an account? <a href="#login">Sign in</a>
                  </Form.Text>
                </Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
