import React from "react";
import { Form, Row, Col, Button, Container, Image } from "react-bootstrap";
import "./sign-up.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import peopleImages from "./aligners.png";

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
    <Container className="d-flex flex-column justify-content-center align-items-center sign-up-container">
      <Row>
        <Image
          src={peopleImages}
          alt="People eating"
          fluid
          className="aligners-image"
        ></Image>
      </Row>
      <Row className="w-100">
        <Col xs={12} md={8} className="mx-auto">
          <div className="signup-form-wrapper">
            <h2 className="text-center mb-4">
              Start Tracking Your Aligners Today
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-5">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-styles-sign-up"
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-styles-sign-up"
                />
              </Form.Group>
              <Form.Group className="mb-5">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-styles-sign-up"
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  type="submit"
                  className="input-styles-sign-up btn-style-sign-up"
                >
                  Sign Up
                </Button>
                <Link to="/login" className="sign-up">
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
