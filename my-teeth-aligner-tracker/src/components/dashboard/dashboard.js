import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { calculateTreatmentTimeRemaining } from "../treatmentCalculations/treatmentCalculations";

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
        setTreatmentPlan(treatmentData);
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

  if (!userData || !treatmentPlan || !alignerInfo) return <div>Loading...</div>;

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col
          md={3}
          className="sidebar"
          style={{ backgroundColor: "lightblue" }}
        >
          <h2>{userData.username}</h2>
          <ul>
            <li>Dashboard</li>
            <li>Settings</li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <Row>
            {/* Card 1: Treatment Time Remaining */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Treatment Time Remaining</Card.Title>
                  <Card.Text>{treatmentTimeRemaining} weeks</Card.Text>{" "}
                </Card.Body>
              </Card>
            </Col>

            {/* Card 2: Next Aligner Switch */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Next Aligner Switch</Card.Title>
                  <Card.Text>{/* Next aligner switch info */}</Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Card 3: New Smile ETA */}
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>New Smile ETA</Card.Title>
                  <Card.Text>{/* New smile ETA info */}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
