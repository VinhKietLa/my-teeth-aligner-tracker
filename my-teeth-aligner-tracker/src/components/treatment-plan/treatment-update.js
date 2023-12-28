import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Logout from "../log-out/log-out";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import logo from "../navbar/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./treatment-update.css";

function TreatmentUpdate() {
  const [treatmentPlanId, setTreatmentPlanId] = useState(null);

  const [treatmentData, setTreatmentData] = useState(null);
  const [userData, setUserData] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [numberOfAligners, setNumberOfAligners] = useState(1);
  const [alignerWeeks, setAlignerWeeks] = useState({});

  const [aligners, setAligners] = useState([]);

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
          <Form.Label column sm={6} className="treatment-plan-titles">
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
  useEffect(() => {
    console.log("Updated Treatment Plan ID:", treatmentPlanId);
  }, [treatmentPlanId]);

  useEffect(() => {
    // Fetch Existing treatmentplan Data
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
        setUserData(userData);

        const treatmentResponse = await fetch(
          "http://localhost:3000/api/treatment_plans",
          {
            headers,
          }
        );
        const treatmentData = await treatmentResponse.json();
        if (treatmentData && treatmentData.length > 0) {
          setTreatmentData(treatmentData[0]);
          setTreatmentPlanId(treatmentData[0].id);
          console.log(treatmentData[0]);
          const startDateValue = new Date(treatmentData[0].start_date);
          if (!isNaN(startDateValue)) {
            setStartDate(startDateValue);
          }
        }

        const alignerResponse = await fetch(
          "http://localhost:3000/api/aligners",
          { headers }
        );
        const alignerData = await alignerResponse.json();

        setNumberOfAligners(alignerData.length);
        console.log(alignerData);

        const newAlignerWeeks = {};
        const alignersArray = [];
        alignerData.forEach((aligner, index) => {
          newAlignerWeeks[index + 1] = aligner.duration_weeks;
          alignersArray.push({
            id: aligner.id,
            duration_weeks: aligner.duration_weeks,
          });
        });
        setAlignerWeeks(newAlignerWeeks);
        setAligners(alignersArray);
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

    const updatedAlignersAttributes = Object.entries(alignerWeeks).map(
      ([index, weeks]) => {
        const alignerId = aligners[parseInt(index) - 1]?.id;
        return { id: alignerId, duration_weeks: weeks };
      }
    );

    for (let i = numberOfAligners; i < aligners.length; i++) {
      updatedAlignersAttributes.push({
        id: aligners[i].id,
        _destroy: "1",
      });
    }

    const updatedTreatmentData = {
      start_date: startDate.toISOString(),
      aligners_attributes: updatedAlignersAttributes,
    };
    try {
      console.log(treatmentPlanId);
      const userResponse = await fetch(
        `http://localhost:3000/api/treatment_plans/${treatmentPlanId}`,
        {
          method: "PATCH",
          headers: headers,
          body: JSON.stringify({ treatment_plan: updatedTreatmentData }),
        }
      );
      const updatedUserData = await userResponse.json();
      if (!userResponse.ok) {
        throw new Error(`Error: ${userResponse.status}`);
      }
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (!treatmentData) return <div>Loading...</div>;

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
        <Col md={3} lg={2} className="sidebar d-none d-md-block">
          <h2 className="dashboard-name">{userData.username}</h2>
          <ul>
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <li>Treatment plan</li>
            <li>{<Logout />}</li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col lg={12} className="main-content treatment-container">
          <Row>
            <h1>Your treatment plan</h1>
            <span>Edit your plan</span>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3">
                <Form.Label className="treatment-plan-titles" column sm={3}>
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
              <Form.Group className="mb-3">
                <Form.Label className="treatment-plan-titles">
                  Number of Aligners
                </Form.Label>

                <Form.Control
                  as="select"
                  value={numberOfAligners}
                  onChange={handleAlignerChange}
                  id="input-style"
                >
                  {alignerOptions()}
                </Form.Control>
              </Form.Group>

              {renderAlignerInputs()}

              <div className="d-grid gap-2">
                <Button size="lg" type="submit" className="save-changes-btn">
                  Save changes{" "}
                </Button>
              </div>
            </Form>
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default TreatmentUpdate;
