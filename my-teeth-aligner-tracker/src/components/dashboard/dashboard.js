import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { calculateTreatmentTimeRemaining } from "../treatmentCalculations/treatmentCalculations";
import { calculateNextAlignerSwitch } from "../treatmentCalculations/treatmentCalculations";
import { calculateEndOfTreatment } from "../treatmentCalculations/treatmentCalculations";
import AlignerCalendar from "../calendar/calendar";
import "./dashboard.css";
import Logout from "../log-out/log-out";
import Profile from "../profile/profile";
import { Link } from "react-router-dom";

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
      <Container fluid className="dashboard-container">
        {/* Sidebar */}
        <Col md={3} className="sidebar">
          <h2>{userData.username}</h2>
          <ul>
            <Link to="/profile">
              <li>Profile</li>
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
            <h1>Your Smile Journey</h1>
            <span>Track your progress</span>
            {/* Treatment Time Remaining */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Treatment Time Remaining</Card.Title>
                  <Card.Text>{treatmentTimeRemaining} weeks</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Next Aligner Switch */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Next Aligner Switch</Card.Title>
                  <Card.Text>{nextAlignerSwitchDate}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* New Smile ETA */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>New Smile ETA</Card.Title>
                  <Card.Text>{alignerEndDate}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Calendar */}
          <Row className="aligner-calendar">
            <AlignerCalendar
              aligners={alignerInfo}
              startDate={treatmentPlan.start_date}
            />
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default Dashboard;
