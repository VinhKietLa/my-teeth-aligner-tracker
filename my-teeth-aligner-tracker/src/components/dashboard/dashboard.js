import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

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
        // Fetch Treatment Plan (assuming endpoint and logic)
        // You'll need to adjust the URL and logic based on your actual API and data structure
        const treatmentResponse = await fetch(
          "http://localhost:3000/api/treatment_plans",
          { headers }
        );
        const treatmentData = await treatmentResponse.json();
        setTreatmentPlan(treatmentData);
        console.log(treatmentData);

        // Fetch Aligner Info
        // Similar to above, adjust as needed
        const alignerResponse = await fetch(
          "http://localhost:3000/api/aligners",
          { headers }
        );
        const alignerData = await alignerResponse.json();
        setAlignerInfo(alignerData);
        console.log(alignerData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately
      }
    };

    fetchData();
  }, []);

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
                  <Card.Text>{/* Treatment time remaining info */}</Card.Text>
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
