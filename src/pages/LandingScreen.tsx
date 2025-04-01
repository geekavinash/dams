import React from "react";
import "../App.css";
import "../main.css";
import "../animation.css";
import DOCTOR_BACKGROUND from "../assets/prepre.jpeg";
import LOGO from "../assets/dams_logo.svg";
import LinkButton from "../components/LinkButton.tsx";
import { Link, useNavigate } from "react-router";

function LandingScreen() {
  return (
    <div
      style={{
        flex: 1,
        backgroundImage: `url(${DOCTOR_BACKGROUND})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        display: "flex",
      }}
    >
      <div
        style={{
          flex: 1,
          backgroundColor: "#91abc175",
          justifyContent: "space-evenly",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 2.5 }}>
          <Header />
        </div>
        <div style={{ flex: 7 }}>
          <Content />
        </div>
        <span
          style={{
            flex: 0.5,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          A project by Avinash Kumar
        </span>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div style={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          color: "whitesmoke",
        }}
      >
        <img src={LOGO} height={60} alt="DAMS Logo" />
        <h2 style={{ color: "whitesmoke" }}>DAMS</h2>
        <span style={{ textTransform: "uppercase" }}>
          Simplify the appointmenting
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
      }}
    >
      <h1 style={{ color: "white" }}>Avoid Hassles & Delays</h1>
      <span style={{ color: "whitesmoke" }}>
        How is your health today? Not feeling well?
      </span>
      <button className="btn btn-primary" onClick={() => navigate("/login")}>
        Make Appointment
      </button>
    </div>
  );
}

export default LandingScreen;
