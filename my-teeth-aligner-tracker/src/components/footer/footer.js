import React from "react";
import { Container } from "react-bootstrap";
import "./footer.css";

function Footer() {
  return (
    <Container fluid className="footer-section d-flex">
      <footer>
        <p className="text-center text-white footer-text">
          © Copyright SmileMinder. All Rights Reserved
        </p>
      </footer>
    </Container>
  );
}

export default Footer;
