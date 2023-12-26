// LoginForm.js
import React, { useState } from "react";
import { Form, Row, Col, Button, Container, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
import loginImg from "./log-in.png";

function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Call the Rails API to authenticate the user
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token); // Store the token
      navigate("/dashboard");
    } else {
      // Handle login failure
      console.log("Login failed");
    }
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <Row>
        <Image src={loginImg} alt="People holding aligners" fluid></Image>
      </Row>
      <Row className="w-100">
        <Col xs={12} md={12} className="mx-auto">
          <div className="login-form-wrapper">
            <h2 className="text-center mb-4">Sign in to SmileMinder</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-styles"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input-styles"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-styles"
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="input-styles btn-style"
                >
                  Sign in
                </Button>
                <Link to="/signup" className="sign-in">
                  <Form.Text className="text-center sign-in">
                    Don't have an account? <a href="#login">Sign up</a>
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

export default LoginForm;
