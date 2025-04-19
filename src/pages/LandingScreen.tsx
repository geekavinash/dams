import React from "react";
import "../App.css";
import "../main.css";
import "./LandingScreenStyles.css";
import DOCTOR_BACKGROUND from "../assets/prepre.jpeg";
import LOGO from "../assets/dams_logo.svg";
import LinkButton from "../components/LinkButton.tsx";
import { Link, useNavigate } from "react-router";

function LandingScreen() {
  return (
    <div
      className="landing-screen"
      style={{ backgroundImage: `url(${DOCTOR_BACKGROUND})` }}
    >
      <div className="landing-overlay">
        <div className="landing-header">
          <Header />
        </div>
        <div className="landing-content">
          <Content />
        </div>
        <span className="landing-footer">A project by Avinash Kumar</span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="header-container">
      <div className="header-left">
        <img src={LOGO} height={60} alt="DAMS Logo" />
        <h2>DAMS</h2>
        <span>Simplify the appointmenting</span>
      </div>
      <div className="header-right">
        <Link to="/login" className="m-2">
          <LinkButton title={"Login"} />
        </Link>
        <Link to="/register" className="m-2">
          <LinkButton title={"Register"} />
        </Link>
      </div>
    </div>
  );
}

function Content() {
  const navigate = useNavigate();
  return (
    <div className="content-container">
      <h1>Avoid Hassles & Delays</h1>
      <span>How is your health today? Not feeling well?</span>
      <button className="btn btn-primary" onClick={() => navigate("/login")}>
        Make Appointment
      </button>
    </div>
  );
}

export default LandingScreen;
