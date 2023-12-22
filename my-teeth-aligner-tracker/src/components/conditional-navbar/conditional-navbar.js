import React from "react";
import { useLocation } from "react-router-dom";
import MyNavbar from "../navbar/navbar";

const ConditionalNavbar = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/dashboard";

  return <>{showNavbar && <MyNavbar />}</>;
};

export default ConditionalNavbar;
