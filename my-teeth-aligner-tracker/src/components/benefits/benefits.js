import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import alignerImage from "./clear-aligner-benefits.png"; // Importing the hero image
import reminderBenfits from "./reminder-benefits.png"; // Importing the hero image
import dashboardBenefits from "./dashboard-benefits.png"; // Importing the hero image

function BenefitsSection() {
  return (
    <Container className="text-center my-5">
      <h2>Why Choose Our Aligner Tracker</h2>

      <Row className="my-4">
        {/* Section 1 */}
        <Col md={4} sm={12} className="my-3">
          <h3>Track Your Aligners</h3>
          <Image src={alignerImage} alt="Aligners Image" fluid />
          <p>
            Stay in control of your smile journey. Our aligner tracker lets you
            effortlessly monitor progress, ensuring you're always on the path to
            your dream smile.
          </p>
        </Col>

        {/* Section 2 */}
        <Col md={4} sm={12} className="my-3">
          <h3>Another Feature</h3>
          <Image src={reminderBenfits} fluid />
          <p>
            Never miss a beat with our web app notifications. Receive timely
            reminders for aligner changes, keeping your smile journey on track.
          </p>
        </Col>

        {/* Section 3 */}
        <Col md={4} sm={12} className="my-3">
          <h3>Third Feature</h3>
          <Image src={dashboardBenefits} alt="Third Feature Image" fluid />
          <p>
            Track your smile's transformation with our intuitive visual
            dashboard. Easily visualize your progress and witness the journey to
            your perfect smile.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default BenefitsSection;
