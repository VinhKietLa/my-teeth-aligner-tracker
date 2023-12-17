import React from "react";
import { Button } from "react-bootstrap";
import heroImage from "./hero.png"; // Importing the hero image
import "./hero.css";

function HeroSection() {
  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="container">
        <div className="row align-items-center" style={{ minHeight: "50vh" }}>
          {" "}
          {/* Adjust height as needed */}
          <div className="col-md-6 ms-3">
            <h1 className="hero-title text-black">
              Track your smile journey with ease
            </h1>
            <Button className="get-started-btn" href="#get-started">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
