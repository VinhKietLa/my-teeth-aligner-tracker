import { React } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import alignerImage from "./clear-aligner-benefits.png";
import reminderBenfits from "./reminder-benefits.png";
import dashboardBenefits from "./dashboard-benefits.png";
import "./benefits.css";
import useIsMobile from "../is-mobile/is-mobile";

function BenefitsSection() {
  const isMobile = useIsMobile();
  return (
    <Container fluid={isMobile} className="text-center my-5">
      <h2 className="benefits-title">Why Choose Our Aligner Tracker</h2>

      <Row className="benefit-sections">
        {/* Section 1 */}
        <Col md={4} className="my-3">
          <h3>Track Your Aligners</h3>
          <Image
            src={alignerImage}
            className="aligner-img"
            alt="Clear aligners"
            fluid
          />
          <p>
            Stay in control of your smile journey. Our aligner tracker lets you
            effortlessly monitor progress, ensuring you're always on the path to
            your dream smile.
          </p>
        </Col>

        {/* Section 2 */}
        <Col md={4} className="my-3">
          <h3>Reminders</h3>
          <Image
            src={reminderBenfits}
            className="reminders-img"
            fluid
            alt="Reminder Icon"
          />
          <p>
            Never miss a beat with our web app notifications. Receive timely
            reminders for aligner changes, keeping your smile journey on track.
          </p>
        </Col>

        {/* Section 3 */}
        <Col md={4} className="my-3">
          <h3>Dashboard</h3>
          <Image
            src={dashboardBenefits}
            className="benefits-img"
            alt="Dashbaord"
            fluid
          />
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
