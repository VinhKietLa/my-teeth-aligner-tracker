import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { calculateTreatmentTimeRemaining } from "../treatmentCalculations/treatmentCalculations";
import { calculateNextAlignerSwitch } from "../treatmentCalculations/treatmentCalculations";
import { calculateEndOfTreatment } from "../treatmentCalculations/treatmentCalculations";
import AlignerCalendar from "../calendar/calendar";
import "./dashboard.css";
import Logout from "../log-out/log-out";
import { Link } from "react-router-dom";
import logo from "../navbar/logo.png";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [treatmentPlan, setTreatmentPlan] = useState(null);
  const [alignerInfo, setAlignerInfo] = useState(null);

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

        const treatmentResponse = await fetch(
          "http://localhost:3000/api/treatment_plans",
          { headers }
        );
        const treatmentData = await treatmentResponse.json();
        if (treatmentData && treatmentData.length > 0) {
          setTreatmentPlan(treatmentData[0]);
        }

        console.log(treatmentData);
        const alignerResponse = await fetch(
          "http://localhost:3000/api/aligners",
          { headers }
        );
        const alignerData = await alignerResponse.json();
        setAlignerInfo(alignerData);
        console.log(alignerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const treatmentStartDate = treatmentPlan?.start_date;
  console.log(treatmentStartDate);
  const treatmentTimeRemaining =
    treatmentPlan && alignerInfo
      ? calculateTreatmentTimeRemaining(treatmentStartDate, alignerInfo)
      : null;

  const nextAlignerSwitchDate = alignerInfo
    ? calculateNextAlignerSwitch(alignerInfo, treatmentPlan.start_date)
    : null;

  const alignerEndDate = alignerInfo
    ? calculateEndOfTreatment(alignerInfo, treatmentPlan.start_date)
    : null;

  if (!userData || !treatmentPlan || !alignerInfo) return <div>Loading...</div>;

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
        <Col lg={2} className="sidebar d-none d-md-block">
          <h2 className="dashboard-name">{userData.username}</h2>
          <ul>
            <Link to="/profile">
              <li>Profile</li>
            </Link>
            <li>Dashboard</li>
            <Link to="/treatment-update">
              <li>Treatment plan</li>
            </Link>{" "}
            <li>{<Logout />}</li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col sm={12} lg={8} className="main-content">
          {/* Treatment Information */}
          <Row className="treatment-info">
            <h1>Your Smile Journey</h1>
            <span>Track your progress</span>
            {/* Treatment Time Remaining */}
            <Col sm={12} lg={4}>
              <Card className="treatment-remaining-card">
                <Card.Body>
                  <Card.Title>Treatment Time Remaining</Card.Title>
                  <Card.Text>{treatmentTimeRemaining} weeks</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Next Aligner Switch */}
            <Col sm={12} lg={4}>
              <Card className="next-aligner-card">
                <Card.Body>
                  <Card.Title>Next Aligner Switch</Card.Title>
                  <Card.Text>{nextAlignerSwitchDate}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* New Smile ETA */}
            <Col sm={12} lg={4}>
              <Card className="smile-eta-card">
                <Card.Body>
                  <Card.Title>New Smile ETA</Card.Title>
                  <Card.Text>{alignerEndDate}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Calendar */}
          <Row className="aligner-calendar">
            <Col sm={12} lg={12}>
              <AlignerCalendar
                aligners={alignerInfo}
                startDate={treatmentPlan.start_date}
              />
            </Col>
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default Dashboard;
