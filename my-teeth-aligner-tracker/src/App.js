import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import MyNavbar from "./components/navbar/navbar";
import HeroSection from "./components/hero/hero";
import BenefitsSection from "./components/benefits/benefits";
import ContactUs from "./components/contact-us/contact";
import Footer from "./components/footer/footer";
import SignUp from "./components/sign-up/sign-up";
import AlignersInput from "./components/aligners-input/alignersInput";
import LoginForm from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import ConditionalNavbar from "./components/conditional-navbar/conditional-navbar";
import Profile from "./components/profile/profile";
const NavbarWrapper = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/dashboard" && location.pathname !== "/profile";
  return <>{showNavbar && <MyNavbar />}</>;
};
function App() {
  return (
    <Router>
      {<NavbarWrapper />}
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
