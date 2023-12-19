import "./App.css";
import MyNavbar from "./components/navbar/navbar";
import HeroSection from "./components/hero/hero";
import BenefitsSection from "./components/benefits/benefits";
import ContactUs from "./components/contact-us/contact";
import Footer from "./components/footer/footer.js";

function App() {
  return (
    <>
      {" "}
      <MyNavbar />
      <HeroSection />
      <BenefitsSection />
      <ContactUs />
      <Footer />
    </>
  );
}

export default App;
