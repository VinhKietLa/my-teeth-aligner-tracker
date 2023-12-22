import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import Logout from "../log-out/log-out";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";

function TreatmentUpdate() {
  const [treatmentData, setTreatmentData] = useState(null);

  const [startDate, setStartDate] = useState(new Date());
  const [numberOfAligners, setNumberOfAligners] = useState(1);
  const [alignerWeeks, setAlignerWeeks] = useState({});
  const [alignerInfo, setAlignerInfo] = useState(null);

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

  useEffect(() => {
    // Fetch User Data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };
        const treatmentResponse = await fetch(
          "http://localhost:3000/api/treatment_plans",
          {
            headers,
          }
        );
        const treatmentData = await treatmentResponse.json();
        console.log(treatmentData);
        if (treatmentData && treatmentData.length > 0) {
          setTreatmentData(treatmentData[0]);
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
        setAlignerInfo(alignerData.length);
        console.log(alignerData.length);
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

    const body = JSON.stringify({
      user: {
        // username: username,
        // email: email,
      },
    });

    try {
      const userResponse = await fetch("http://localhost:3000/api/user", {
        method: "PATCH",
        headers: headers,
        body: body,
      });
      const updatedUserData = await userResponse.json();
      if (!userResponse.ok) {
        throw new Error(`Error: ${userResponse.status}`);
      }
      //   setUserData(updatedUserData); // Update state with the new user data
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  if (!treatmentData) return <div>Loading...</div>;

  return (
    <>
      {" "}
      <Container fluid className="dashboard-container">
        {/* Sidebar */}
        <Col md={3} className="sidebar">
          <h2>{treatmentData.username}</h2>
          <ul>
            <Link to="/profile">
              <li>Your profile</li>
            </Link>
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
            <li>Treatment plan</li>
            <li>{<Logout />}</li>
          </ul>
        </Col>

        {/* Main Content */}
        <Col md={9} className="main-content">
          <Row>
            <h1>Your Treatment Plan</h1>
            <h2>Edit your plan</h2>
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
              <Form.Group className="mb-3">
                <Form.Label>Number of Aligners</Form.Label>

                <Form.Control
                  as="select"
                  value={alignerInfo}
                  //   onChange={handleAlignerChange}
                >
                  {alignerOptions()}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Aligner Duration</Form.Label>

                <Form.Control
                  type="email"
                  placeholder="Email Address"
                  value={alignerWeeks}
                  onChange={(e) => setAlignerWeeks(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Save changes{" "}
                </Button>
              </div>
            </Form>

            {/* <Form onSubmit={handlePasswordChangeSubmit}>
              <h2>Change password</h2>
              <Form.Group className="mb-3">
                <Form.Label>Old password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm new password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Confirm new password</Form.Label>

                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" type="submit">
                  Change password{" "}
                </Button>
              </div>
            </Form> */}
          </Row>
        </Col>
      </Container>
    </>
  );
}

export default TreatmentUpdate;
