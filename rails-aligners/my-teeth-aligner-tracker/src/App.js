import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyNavbar from "./components/navbar/navbar";
import HeroSection from "./components/hero/hero";
import BenefitsSection from "./components/benefits/benefits";
import ContactUs from "./components/contact-us/contact";
import Footer from "./components/footer/footer";
import SignUp from "./components/sign-up/sign-up";
import AlignersInput from "./components/aligners-input/alignersInput";
import LoginForm from "./components/login/login";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <BenefitsSection />
              <ContactUs />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/alignersetup" element={<AlignersInput />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
