import React from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import "./sign-up.css";

function SignUp() {
  return (
    <div className="sign-up-form">
      <h2>Start Tracking Your Aligners Today</h2>
      <form>
        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
