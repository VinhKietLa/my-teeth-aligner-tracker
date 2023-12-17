import React from "react";
import { Button } from "react-bootstrap";
import heroImage from "./hero.png"; // Importing the hero image
import "./hero.css";
import heroImageMobile from "./hero_mobile.png"; // Mobile image

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="container">
        <div className="row">
          {" "}
          {/* Adjust height as needed */}
          <div className="col-md-6 hero-title-and-btn">
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
