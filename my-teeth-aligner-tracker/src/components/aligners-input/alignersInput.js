import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./alignersInput.css";

function TreatmentForm() {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [numberOfAligners, setNumberOfAligners] = useState(1);
  const [alignerWeeks, setAlignerWeeks] = useState({ 1: 1 });
  useEffect(() => {
    console.log(alignerWeeks);
  }, [alignerWeeks]);

  const handleAlignerChange = (event) => {
    const newNumberOfAligners = parseInt(event.target.value, 10);
    setNumberOfAligners(newNumberOfAligners);

    // Initialize state for all aligners
    setAlignerWeeks((prevAlignerWeeks) => {
      const newAlignerWeeks = { ...prevAlignerWeeks };
      // Add default week values for new aligners
      for (let i = 1; i <= newNumberOfAligners; i++) {
        if (!newAlignerWeeks[i]) {
          newAlignerWeeks[i] = 1;
        }
      }
      // Remove week values for aligners that no longer exist
      Object.keys(newAlignerWeeks).forEach((key) => {
        if (parseInt(key, 10) > newNumberOfAligners) {
          delete newAlignerWeeks[key];
        }
      });
      return newAlignerWeeks;
    });
  };

  const handleWeekChange = (aligner, weeks) => {
    setAlignerWeeks((prevAlignerWeeks) => ({
      ...prevAlignerWeeks,
      [aligner]: parseInt(weeks, 10),
    }));
  };

  const alignerOptions = () => {
    let options = [];
    for (let i = 1; i <= 20; i++) {
      options.push(
        <option className="option-style" key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token"); // Retrieve token from local storage

    const treatmentData = {
      start_date: startDate.toISOString(),
      aligners_attributes: Object.entries(alignerWeeks).map(
        ([aligner, weeks]) => ({
          duration_weeks: weeks,
        })
      ),
    };

    const response = await fetch(
      "https://smileminder.onrender.com/api/treatment_plans",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ treatment_plan: treatmentData }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      localStorage.getItem("token"); // Get the token
      navigate("/dashboard");
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
              id="input-style"
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
    <Container className="d-flex justify-content-center align-items-start vh-100 aligner-container">
      <Row className="justify-content-center align-items-center">
        <Col md={12}>
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
                  id="input-style"
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
                  id="input-style"
                >
                  {alignerOptions()}
                </Form.Control>
              </Col>
            </Form.Group>
            {renderAlignerInputs()}
            <Row className="mt-4">
              <Col>
                <Button type="submit" id="save-continue-btn">
                  Save and Continue Later
                </Button>
              </Col>
              <Col>
                <Button type="submit" id="save-proceed-btn">
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
