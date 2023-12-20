import React, { useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const token = localStorage.getItem("jwtToken"); // Retrieve token from local storage
console.log("JWT Token:", token);

function TreatmentForm() {
  const [startDate, setStartDate] = useState(new Date());
  const [numberOfAligners, setNumberOfAligners] = useState(1);
  const [alignerWeeks, setAlignerWeeks] = useState({});

  const handleAlignerChange = (event) => {
    setNumberOfAligners(event.target.value);
    setAlignerWeeks({});
  };

  const handleWeekChange = (aligner, weeks) => {
    setAlignerWeeks({ ...alignerWeeks, [aligner]: weeks });
  };

  const alignerOptions = () => {
    let options = [];
    for (let i = 1; i <= 20; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("jwtToken"); // Retrieve token from local storage
    console.log("JWT Token:", token);

    const treatmentData = {
      start_date: startDate.toISOString(),
      aligners_attributes: Object.entries(alignerWeeks).map(
        ([aligner, weeks]) => ({
          duration_weeks: weeks,
        })
      ),
    };

    const response = await fetch("http://localhost:3000/api/treatment_plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ treatment_plan: treatmentData }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const errorData = await response.json();
      console.log("Error signing up:", errorData);
    }
  };

  const renderAlignerInputs = () => {
    let inputs = [];
    for (let i = 1; i <= numberOfAligners; i++) {
      inputs.push(
        <Form.Group
          key={i}
          as={Row}
          className="mb-3"
          controlId={`aligner-${i}`}
        >
          <Form.Label column sm={6}>
            Aligner {i} Duration (weeks):
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              as="select"
              value={alignerWeeks[i] || ""}
              onChange={(e) => handleWeekChange(i, e.target.value)}
            >
              {alignerOptions()}
            </Form.Control>
          </Col>
        </Form.Group>
      );
    }
    return inputs;
  };

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center">
        <Col md={6}>
          <div className="text-center mb-4">
            <h2>Set Up Your Aligner Plan</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Treatment Start Date:
              </Form.Label>
              <Col sm={9}>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Number of Aligners:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  value={numberOfAligners}
                  onChange={handleAlignerChange}
                >
                  {alignerOptions()}
                </Form.Control>
              </Col>
            </Form.Group>
            {renderAlignerInputs()}
            <Row className="mt-4">
              <Col>
                <Button variant="secondary" type="submit">
                  Save and Continue Later
                </Button>
              </Col>
              <Col>
                <Button variant="primary" type="submit">
                  Save and Proceed
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default TreatmentForm;
