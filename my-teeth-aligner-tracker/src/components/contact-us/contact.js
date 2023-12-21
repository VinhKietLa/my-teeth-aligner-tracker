import React from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./contact.css";

function ContactUs() {
  return (
    <Container className="my-5">
      <h2 style={{ textAlign: "left" }} className="mb-5">
        Contact Us
      </h2>

      <Form className="form-section">
        <Row>
          <Col
            md={4}
            className="mb-3 d-flex justify-content-center align-items-start"
          >
            <div>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                plaintext
                readOnly
                defaultValue="kietla@live.co.uk"
              />
            </div>
          </Col>

          <Col md={8}>
            {" "}
            {/* Adjust 'md={8}' as needed */}
            <Row className="mb-3">
              <Col sm>
                <Form.Group controlId="formGridName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formGridSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="Subject" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <Form.Group controlId="formGridMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Your message"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button className="contact-us-btn" href="type=submit">
              Send Message
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ContactUs;
