import { React } from "react";
import { Container, Col, Image, Row } from "react-bootstrap";
import "./about.css";
import sdc from "./sdc.png"; //
import useIsMobile from "../is-mobile/is-mobile";

function About() {
  return (
    <>
      <Container fluid={useIsMobile} className="mt-5 about-container">
        <Row className="justify-content-center align-items-center">
          <Col sm={12} md={6}>
            <h1 className="about-title">About SmileMinder</h1>
            <p>
              Welcome to SmileMinder, where we celebrate every step in the
              journey towards a perfect smile.
            </p>
            <br></br>
            <h3>A Solution Born from Necessity</h3>
            <p>
              When SmileDirectClub shut down, leaving many without a way to
              track their aligner progress, the idea for SmileMinder was
              sparked. It's not just a tool for me, but for everyone facing this
              challenge.
            </p>
            <br></br>

            <h3>The Core of SmileMinder</h3>
            <p>
              SmileMinder is a labor of love and a testament to
              self-empowerment. As a solo developer, I've crafted this platform
              to be intuitive, user-friendly, and reliable, reflecting years of
              insights and experiences.
            </p>
            <br></br>

            <h3>Our Mission</h3>
            <p>
              SmileMinder aims to empower users to track their aligner treatment
              effortlessly. It's designed to support you, whether you're
              starting out or well into your journey.
            </p>
            <br></br>

            <h3>Your Journey, Our Shared Path</h3>
            <p>
              Every feature in SmileMinder is tailored to your needs. It's more
              than a tool; it's a companion for your smile journey. Join our
              community and let's celebrate each step towards a confident smile
              together.
            </p>
            <br></br>

            <h4>Rest in piece SDC 🪦</h4>
            <Image src={sdc} fluid alt="Smile direct club website"></Image>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default About;
