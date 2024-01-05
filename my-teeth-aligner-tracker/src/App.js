import { React } from "react";
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
import Profile from "./components/profile/profile";
import TreatmentUpdate from "./components/treatment-plan/treatment-update";
import About from "./components/about/about";
import HelpSection from "./components/help/help";

const NavbarWrapper = () => {
  const location = useLocation();
  const showNavbar =
    location.pathname !== "/dashboard" &&
    location.pathname !== "/profile" &&
    location.pathname !== "/treatment-update";
  return <>{showNavbar && <MyNavbar />}</>;
};
function App() {
  return (
    <>
      <div className="page-container">
        <div className="content-wrap">
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
                  </>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/help" element={<HelpSection />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/alignersetup" element={<AlignersInput />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/treatment-update" element={<TreatmentUpdate />} />
            </Routes>
          </Router>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
