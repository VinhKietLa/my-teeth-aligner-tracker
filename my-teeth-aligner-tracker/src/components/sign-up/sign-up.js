import React from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./sign-up.css"; // Make sure to include the path to your CSS file

function SignUp() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col md={6} className="mx-auto">
          <div className="signup-form-wrapper">
            <h2 className="text-center mb-4">
              Start Tracking Your Aligners Today
            </h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email Address" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Username" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Sign Up
                </Button>
                <Form.Text className="text-center">
                  Already have an account? <a href="#login">Sign in</a>
                </Form.Text>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
